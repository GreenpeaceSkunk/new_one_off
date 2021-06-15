import styled, { css } from 'styled-components';
import { Wrapper, Button, Nav, P } from '@bit/meema.ui-components.elements';
import { pixelToRem, borderRadius } from 'greenpeace-ui-themes';
import { SelectArrowIcon } from '../../../assets/icons';

export const Form = styled.form`
  flex: 1 0 100%;
  min-height: 100%;
`;

export const FormWrapperStep = styled(Wrapper)`
  flex: 1 0 100%;
  padding: 0 ${pixelToRem(40)};
`;

export const FormLabel = styled(P)`
  padding: ${pixelToRem(12)} 0;
`;

export const Input = styled.input`
  width: 100%;
  height: 2.5rem;
  outline: none;
  appearance: none;  
  border: 1px solid transparent;
  padding: 0.5rem;
  margin: 0 0 1rem 0;
  font-size: 1rem;
  border-radius: ${pixelToRem(borderRadius)};
  border: 1px solid ${(props) => props.theme.color.secondary.light};

  &:focus {
    border-color: ${(props) => props.theme.color.primary.normal};;
  }
`;

export const Select = styled.select<{width?: string, marginRight?: string}>`
  width: ${props => props.width ? props.width : '100%'};
  margin-right: ${props => props.marginRight ? props.marginRight : 0};
  height: 2.5rem;
  outline: none;
  appearance: none;  
  border: none;
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: ${pixelToRem(borderRadius)};
  border: 1px solid ${(props) => props.theme.color.secondary.light};
  background: url(${SelectArrowIcon}) no-repeat right ${pixelToRem(14)} top 50% white;
  cursor: pointer;

  &:focus {
    border-color: ${(props) => props.theme.color.primary.normal};;
  }
`;

export const FormButton = styled(Button)`
  border-radius: ${pixelToRem(borderRadius)};
  padding: ${pixelToRem(6)} ${pixelToRem(27)};
  margin: 0;
  color: ${({theme}) => theme.color.primary.dark};
  
  ${({format}) => (format === 'contained') && css`
    background-color: ${({theme}) => theme.color.primary.dark};
    color: white;
  `}
  
  ${({format}) => (format === 'outlined') && css`
    border-color: ${({theme}) => theme.color.primary.dark};
    &:hover {
      background-color: ${({theme}) => theme.color.primary.dark};
      color: white;
    }
  `}
`;

export const FormGroup = styled(Wrapper)`
  display: flex;
  flex-direction: row;
`;

export const SubmitNav = styled(Nav)`
  padding: ${pixelToRem(26)} ${pixelToRem(40)};
  display: flex;
  justify-content: flex-end;
  align-self: flex-end;

  > * {
    margin-right: ${pixelToRem(10)};

    &:last-child {
      margin-right: 0;
    }
  }
`;

export const Errors = styled(Wrapper)`
  width: 100%;
  text-align: center;
  background: rgb(255, 77, 79, 0.1);
  border-radius: 0.25rem;
  font-size: .9rem;
  line-height: 1.3rem;
  padding: 1rem;
  margin: 1rem 0 0 0;
  color: ${props => props.theme.color.error.normal};
`;
