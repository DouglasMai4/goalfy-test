import React, {
	createContext,
	useContext,
	useState,
	type ReactNode,
} from 'react';

import {
	useFloating,
	autoUpdate,
	offset,
	flip,
	shift,
	useDismiss,
	useClick,
	useInteractions,
	FloatingFocusManager,
	FloatingPortal,
	type Placement,
	type FloatingContext,
} from '@floating-ui/react';

import * as S from './styles';

interface DropdownContextType {
	isOpen: boolean;
	setIsOpen: (open: boolean) => void;
	refs: any;
	floatingStyles: React.CSSProperties;
	getReferenceProps: any;
	getFloatingProps: any;
	context: FloatingContext;
	isPositioned: boolean;
}

const DropdownContext = createContext<DropdownContextType | undefined>(
	undefined,
);

const useDropdown = () => {
	const context = useContext(DropdownContext);
	if (!context)
		throw new Error('useDropdown must be used within Dropdown.Root');
	return context;
};

interface RootProps {
	children: ReactNode;
	placement?: Placement;
}

const Root = ({ children, placement = 'bottom-start' }: RootProps) => {
	const [isOpen, setIsOpen] = useState(false);

	const { refs, floatingStyles, context, isPositioned } = useFloating({
		open: isOpen,
		onOpenChange: setIsOpen,
		placement,
		whileElementsMounted: autoUpdate,
		middleware: [offset(8), flip(), shift({ padding: 10 })],
		transform: true,
	});

	const click = useClick(context);
	const dismiss = useDismiss(context);

	const { getReferenceProps, getFloatingProps } = useInteractions([
		click,
		dismiss,
	]);

	return (
		<DropdownContext.Provider
			value={{
				isOpen,
				setIsOpen,
				refs,
				floatingStyles,
				getReferenceProps,
				getFloatingProps,
				context,
				isPositioned,
			}}
		>
			{children}
		</DropdownContext.Provider>
	);
};

const Trigger = ({ children }: { children: React.ReactElement }) => {
	const { refs, getReferenceProps, isOpen } = useDropdown();

	return React.cloneElement(children, {
		ref: refs.setReference,
		...getReferenceProps(),
		'data-state': isOpen ? 'open' : 'closed',
	});
};

const Content = ({ children }: { children: ReactNode }) => {
	const {
		isOpen,
		refs,
		floatingStyles,
		getFloatingProps,
		context,
		isPositioned,
	} = useDropdown();

	if (!isOpen) return null;

	return (
		<FloatingPortal>
			<FloatingFocusManager context={context} modal={false}>
				<S.Positioner
					ref={refs.setFloating}
					style={{
						...floatingStyles,
						...(isPositioned
							? { opacity: 1, visibility: 'visible' }
							: { opacity: 0, visibility: 'hidden' }),
					}}
					{...getFloatingProps()}
				>
					<S.Content $ready={isPositioned}>{children}</S.Content>
				</S.Positioner>
			</FloatingFocusManager>
		</FloatingPortal>
	);
};

interface ItemProps {
	children: ReactNode;
	onClick?: () => void;
	danger?: boolean;
}

const Item = ({ children, onClick, danger }: ItemProps) => {
	const { setIsOpen } = useDropdown();

	const handleClick = (e: React.MouseEvent) => {
		setIsOpen(false);
		onClick?.();
	};

	return (
		<S.Item onClick={handleClick} $danger={danger} role="menuitem" tabIndex={0}>
			{children}
		</S.Item>
	);
};

const Separator = () => <S.Separator />;

export const Dropdown = {
	Root,
	Trigger,
	Content,
	Item,
	Separator,
};
