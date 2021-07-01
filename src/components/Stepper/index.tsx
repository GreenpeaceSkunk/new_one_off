import React, { memo, useContext, useMemo } from 'react';
import { pixelToRem } from 'meema.utils';
import { Wrapper } from '@bit/meema.ui-components.elements';
import styled, { css } from 'styled-components';
import { TickIcon } from '../../assets/icons'; 
import { FormContext } from '../Forms/context';

interface IShared {
  status: 'toDo' | 'inProgress' | 'done';
}

const Circle = styled(Wrapper)<IShared>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 ${pixelToRem(28)};
  height: ${pixelToRem(28)};
  border-radius: 50%;
  background-color: white;

  ${({ status }) => (status) && css`
    ${(status === 'toDo') && css`
      background-color: white;
      border: ${pixelToRem(2)} solid ${({theme}) => theme.color.secondary.light};
    `}
    
    ${(status === 'inProgress') && css`
      background-color: ${({theme}) => theme.color.primary.normal};
      border-color: ${({theme}) => theme.color.primary.normal};
    `}
    
    ${(status === 'done') && css`
      background-color: ${({theme}) => theme.color.primary.normal};
      border-color: ${({theme}) => theme.color.primary.normal};
  
      &:before {
        width: ${pixelToRem(12)}; 
        height: ${pixelToRem(12)};
        background-image: url(${TickIcon});
        background-size: ${pixelToRem(12)} ${pixelToRem(12)};
        background-repeat: no-repeat;
        content: "";
        transition: all 250ms ease;
      }
    `}
  `};
`;

const Line = styled(Wrapper)<IShared>`
  display: flex;
  
  &:before, &:after {
    display: flex;
    width: ${pixelToRem(60)};
    height: ${pixelToRem(2)};
    content: "";
  }

  ${({ status }) => (status) && css`
    ${(status === 'toDo') && css`
      background-color: ${({theme}) => theme.color.secondary.light};
    `}
    
    ${(status === 'done') && css`
      background-color: ${({theme}) => theme.color.primary.normal};
    `}
  `};

  &:before {
    ${({ status }) => (status) && css`
      ${(status === 'inProgress') && css`
        background-color: ${({theme}) => theme.color.primary.normal};
      `}
    `};
  }
  
  &:after {
    ${({ status }) => (status) && css`
      ${(status === 'inProgress') && css`
        background-color: ${({theme}) => theme.color.secondary.light};
      `}
    `};
  }
  
  &:last-child {
    display: none;
  }
`;

const Component: React.FunctionComponent<{
  step: number;
}> = ({
  step,
}) => {
  const { Forms } = useContext(FormContext); 

  return useMemo(() => (
    <Wrapper
      customCss={css`
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
      `}
    >
      {Object.keys(Forms).map((key: string, idx: number) => (
        <React.Fragment key={key}>
          <Circle status={((idx+1) < step) ? 'done' : ((idx+1) === step) ? 'inProgress' : 'toDo'}/>
          <Line status={((idx+1) < step) ? 'done' : ((idx+1) === step) ? 'inProgress' : 'toDo'}/>
        </React.Fragment>
      ))}
    </Wrapper>
  ), [
    step,
    Forms,
  ])
}

Component.displayName = 'Stepper';
export default memo(Component);
