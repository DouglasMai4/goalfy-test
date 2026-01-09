import React, {
	createContext,
	useContext,
	useEffect,
	useState,
	useCallback,
	useRef,
	type ReactNode,
} from 'react';

import { createPortal } from 'react-dom';

import { X } from 'lucide-react';

import * as S from './styles';

interface ModalContextType {
	isOpen: boolean;
	openModal: () => void;
	closeModal: () => void;
}

interface ModalRootProps {
	children: ReactNode;
  defaultOpen?: boolean;
	onOpenChange?: (isOpen: boolean) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

const useModal = () => {
	const context = useContext(ModalContext);
	if (!context) {
		throw new Error('useModal must be used within a Modal.Root');
	}
	return context;
};

const Root = ({ children, defaultOpen = false, onOpenChange }: ModalRootProps) => {
	const [isOpen, setIsOpen] = useState(defaultOpen);

	const openModal = useCallback(() => setIsOpen(true), []);
	const closeModal = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    onOpenChange?.(isOpen);

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') closeModal();
		};

		if (isOpen) {
			document.addEventListener('keydown', handleKeyDown);
		}

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [isOpen, closeModal]);

	return (
		<ModalContext.Provider value={{ isOpen, openModal, closeModal }}>
			{children}
		</ModalContext.Provider>
	);
};

interface ModalTriggerProps {
	children: ReactNode;
	asChild?: boolean;
}

const Trigger = ({ children }: ModalTriggerProps) => {
	const { openModal } = useModal();

	if (React.isValidElement(children)) {
		return React.cloneElement(children as React.ReactElement<any>, {
			onClick: openModal,
		});
	}

	return <button onClick={openModal}>{children}</button>;
};

const Portal = ({ children }: { children: ReactNode }) => {
	const { isOpen } = useModal();

	if (!isOpen) return null;

	return createPortal(
		<S.PortalContainer>{children}</S.PortalContainer>,
		document.body,
	);
};

const Overlay = () => {
	const { closeModal } = useModal();
	return <S.Overlay onClick={closeModal} />;
};

interface ModalContentProps {
	children: ReactNode;
	title?: string;
}

const Content = ({ children, title }: ModalContentProps) => {
	const { closeModal } = useModal();
	const contentRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		contentRef.current?.focus();
	}, []);

	return (
		<S.Content role="dialog" aria-modal="true" ref={contentRef} tabIndex={-1}>
			<S.Header>
				{title && <S.Title>{title}</S.Title>}
				<S.CloseButton onClick={closeModal} aria-label="Fechar">
					<X size={20} />
				</S.CloseButton>
			</S.Header>

			<S.Body>{children}</S.Body>
		</S.Content>
	);
};

const Actions = ({ children }: { children: ReactNode }) => {
	return <S.ActionsContainer>{children}</S.ActionsContainer>;
};

const Cancel = ({ children }: { children: ReactNode }) => {
	const { closeModal } = useModal();

	if (React.isValidElement(children)) {
		return React.cloneElement(children as React.ReactElement<any>, {
			onClick: closeModal,
		});
	}
	return <button onClick={closeModal}>{children}</button>;
};

export const Modal = {
	Root,
	Trigger,
	Portal,
	Overlay,
	Content,
	Actions,
	Cancel,
};
