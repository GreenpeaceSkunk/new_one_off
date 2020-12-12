import PaytoneOneRegularFont from './PaytoneOne/Paytone-One-Regular.ttf';
import RobotoRegularFont from './Roboto/Roboto-Regular.ttf';

import { 
  fontFace as fontFaceFn,
  fontPrimaryRegular,
  fontSecondaryRegular,
} from 'greenpeace-ui-themes';

export const fontFace = `
  ${fontFaceFn(fontPrimaryRegular, RobotoRegularFont)};
  ${fontFaceFn(fontSecondaryRegular, PaytoneOneRegularFont)};
`;
