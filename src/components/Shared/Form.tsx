import React, { useMemo } from 'react';
import Elements, { CustomCSSType } from '@bit/meema.ui-components.elements';
import styled, { css } from 'styled-components';
import { pixelToRem } from 'meema.utils';
import { OnChangeEvent } from '../../types';
import { SelectArrowIcon } from '../../assets/icons';

const sharedStyles = css`
  margin: 0;
  padding: ${pixelToRem(8)};
  width: 100%;
  height: ${pixelToRem(46)};
  font-size: ${pixelToRem(16)};
  border: 1px solid ${({theme}) => theme.color.secondary.normal};
  border-radius: ${pixelToRem(5)};
  outline: none;
  appearance: none;  

  &:focus {
    border-color: ${({theme}) => theme.color.primary.normal};
  }
`;

const Main = styled(Elements.Form)`
  position: relative;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  width: 100%;
`;

const Content = styled(Elements.Wrapper)`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Header = styled(Elements.Header)``;

const Nav = styled(Elements.Nav)`
  justify-self: flex-end;
  margin-top: ${pixelToRem(20)};
`;

const MainTitle = styled(Elements.H1)`
  font-size: ${pixelToRem(18)};
  font-family: ${({theme}) => theme.font.family.primary.normal};
  margin-bottom: ${pixelToRem(10)};
`;

const Title = styled(Elements.H2)`
  margin-bottom: ${pixelToRem(10)};
  font-size: ${pixelToRem(16)};
  font-family: ${({theme}) => theme.font.family.primary.normal};
  color: ${({theme}) => theme.color.primary.normal};
`;

const Text = styled(Elements.P)<{ highlighted?: boolean; textAlign?: string; }>`
  margin-bottom: ${pixelToRem(10)};
  
  ${({highlighted}) => (highlighted) && css`
    font-family: ${({theme}) => theme.font.family.primary.bold};
  `};
  
  ${({textAlign}) => (textAlign) && css`
    text-align: ${textAlign};
  `};
`;

const TextArea = styled(Elements.TextArea)`
  border: none;
  overflow: auto;
  outline: none;
  resize: none; 
  height: ${pixelToRem(100)};
  padding: ${pixelToRem(10)};
  background-color: white;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, .05);
  font-family: ${({theme}) => theme.font.family.primary.normal};
  border-radius: ${pixelToRem(5)};

  &:disabled {
    opacity: .5;
  }
`;

const RadioButton: React.FunctionComponent<{
  name: string;
  value: string;
  text: string;
  checkedValue: string;
  customCss?: CustomCSSType;
  onChangeHandler: (evt: OnChangeEvent) => void;
}> = ({
  name,
  value,
  text,
  checkedValue,
  customCss,
  onChangeHandler,
}) => {
  return useMemo(() => (
    <Elements.Label
      customCss={css`
        display: inline-flex;
        align-items: center;
        width: fit-content;
        cursor: pointer;
        margin-bottom: ${pixelToRem(10)};
        user-select: none;
        
        ${(customCss) && customCss};
      `}
    >
      <Elements.Input
        type='radio'
        name={name}
        value={value}
        checked={(checkedValue === value)}
        data-text={text}
        onChange={onChangeHandler}
        customCss={css`
          position: absolute;
          width: ${pixelToRem(20)};
          opacity: 0;
          cursor: pointer;
          z-index: 1;
        `}
      />
      <Elements.Wrapper
        customCss={css`
          flex: 0 0 ${pixelToRem(20)};
          width: ${pixelToRem(20)};
          height: ${pixelToRem(20)};
          border-radius: 50%;
          background-color: white;
          border: solid ${pixelToRem(1)} ${({theme}) => theme.color.secondary.normal};
          margin-right: ${pixelToRem(10)};
          transition: all 150ms ease;

          ${(checkedValue === value) && css`
            border-color: ${({theme}) => theme.color.primary.normal};
            border-width: ${pixelToRem(4)};
          `}
        `}
      />
      {text}
    </Elements.Label>
  ), [
    name,
    value,
    text,
    checkedValue,
    customCss,
    onChangeHandler,
  ]);
};

const Group: React.FunctionComponent<{
  children?: React.ReactNode | HTMLAllCollection;
  errorMessage?: string;
  hasError?: boolean;
  showError?: boolean;
}> = ({
  children,
  errorMessage,
  hasError = false,
  showError = false,
}) => useMemo(() => (
  <Elements.Wrapper
    customCss={css`
      margin-bottom: ${pixelToRem(16)};
      
      &:after {
        display: ${(hasError && showError && errorMessage) ? 'flex' : 'none'};
        margin-top: ${pixelToRem(10)};
        padding: 0 ${pixelToRem(10)};
        color: ${({theme}) => theme.color.error.normal};
        content: "${errorMessage}";
      }

      input[type="text"], input[type="email"] {
        ${(hasError && errorMessage) && css`
          border-color: ${({theme}) => theme.color.error.normal};
        `}
      }
    `}
  >{children}</Elements.Wrapper>
), [
  children,
  errorMessage,
  hasError,
  showError,
]);

const Button = styled(Elements.Button)`
  width: 100%;
  padding: ${pixelToRem(10)};
  color: white;
  background-color: ${({theme}) => theme.color.primary.normal};
  border-radius: ${pixelToRem(5)};
  font-size: ${pixelToRem(16)};
  font-family: ${({theme}) => theme.font.family.primary.normal};

  &:hover {
    background-color: ${({theme}) => theme.color.primary.dark};
  }
  
  &:disabled {
    background-color: ${({theme}) => theme.color.secondary.normal};
  
    &:hover {
      background-color: ${({theme}) => theme.color.secondary.normal};
    }
  }

  ${({format}) => (format === 'text') && css`
    background-color: transparent;
    color: ${({theme}) => theme.color.secondary.normal};
    text-decoration: underline;

    &:hover {
      background-color: transparent;
      box-shadow: none !important;
    }
  `}
`;

const Label = styled(Elements.Label)`
  position: relative;
  width: 100%;
`;

const Input = styled(Elements.Input)`
  ${sharedStyles};
`;

export const Select = styled(Elements.Select)<{width?: string, marginRight?: string}>`
  ${sharedStyles};
  height: ${pixelToRem(46)};
  background: url(${SelectArrowIcon}) no-repeat right ${pixelToRem(14)} top 50% white;
  cursor: pointer;
`;

export default {
  Button,
  Content,
  Group,
  Header,
  Input,
  Label,
  Main,
  MainTitle,
  Nav,
  RadioButton,
  Select,
  Text,
  TextArea,
  Title,
};
