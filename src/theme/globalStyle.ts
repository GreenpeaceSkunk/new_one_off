/// <reference path="../fonts/index.d.ts" />

import { createGlobalStyle, DefaultTheme } from "styled-components";
import { 
  fontPrimaryRegular,
  fontPrimaryBold,
  fontPrimaryMedium,
  fontSecondaryRegular,
} from 'greenpeace-ui-themes';
// import { fontFace } from '../fonts/index';

import PaytoneOneRegularFont from '../fonts/PaytoneOne/Paytone-One-Regular.ttf';
import RobotoMediumFont from '../fonts/Roboto/Roboto-Medium.ttf';
import RobotoRegularFont from '../fonts/Roboto/Roboto-Regular.ttf';
import RobotoBoldFont from '../fonts/Roboto/Roboto-Bold.ttf';

export const GlobalStyle = createGlobalStyle<DefaultTheme>`

  @font-face {
    font-family: ${fontPrimaryMedium};
    src: url(${RobotoMediumFont});
  }
  
  @font-face {
    font-family: ${fontPrimaryRegular};
    src: url(${RobotoRegularFont});
  }
  
  @font-face {
    font-family: ${fontPrimaryBold};
    src: url(${RobotoBoldFont});
  }
  
  @font-face {
    font-family: ${fontSecondaryRegular};
    src: url(${PaytoneOneRegularFont});
  }

  body {
    padding: 0;
    margin: 0;
    font-family: ${fontPrimaryRegular};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  a {
    text-decoration: none;
    color: black;
  }

  ul {
    list-style-type: none;
  }

`;
