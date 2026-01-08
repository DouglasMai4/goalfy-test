import type { ButtonHTMLAttributes } from 'react';
import { ButtonStyled } from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: 'primary' | 'outline' | 'ghost';
}

export const Button = ({
	children,
	variant = 'primary',
	...props
}: ButtonProps) => {
	return (
		<ButtonStyled variant={variant} {...props}>
			{children}
		</ButtonStyled>
	);
};
