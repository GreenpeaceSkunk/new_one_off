import React, { memo, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '../../theme/globalStyle';
import Theme from '../../theme';
import ErrorBoundary from '../ErrorBoundary';
import { AppProvider } from './context';
import { initialize as initializeTagManager, pushToDataLayer } from '../../utils/googleTagManager';
import { initialize as inititalizeAnalytics, trackPage } from '../../utils/googleAnalytics';
import { initialize as initializeFacebookPixel, trackEvent } from '../../utils/facebookPixel';
import { initialize as initializeDataCrush } from '../../utils/dataCrush';
import AppRouter from './router';

initializeTagManager();
inititalizeAnalytics();
initializeFacebookPixel();
initializeDataCrush();

const Component: React.FunctionComponent<{}> = memo(() => {
  const { pathname } = useLocation();

  useEffect(() => {
    trackEvent('PageView');
    pushToDataLayer('pageview');
    trackPage("", pathname, "");
  }, [ pathname ]);

  return useMemo(() => (
    <ThemeProvider theme={Theme}>
      <GlobalStyle />
      <ErrorBoundary>
        <AppProvider>
          <AppRouter />
        </AppProvider>
      </ErrorBoundary>
    </ThemeProvider>
  ), []);
})

Component.displayName = 'App';
export default Component;
