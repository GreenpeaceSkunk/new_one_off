import React, { FunctionComponent } from 'react';
import { Wrapper, Header } from '@bit/meema.ui-components.elements';
import { headerHeightNormal } from 'greenpeace-ui-themes';
import { pixelToRem } from 'meema.utils';
import { css } from 'styled-components';

import { Logo } from '../../components/Shared';

const MainHeader: FunctionComponent<{}> = () => (
  <Header
    customCss={css`
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 2rem;
      height: ${pixelToRem(headerHeightNormal)};
      background: ${(props) => props.theme.color.primary.normal};

      @media (min-width: ${props => pixelToRem(props.theme.responsive.tablet.minWidth)}) {
        justify-content: flex-start;
      }
    `}
  >
    <Wrapper>
      <Logo />
    </Wrapper>
  </Header>
);

export default MainHeader;