import styled from 'styled-components';
import { Button } from '../ui/Button';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;

  @media (max-width: ${(props) => props.theme.sizes.mobile}) {
    flex-wrap: wrap;
    width: 100%;
    gap: 1rem;

    & > button {
      flex: 1;
    }
  }
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;

  &.full {
    grid-column: 1 / -1;
  }
`;

export const Label = styled.label`
  font-size: 1rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.foreground};
`;

export const AddressContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 1rem;
  width: 100%;
`;

export const SubmitButton = styled(Button)`
  width: 100%;
`;

export const NewText = styled.span`
  font-size: 1.25rem;
  font-weight: 600;
`;

export const ErrorMessage = styled.span`
  font-size: 0.875rem;
  color: #ef4444;
`;
