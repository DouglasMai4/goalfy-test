import { type ComponentProps, type ElementType, useRef } from 'react';
import { InputContainer, InputStyled } from './styles';

interface InputProps extends ComponentProps<'input'> {
	icon?: ElementType;
}

export function Input({ icon: Icon, ...props }: InputProps) {
	const inputRef = useRef<HTMLInputElement>(null);

	function handleContainerClick() {
		inputRef.current?.focus();
	}

	return (
		<InputContainer onClick={handleContainerClick}>
			{Icon && <Icon size={20} />}

			<InputStyled ref={inputRef} {...props} />
		</InputContainer>
	);
}
