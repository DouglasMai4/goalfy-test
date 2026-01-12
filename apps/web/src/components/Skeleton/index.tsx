import type React from 'react';
import * as S from './styles';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
	width?: string | number;
	height?: string | number;
	variant?: 'text' | 'rectangular' | 'circular';
	className?: string;
}

export const Skeleton = ({
	width,
	height,
	variant = 'text',
	className,
	...props
}: SkeletonProps) => {
	return (
		<S.SkeletonRoot
			$width={width}
			$height={height}
			$variant={variant}
			className={className}
			aria-hidden="true"
			{...props}
		/>
	);
};
