import React, { Suspense, memo, useMemo, useEffect, useContext } from 'react';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '../../theme/globalStyle';
import { pushToDataLayer } from '../../utils/gtm';
import {DarkTheme as Theme} from 'greenpeace-ui-themes'
import Wrapper from '@bit/meema.ui-components.elements';
import ErrorBoundary from '../../components/ErrorBoundary';
import { Loader } from '../../components/Shared';
import MainFooter, {TinyFooter} from '../../components/Footer';
import { trackEvent } from '../../utils/facebookPixel';
import { AppContext, AppProvider } from './context';
import { initialize as initializeTagManager } from '../../utils/gtm';
import { initialize as initializeFacebookPixel } from '../../utils/facebookPixel';

const MainHeader = React.lazy(() => import('../../components/Header'));
const HomeView = React.lazy(() => import('../Home'));
const ThankYouView = React.lazy(() => import('../ThankYou'));

const Main = styled(Wrapper)`
  display: flex;
  flex-direction: column;
  margin: auto;
  min-height: 20rem;
`;

initializeTagManager();
initializeFacebookPixel();

const App: React.FunctionComponent<{}> = () => {
  const { searchParams } = useContext(AppContext);
  const { pathname } = useLocation();

  useEffect(() => {
    console.log(pathname);
    trackEvent('PageView');
    pushToDataLayer('pageview');
  }, [ pathname ]);

  return useMemo(() => (
    <ThemeProvider theme={Theme}>
      <GlobalStyle />
      <ErrorBoundary>
        <AppProvider>
          <Suspense fallback={<Loader />}>
            <MainHeader />
          </Suspense>
          <Main>
            <Switch>
              <Route exact path='/thank-you'>
                <Suspense fallback={<Loader />}>
                  <ThankYouView/>
                </Suspense>
                <TinyFooter />
              </Route>
              <Route path='/'>
                <Redirect 
                  to={{
                    pathname: '/registration',
                    search: searchParams,
                  }}
                />
                <Route path='/registration'>
                  <Suspense fallback={<Loader />}>
                    <HomeView />
                  </Suspense>
                </Route>
                <Suspense fallback={<Loader />}>
                  <MainFooter />
                </Suspense>
              </Route>
            </Switch>
          </Main>
        </AppProvider>
      </ErrorBoundary>
    </ThemeProvider>
  ), [
    searchParams,
  ]);
}

export default memo(App);
