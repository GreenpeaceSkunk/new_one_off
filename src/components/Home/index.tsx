import React, { memo, useContext, useMemo } from 'react';
import { Redirect, Route, Switch, useRouteMatch, withRouter } from 'react-router';
import { Wrapper, H1, P, View } from '@bit/meema.ui-components.elements';
import { pixelToRem } from 'greenpeace-ui-themes';
import styled, { css } from 'styled-components';
import RegistrationForm from '../Registration';
import Topics from './Topics';
import { BackgroundHome, CampaignBosques, CampaignClimaYEnergia, CampaignOceanos, CampaignContaminacion } from '../../assets/images';
import { AppContext } from '../App/context';
import config from '../../config';

const showBackground = (campaign = '') => css`
  transition: all 250ms ease;

  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-image: 
    ${(campaign === 'bosques')
      ? `url(${CampaignBosques})` 
      : (campaign === 'oceanos') 
        ? `url(${CampaignOceanos})`
          : (campaign === 'contaminacion') 
          ? `url(${CampaignContaminacion})`
            : (campaign === 'clima-y-energia')
              ? `url(${CampaignClimaYEnergia})`
              : `url(${BackgroundHome})`
    };
`; 

const SideWrapper = styled(Wrapper)<{ campaign: string }>`
  flex: 1 100%;
  padding: ${pixelToRem(44)} ${pixelToRem(106)};
  color: white;
  height: 100%;

  &:first-child {
    padding-left: ${pixelToRem(60)};
    padding-right: ${pixelToRem(60)};

    ${({campaign}) => (campaign) && showBackground(campaign) }
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
  const { queryParams } = useContext(AppContext);
  const { path } = useRouteMatch();
  
  return useMemo(() => (
    <View>
      <Wrapper
        customCss={css`
          display: flex;
          flex-direction: column;

          ${showBackground(queryParams.get('campaign') || '')};

          @media (min-width: ${props => pixelToRem(props.theme.responsive.tablet.minWidth)}) {
            flex-direction: row;
            padding: 3rem 0;
          }
        `}
      >
        <SideWrapper
          campaign={queryParams.get('campaign') || ''}>
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
                color: white;

              `}
            >
              {
                (queryParams && config.campaigns[`${queryParams.get('campaign')}`])
                ? config.campaigns[`${queryParams.get('campaign')}`].title
                : 'GREENPEACE SOS VOS'
              }
            </H1>
            <P
              customCss={css`
                font-size: ${pixelToRem(22)};
                font-family: ${(props) => props.theme.font.family.primary.normal};
                line-height: 140%;
                color: white;
                text-shadow: 0 0 ${pixelToRem(0)} rgba(0, 0, 0, .5);

              `}
            >
              {
                (queryParams && config.campaigns[`${queryParams.get('campaign')}`])
                ? config.campaigns[`${queryParams.get('campaign')}`].description
                : 'Gracias al aporte de personas como vos pudimos seguir cuidando nuestro planeta durante todo el 2020. Es hora de mirar hacia el futuro y de planear un nuevo año lleno de acciones verdes.'
              }
              </P>
          </Wrapper>
        </SideWrapper>
        <SideWrapper campaign={queryParams.get('campaign') || ''}>
          <Switch>
            <Route path={`${path}/step/:stepId`}>
              <RegistrationForm/>
            </Route>
            <Redirect from={path} to={{
              pathname: `${path}/step/1`,
              search: queryParams.toString(),
            }} />
          </Switch>
        </SideWrapper>
      </Wrapper>
      <Topics />
    </View>
  ), [
    path,
    queryParams,
  ]);
};

export default memo(withRouter(Home));
