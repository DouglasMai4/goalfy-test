import styled, { keyframes } from 'styled-components';

const slideUpAndFade = keyframes`
  from { opacity: 0; transform: translateY(2px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const Positioner = styled.div`
  z-index: 9999;
  outline: none;
`;

export const Content = styled.div<{ $ready?: boolean }>`
  background-color: ${(props) => props.theme.colors.background};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 6px;
  padding: 4px;
  min-width: 180px;
  box-shadow: 0px 10px 38px -10px rgba(22, 23, 24, 0.35),
              0px 10px 20px -15px rgba(22, 23, 24, 0.2);
  animation: ${(props) => (props.$ready ? slideUpAndFade : 'none')} 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  flex-direction: column;
`;

export const Item = styled.div<{ $danger?: boolean }>`
  font-size: 0.875rem;
  line-height: 1;
  color: ${(props) => (props.$danger ? '#ff4d4f' : props.theme.colors.foreground)};
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 8px;
  height: 32px;
  padding: 0 10px;
  position: relative;
  user-select: none;
  cursor: pointer;
  transition: background-color 0.2s;

  &:focus, &:hover {
    outline: none;
    background-color: ${(props) =>
			props.$danger ? '#fff1f0' : props.theme.colors.input};
    color: ${(props) =>
			props.$danger ? '#ff4d4f' : props.theme.colors.primary};
  }
`;

export const Separator = styled.div`
  height: 1px;
  background-color: ${(props) => props.theme.colors.border};
  margin: 5px;
`;
