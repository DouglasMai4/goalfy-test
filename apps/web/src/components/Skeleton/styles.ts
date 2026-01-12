import styled, { keyframes, css } from 'styled-components';

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

interface SkeletonProps {
	$width?: string | number;
	$height?: string | number;
	$variant?: 'text' | 'rectangular' | 'circular';
}

export const SkeletonRoot = styled.div<SkeletonProps>`
  background-color: ${(props) => props.theme.colors.input};

  background-image: linear-gradient(
    90deg,
    ${(props) => props.theme.colors.input} 0px,
    #fafafa 50%,
    ${(props) => props.theme.colors.input} 100%
  );

  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite linear;

  width: ${(props) => (typeof props.$width === 'number' ? `${props.$width}px` : props.$width || '100%')};
  height: ${(props) => (typeof props.$height === 'number' ? `${props.$height}px` : props.$height || '1rem')};

  ${(props) => {
		switch (props.$variant) {
			case 'circular':
				return css`
          border-radius: 50%;
        `;
			case 'rectangular':
				return css`
          border-radius: 4px;
        `;
			case 'text':
			default:
				return css`
          border-radius: 4px;
          margin-bottom: 0.5rem;
        `;
		}
	}}
`;
