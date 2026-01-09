import styled from 'styled-components';

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  cursor: text;
  width: 100%;
  transition: border-color 0.2s ease;
  background-color: ${(props) => props.theme.colors.input};
  border: 1px solid ${(props) => props.theme.colors.border};

  &:focus-within {
    border-color: ${(props) => props.theme.colors.primary};
  }

  svg {
    color: ${(props) => props.theme.colors.inputForeground};
  }
`;

export const InputStyled = styled.input`
  border: none;
  flex: 1;
  font-size: 1rem;
  background-color: transparent;
  outline: none;
  width: 100%;
  color: ${(props) => props.theme.colors.foreground};
  caret-color: ${(props) => props.theme.colors.primary};

  &::placeholder {
    color: ${(props) => props.theme.colors.inputForeground};
  }
`;
