import styled from 'styled-components';
import { ExternalLinkIcon, UserRoundIcon } from 'lucide-react';

export const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  backdrop-filter: blur(10px);
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
`;

export const HeaderSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

export const StyledHeaderTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: normal;
  color: ${(props) => props.theme.colors.foreground};
`;

export const Divider = styled.div`
  display: block;
  width: 1px;
  height: 1.25rem;
  background-color: ${(props) => props.theme.colors.border};
`;

export const PageTitleSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const ShareIcon = styled(ExternalLinkIcon)`
  color: ${(props) => props.theme.colors.primary};
`;

export const PageTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.foreground};
`;

export const MembersSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

export const UserIcon = styled(UserRoundIcon)`
  height: 1.25rem;
  color: ${(props) => props.theme.colors.inputForeground};
`;

export const MembersCount = styled.span`
  font-size: 1rem;
  color: ${(props) => props.theme.colors.inputForeground};
`;

export const UserPicture = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  object-fit: cover;
`;
