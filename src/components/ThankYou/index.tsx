import React, { memo, useEffect, useMemo } from 'react';
import {withRouter } from 'react-router-dom';
import { Wrapper, A, H1, Span, View } from '@bit/meema.ui-components.elements'
import { css } from 'styled-components';
import { backgroundImage } from '../../styles/mixins';
import { bg_thank_you_page } from '../../assets/images';
import { headerHeightNormal } from 'greenpeace-ui-themes';
import { pixelToRem } from 'meema.utils';
import { trackEvent as trackFacebookPixelEvent } from '../../utils/facebookPixel';
import { trackEvent as trackDataCrushEvent } from '../../utils/dataCrush';

const ThankYou: React.FunctionComponent<{}> = () => {
  useEffect(() => {
    trackFacebookPixelEvent('Donate');
    trackDataCrushEvent(`${process.env.REACT_APP_DATA_CRUSH_EVENT_SK_THANK_YOU_PAGE}`);
  }, []);
  
  return useMemo(() => (
    <View
      customCss={css`
        width: 100%;
        height: calc(100vh - ${pixelToRem(headerHeightNormal)} - ${pixelToRem(80)});
        ${backgroundImage(bg_thank_you_page)};
        color: white;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
      `}
    >
      <Wrapper
        customCss={css`
          display: flex;
          flex-direction: column;
          padding-bottom: ${pixelToRem(50)};
          align-items: center;
        `}
      >
        <H1
          customCss={css`
            font-size: ${pixelToRem(86)};
            color: white;
          `}
        >GRACIAS</H1>
        <Span
          customCss={css`
            font-size: ${pixelToRem(24)};
            color: white;
        `}
        >POR APOYAR NUESTRA CAUSA</Span>
        <A
          href='https://comunidad.greenpeace.la'
          customCss={css`
            margin-top: ${pixelToRem(127)};
            color: ${props => props.theme.color.primary.normal};
          `}
        >
          <Span
            customCss={css`
              font-size: ${pixelToRem(20)};
              color: white;
            `}
          >SE PARTE DE GREENPEACE</Span>
        </A>
      </Wrapper>
    </View>
  ), []);
}

export default memo(withRouter(ThankYou));