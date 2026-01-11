import styled, { css } from 'styled-components';

export const TriggerButton = styled.button<{ $isOpen: boolean }>`
  all: unset;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background-color: ${(props) => props.theme.colors.background};
  border: 1px solid ${(props) =>
		props.$isOpen ? props.theme.colors.primary : props.theme.colors.border};
  border-radius: 6px;
  color: ${(props) => props.theme.colors.foreground};
  cursor: pointer;
  box-sizing: border-box;
  transition: border-color 0.2s, box-shadow 0.2s;

  &:hover {
    border-color: ${(props) => props.theme.colors.inputForeground};
  }

  &:focus-visible {
    outline: 2px solid ${(props) => props.theme.colors.primary};
    border-color: ${(props) => props.theme.colors.primary};
  }
`;

export const ValueText = styled.span<{ $isPlaceholder: boolean }>`
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${(props) =>
		props.$isPlaceholder
			? props.theme.colors.inputForeground
			: props.theme.colors.foreground};
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.colors.inputForeground};
  margin-left: 8px;
`;

export const Content = styled.div`
  background-color: ${(props) => props.theme.colors.background};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 6px;
  box-shadow: 0px 10px 38px -10px rgba(22, 23, 24, 0.35),
              0px 10px 20px -15px rgba(22, 23, 24, 0.2);
  z-index: 9999;
  overflow: hidden;
  max-height: var(--radix-select-content-available-height); // Opcional se usar size
`;

export const Viewport = styled.div`
  padding: 5px;
  display: flex;
  flex-direction: column;
`;

export const Item = styled.div<{ $isSelected: boolean }>`
  font-size: 0.9rem;
  line-height: 1;
  color: ${(props) => props.theme.colors.foreground};
  border-radius: 4px;
  display: flex;
  align-items: center;
  height: 35px;
  padding: 0 35px 0 25px;
  position: relative;
  user-select: none;
  cursor: pointer;
  transition: background-color 0.1s;

  &:focus, &:hover {
    background-color: ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.colors.primaryForeground};
    outline: none;
  }

  ${(props) =>
		props.$isSelected &&
		css`
     font-weight: 600;
  `}
`;

export const ItemText = styled.span``;

export const ItemIndicator = styled.div`
  position: absolute;
  left: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
