import { DownloadCloudIcon, ListFilterIcon } from 'lucide-react';

import styled from 'styled-components';
import { Button } from '../ui/Button';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: ${(props) => props.theme.sizes.mobile}) {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }
`;

export const MainActionsSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: ${(props) => props.theme.sizes.mobile}) {
    flex-wrap: wrap;
    width: 100%;
    gap: 1rem;

    & > button {
      flex: 1;
    }
  }
`;

export const SecondaryActionsSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: ${(props) => props.theme.sizes.mobile}) {
    justify-content: flex-end;
  }
`;

export const SearchWrapper = styled.div`
  @media (max-width: ${(props) => props.theme.sizes.mobile}) {
    width: 100%;
    order: -1;

    & > div {
      width: 100%;
      min-width: 0;
    }
  }
`;

export const ButtonContent = styled.span`
  font-size: 1rem;
  font-weight: 600;
`;

export const RowsCounter = styled.span`
  font-size: 1rem;
  color: ${(props) => props.theme.colors.inputForeground};

  @media (max-width: ${(props) => props.theme.sizes.mobile}) {
    display: none;
    width: 100%;
    text-align: center;
    order: 3;
  }
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

export const DropdownContent = styled.div`
  padding: 0.5rem 1rem;
  display: grid;
  grid-template-columns: repeat(2, minmax(100px, 1fr));
  gap: 0.5rem;
`;

export const DropdownSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Label = styled.label`
  font-size: 1rem;
  font-weight: 600;
`;

export const FilterButton = styled(Button)`
  grid-column: 1 / -1;
`;
