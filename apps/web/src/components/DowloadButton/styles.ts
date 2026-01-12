import styled from 'styled-components';

import { CSVLink } from 'react-csv';

import { DownloadCloudIcon } from 'lucide-react';

export const DownloadBtn = styled(CSVLink)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border: none;
  border-radius: 8px;
  padding: 0.5rem 1.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: transparent;
  color: ${(props) => props.theme.colors.foreground};

  &:hover {
    background-color: ${(props) => props.theme.colors.border};
  }
`;

export const DownloadIcon = styled(DownloadCloudIcon)`
  height: 1rem;
  color: ${(props) => props.theme.colors.inputForeground};
`;
