import { DownloadCloudIcon, ListFilterIcon } from 'lucide-react';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ContainerSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const ButtonContent = styled.span`
  font-size: 1rem;
  font-weight: 600;
`;

export const RowsCounter = styled.span`
  font-size: 1rem;
  color: ${(props) => props.theme.colors.inputForeground};
`;

export const DownloadIcon = styled(DownloadCloudIcon)`
  height: 1rem;
  color: ${(props) => props.theme.colors.inputForeground};
`;

export const FilterIcon = styled(ListFilterIcon)`
  height: 1rem;
  color: ${(props) => props.theme.colors.inputForeground};
`;

export const FilterText = styled.span`
  font-size: 1rem;
  color: ${(props) => props.theme.colors.inputForeground};
`;
