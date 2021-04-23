import { ITheme } from 'meema.utils';

export const borderRadius = 4;

export const colorPrimaryLight = '#73BE1E';
export const colorPrimaryNormal = '#66cc00';
export const colorPrimaryDark = '#005C42';

export const colorSecondaryLight = '#BDBDBD';
export const colorSecondaryNormal = '#4F4F4F';

export const headingColorPrimaryNormal = '#4F4F4F';
export const headingColorSecondaryNormal = colorPrimaryDark;

export const textColorPrimaryNormal = '#4F4F4F';
export const textColorSecondaryNormal = colorPrimaryDark;

export const colorSuccess = '#3c763d';
export const colorError = '#FF4D4F';

export const fontPrimaryLight = 'Font-Primary-Light';
export const fontPrimaryBook = 'Font-Primary-Book';
export const fontPrimaryRegular = 'Font-Primary-Regular';
export const fontPrimaryMedium = 'Font-Primary-Medium';
export const fontPrimaryBold = 'Font-Primary-Bold';

export const fontSecondaryLight = 'Font-Secondary-Light';
export const fontSecondaryBook = 'Font-Secondary-Book';
export const fontSecondaryRegular = 'Font-Secondary-Regular';
export const fontSecondaryMedium = 'Font-Secondary-Medium';
export const fontSecondaryBold = 'Font-Secondary-Bold';

export const headerHeightNormal = 300;
export const footerHeightNormal = 314;

export default {
  borderRadius: 10,
  color: {
    primary: {
      normal: colorPrimaryNormal,
      dark: colorPrimaryDark,
    },
    secondary: {
      light: colorSecondaryLight,
      normal: colorSecondaryNormal,
      dark: '',
    },
    success: {
      normal: colorSuccess,
    },
    error: {
      normal: colorError,
    },
  },
  heading: {
    color: {
      primary: {
        normal: headingColorPrimaryNormal,
      },
      secondary: {
        normal: headingColorSecondaryNormal,
      },
    },
  },
  text: {
    color: {
      primary: {
        normal: textColorPrimaryNormal,
      },
      secondary: {
        normal: textColorSecondaryNormal,
      },
    },
  },
  font: {
    size: {
      _default: 16,
      h1: 30,
      h2: 20,
      p: 16,
      span: 16,
      button: 16,
    },
    family: {
      primary: {
        light: fontPrimaryLight,
        book: fontPrimaryBook,
        regular: fontPrimaryRegular,
        medium: fontPrimaryMedium,
        bold: fontPrimaryBold,
      },
      secondary: {
        light: fontSecondaryLight,
        book: fontSecondaryBook,
        regular: fontSecondaryRegular,
        medium: fontSecondaryMedium,
        bold: fontSecondaryBold,
      },
      _default: {
        h1: fontPrimaryRegular,
        h2: fontPrimaryRegular,
        h3: fontPrimaryRegular,
        h4: fontPrimaryRegular,
        h5: fontPrimaryRegular,
        h6: fontPrimaryRegular,
        div: fontPrimaryRegular,
        p: fontPrimaryRegular,
        span: fontPrimaryRegular,
        button: fontPrimaryRegular,
      }
    }
  },
  header: {
    height: {
      normal: headerHeightNormal,
    },
  },
  footer: {
    height: {
      normal: footerHeightNormal,
    },
  },
  responsive: {
    desktop: {
      minWidth: 1024,
    },
    tablet: {
      minWidth: 768,
      maxWidth: 1023,
    },
    mobile: {
      maxWidth: 767,
    },
  },
} as ITheme;
