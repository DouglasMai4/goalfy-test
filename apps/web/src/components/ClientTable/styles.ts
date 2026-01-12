import { EllipsisVerticalIcon } from 'lucide-react';
import styled from 'styled-components';

export const TableContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
  border-radius: 8px;
  border: 1px solid ${(props) => props.theme.colors.border};
  background-color: ${(props) => props.theme.colors.background}; // Exemplo de uso do theme
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
`;

export const TableElement = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 800px;
`;

export const TableHead = styled.thead`
  position: sticky;
  top: 0;
  z-index: 10;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
`;

export const TableBody = styled.tbody``;

export const TableRow = styled.tr`
  border-bottom: 1px solid ${(props) => props.theme.colors.border};

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: ${(props) => props.theme.colors.muted || '#f1f5f9'}; // Efeito de hover
  }
`;

export const TableHeaderCell = styled.th`
  text-align: left;
  padding: 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: #64748b;
  white-space: nowrap;

  div {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

export const TableCell = styled.td`
  padding: 1rem;
  font-size: 0.875rem;
  white-space: nowrap;
  color: ${(props) => props.theme.colors.foreground};
`;

export const CelCenter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Divider = styled.div`
  display: block;
  width: 1px;
  height: 1.25rem;
  margin-left: auto;
  background-color: ${(props) => props.theme.colors.border};

  @media (max-width: ${(props) => props.theme.sizes.mobile}) {
    display: none;
  }
`;

export const LoadMoreContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 1rem;
`;
