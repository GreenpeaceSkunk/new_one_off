import React, { Suspense, memo, useMemo, useContext } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import styled, { css }  from 'styled-components';
import { Wrapper } from '@bit/meema.ui-components.elements';
import { Loader } from '../Shared';
import MainFooter, {TinyFooter} from '../Footer';
import { AppContext } from './context';
import { pixelToRem } from 'meema.utils';

const MainHeader = React.lazy(() => import('../Header'));
const HomeView = React.lazy(() => import('../Home'));
const ThankYouView = React.lazy(() => import('../ThankYou'));

const Component: React.FunctionComponent<{}> = memo(() => {
  const { queryParams } = useContext(AppContext);

  return useMemo(() => (
    <>
      <Suspense fallback={<Loader />}>
        <MainHeader />
      </Suspense>
      <Wrapper
        customCss={css`
          display: flex;
          flex-direction: column;
          margin: auto;
          min-height: 20rem;
        `}
      >
        <Switch>
          <Route exact path='/thank-you'>
            <Suspense fallback={<Loader />}>
              <ThankYouView/>
            </Suspense>
            <TinyFooter />
          </Route>
          <Route path='/'>

            <Wrapper
              customCss={css`
                min-height: ${pixelToRem(600)};
              `}
            >
            <Redirect 
              to={{
                pathname: '/registration',
                search: queryParams.toString(),
              }}
              />
            <Route path='/registration'>
              <Suspense fallback={<Loader />}>
                <HomeView />
              </Suspense>
            </Route>
            </Wrapper>

            <Suspense fallback={<Loader />}>
              <MainFooter />
            </Suspense>
          </Route>
        </Switch>
      </Wrapper>
    </>
  ), [
    queryParams,
  ]);
})

Component.displayName = 'AppRouter'
export default Component;
