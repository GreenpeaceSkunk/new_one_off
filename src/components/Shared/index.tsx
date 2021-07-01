import React from 'react';
import {GreenpeaceLogoWhite as GreenpeaceLogo} from '../../assets/icons';
import { Wrapper, Img, A } from '@bit/meema.ui-components.elements';
import ThreeCircles from '@bit/meema.ui-components.loaders.three-circles';
import { css } from 'styled-components';
import { pixelToRem } from 'meema.utils';
import Form from '../Shared/Form';

export const Logo = () => (
  <A
    href='https://greenpeace.org.ar'
  >
    <Img 
      alt='Greenpeace'
      src={GreenpeaceLogo}
      style={{
        width: '10rem',
        height: 'auto',
      }}
      width='10rem'
      height='auto'
      loading='lazy'
    />
  </A>
);

export const Loader = () => (
  <Wrapper
    customCss={css`
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      width: 100%;
      padding: ${pixelToRem(16)} 0;
    `}
  >
    <ThreeCircles 
      circleCss={css`
        background-color: ${props => props.theme.color.primary.normal};
      `}
    />
  </Wrapper>
)

export {
  Form,
};