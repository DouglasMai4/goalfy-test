import styled from 'styled-components';

export const ButtonStyled = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border: none;
  border-radius: 8px;
  padding: 0.5rem 1.5rem;
  cursor: pointer;
  transition: all 0.2s ease;

  ${(props) =>
		props.variant === 'primary' &&
		`
      background-color: ${props.theme.colors.primary};
      color: ${props.theme.colors.primaryForeground};

      &:hover {
        filter: brightness(1.1);
      }
    `}

    ${(props) =>
			props.variant === 'outline' &&
			`
        border: 1px solid ${props.theme.colors.border};
        background-color: transparent;
        color: ${props.theme.colors.foreground};

        &:hover {
          background-color: ${props.theme.colors.border};
        }
      `}

    ${(props) =>
			props.variant === 'ghost' &&
			`
        background-color: transparent;
        color: ${props.theme.colors.foreground};

        &:hover {
          background-color: ${props.theme.colors.border};
        }
      `}
`;
