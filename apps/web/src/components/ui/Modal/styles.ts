import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideIn = keyframes`
  from { opacity: 0; transform: translate(-50%, -48%) scale(0.96); }
  to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
`;

export const PortalContainer = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5); // Fundo escuro semi-transparente
  backdrop-filter: blur(2px); // Um toque moderno estilo iOS/Glassmorphism
  animation: ${fadeIn} 0.2s ease-out;
  z-index: 1;
`;

export const Content = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 500px; // Largura máxima do modal
  max-height: 85vh;
  background-color: ${(props) => props.theme.colors.background};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 8px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  z-index: 2;
  animation: ${slideIn} 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  flex-direction: column;
  outline: none;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  padding-right: 0.5rem;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  background-color: ${(props) => props.theme.colors.modalHeader};
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
`;

export const Title = styled.h2`
  font-size: 1rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.foreground};
`;

export const CloseButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  color: ${(props) => props.theme.colors.inputForeground};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border-radius: 4px;
  transition: color 0.2s, background-color 0.2s;

  &:hover {
    color: ${(props) => props.theme.colors.primary};
    background-color: ${(props) => props.theme.colors.input};
  }
`;

export const Body = styled.div`
  padding: 1.5rem;
  overflow-y: auto; // Permite scroll se o conteúdo for grande
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ActionsContainer = styled.div`
    margin-top: 1rem;
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
    width: 100%;
`;
