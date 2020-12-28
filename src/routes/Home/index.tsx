import React, { memo, useContext, useMemo } from 'react';
import { Redirect, Route, Switch, useRouteMatch, withRouter } from 'react-router';
import Wrapper, { H1, P, View } from '@bit/meema.ui-components.elements';
import { pixelToRem } from 'greenpeace-ui-themes';
import styled, { css } from 'styled-components';
import { BackgroundHome } from '../../lib/images/index';
import RegistrationForm from '../Registration';
import Topics from '../../components/Home/Topics';
import { backgroundImage } from '../../styles/mixins';
import { AppContext } from '../App/context';

const SideWrapper = styled(Wrapper)`
  flex: 1 100%;
  padding: ${pixelToRem(44)} ${pixelToRem(106)};
  color: white;
  height: 100%;

  &:first-child {
    padding-left: ${pixelToRem(60)};
    padding-right: ${pixelToRem(60)};
    ${backgroundImage(BackgroundHome)};
  }
  
  &:last-child {
    padding: 0;
  }

  @media (min-width: ${props => pixelToRem(props.theme.responsive.tablet.minWidth)}) {
    &:first-child {
      background-image: none;
    }

    &:last-child {
      display: flex;
      justify-content: center;
    }
  }
`;

const Home: React.FunctionComponent<{}> = () => {
  const { searchParams } = useContext(AppContext);
  const { path } = useRouteMatch();
  
  return useMemo(() => (
    <View>
      <Wrapper
        customCss={css`
          display: flex;
          flex-direction: column;

          @media (min-width: ${props => pixelToRem(props.theme.responsive.tablet.minWidth)}) {
            flex-direction: row;
            padding: 3rem 0;
            ${backgroundImage(BackgroundHome)};
          }
        `}
      >
        <SideWrapper>
          <Wrapper
            customCss={css`
              width: 100%;
            `}
          >
            <H1
              customCss={css`
                font-family: ${props => props.theme.font.family.primary.light};
                letter-spacing: 12%;
                margin-bottom: ${pixelToRem(26)};
              `}
            >HOY, GREENPEACE SOS VOS.</H1>
            <P
              customCss={css`
                font-size: ${pixelToRem(20)};
                font-family: ${(props) => props.theme.font.family.primary.normal};
                line-height: 140%;
              `}
            >Gracias al aporte de personas como vos pudimos seguir cuidando nuestro planeta durante todo el 2020. Es hora de mirar hacia el futuro y de planear un nuevo año lleno de acciones verdes.</P>
          </Wrapper>
        </SideWrapper>
        <SideWrapper>
          <Switch>
            <Route path={`${path}/step/:stepId`}>
              <RegistrationForm/>
            </Route>
            <Redirect from={path} to={{
              pathname: `${path}/step/1`,
              search: searchParams
            }} />
          </Switch>
        </SideWrapper>
      </Wrapper>
      <Topics />
    </View>
  ), [
    path,
    searchParams,
  ]);
};

export default memo(withRouter(Home));
