import React, {
	createContext,
	useContext,
	useState,
	type ReactNode,
	useEffect,
} from 'react';

import {
	useFloating,
	autoUpdate,
	offset,
	flip,
	useDismiss,
	useClick,
	useInteractions,
	FloatingFocusManager,
	FloatingPortal,
	type FloatingContext,
	size,
} from '@floating-ui/react';

import { Check, ChevronDown } from 'lucide-react';

import * as S from './styles';

interface SelectContextType {
	isOpen: boolean;
	setIsOpen: (open: boolean) => void;
	value: string;
	onValueChange: (value: string, label: string) => void;
	selectedLabel: string | null;
	refs: any;
	floatingStyles: React.CSSProperties;
	getReferenceProps: any;
	getFloatingProps: any;
	context: FloatingContext;
	isPositioned: boolean;
}

const SelectContext = createContext<SelectContextType | undefined>(undefined);

const useSelect = () => {
	const context = useContext(SelectContext);
	if (!context) throw new Error('useSelect must be used within Select.Root');
	return context;
};

interface SelectRootProps {
	children: ReactNode;
	value?: string;
	onValueChange?: (value: string) => void;
	defaultValue?: string;
	id?: string;
}

const Root = ({ children, value, onValueChange }: SelectRootProps) => {
	const [isOpen, setIsOpen] = useState(false);

	const [selectedLabel, setSelectedLabel] = useState<string | null>(null);

	const { refs, floatingStyles, context, isPositioned } = useFloating({
		open: isOpen,
		onOpenChange: setIsOpen,
		whileElementsMounted: autoUpdate,
		placement: 'bottom-start',
		middleware: [
			offset(4),
			flip(),
			size({
				apply({ rects, elements }) {
					Object.assign(elements.floating.style, {
						minWidth: `${rects.reference.width}px`,
					});
				},
			}),
		],
	});

	const click = useClick(context);
	const dismiss = useDismiss(context);

	const { getReferenceProps, getFloatingProps } = useInteractions([
		click,
		dismiss,
	]);

	const handleValueChange = (newValue: string, newLabel: string) => {
		setSelectedLabel(newLabel);
		onValueChange?.(newValue);
		setIsOpen(false);
	};

	return (
		<SelectContext.Provider
			value={{
				isOpen,
				setIsOpen,
				value: value || '',
				onValueChange: handleValueChange,
				selectedLabel,
				refs,
				floatingStyles,
				getReferenceProps,
				getFloatingProps,
				context,
				isPositioned,
			}}
		>
			{children}
		</SelectContext.Provider>
	);
};

const Trigger = ({ children }: { children: ReactNode }) => {
	const { refs, getReferenceProps, isOpen } = useSelect();

	return (
		<S.TriggerButton
			ref={refs.setReference}
			{...getReferenceProps()}
			$isOpen={isOpen}
			type="button"
		>
			{children}
			<S.IconWrapper>
				<ChevronDown
					size={16}
					style={{
						transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
						transition: '0.2s',
					}}
				/>
			</S.IconWrapper>
		</S.TriggerButton>
	);
};

interface ValueProps {
	placeholder: string;
}

const Value = ({ placeholder }: ValueProps) => {
	const { selectedLabel } = useSelect();
	return (
		<S.ValueText $isPlaceholder={!selectedLabel}>
			{selectedLabel || placeholder}
		</S.ValueText>
	);
};

const Content = ({ children }: { children: ReactNode }) => {
	const {
		isOpen,
		refs,
		floatingStyles,
		getFloatingProps,
		context,
		isPositioned,
	} = useSelect();

	if (!isOpen) return null;

	return (
		<FloatingPortal>
			<FloatingFocusManager context={context} modal={false}>
				<S.Content
					ref={refs.setFloating}
					style={{
						...floatingStyles,
						opacity: isPositioned ? undefined : 0,
						visibility: isPositioned ? 'visible' : 'hidden',
					}}
					{...getFloatingProps()}
				>
					<S.Viewport>{children}</S.Viewport>
				</S.Content>
			</FloatingFocusManager>
		</FloatingPortal>
	);
};

interface ItemProps {
	children: string;
	value: string;
}

const Item = ({ children, value }: ItemProps) => {
	const { onValueChange, value: selectedValue } = useSelect();

	const isSelected = selectedValue === value;

	const handleClick = () => {
		onValueChange(value, children);
	};

	const { onValueChange: setContextValue, selectedLabel } = useSelect();
	useEffect(() => {
		if (isSelected && !selectedLabel) {
			setContextValue(value, children);
		}
	}, [isSelected, value, children, selectedLabel, setContextValue]);

	return (
		<S.Item
			onClick={handleClick}
			$isSelected={isSelected}
			role="option"
			aria-selected={isSelected}
			tabIndex={0}
		>
			<S.ItemText>{children}</S.ItemText>
			{isSelected && (
				<S.ItemIndicator>
					<Check size={14} />
				</S.ItemIndicator>
			)}
		</S.Item>
	);
};

export const Select = {
	Root,
	Trigger,
	Value,
	Content,
	Item,
};
