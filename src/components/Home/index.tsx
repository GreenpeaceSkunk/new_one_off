import React, { memo, useContext, useMemo, useEffect, useState, } from 'react';
import { Redirect, Route, Switch, useRouteMatch, withRouter } from 'react-router';
import { Wrapper, H1, H2, P, View } from '@bit/meema.ui-components.elements';
import { pixelToRem } from 'meema.utils';
import styled, { css } from 'styled-components';
import RegistrationForm from '../Registration';
// import RegistrationForm from '../Forms';
import Topics from './Topics';
import {
  BackgroundHome,
  CampaignBosques,
  CampaignClimaYEnergia,
  CampaignOceanos,
  CampaignContaminacion,
  CampaignDeltaDelParana,
  CampaignSustentabilidad,
} from '../../assets/images';
import { AppContext } from '../App/context';

const HGroup = styled.hgroup`
  margin-bottom: ${pixelToRem(16)};
  text-shadow: rgba(0, 0, 0, 0.9) 0 0 ${pixelToRem(2)};

  * {
    color: white;
    line-height: 120%;
    margin-bottom: ${pixelToRem(10)};

    &:last-child {
      margin-bottom: 0;
    }
  }
  
  @media (min-width: ${({theme}) => pixelToRem(theme.responsive.tablet.minWidth)}) {
    margin-bottom: ${pixelToRem(26)};
  }
`;

const showBackground = (campaign = '') => css`
  --background-image: 
    ${(campaign === 'bosques')
      ? `url(${CampaignBosques})` 
      : (campaign === 'oceanos') 
        ? `url(${CampaignOceanos})`
        : (campaign === 'contaminacion') 
          ? `url(${CampaignContaminacion})`
          : (campaign === 'clima-y-energia')
            ? `url(${CampaignClimaYEnergia})`
            : (campaign === 'delta-del-parana')
              ? `url(${CampaignDeltaDelParana})`
                : (campaign === 'landing-sustentabilidad')
                ? `url(${CampaignSustentabilidad})`
                  : `url(${BackgroundHome})`
    };
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    background-image: linear-gradient(0deg, rgba(0, 0, 0, .75) 0%, rgba(0, 0, 0, 0) 100%), var(--background-image);
    animation-duration: 1s;
    animation-delay: 500ms;
    animation-iteration-count: infinite;
    transition: all 250ms ease;
  
    @media (min-width: ${({theme}) => pixelToRem(theme.responsive.tablet.minWidth)}) {
      background-image: linear-gradient(0deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, .75) 100%), var(--background-image);
    }

    @keyframes animate-background {
      0% {
        /* background-size: auto 100%; */
        transform: scale(1);
      }
      50% {
        /* background-size: auto 110%; */
        transform: scale(1.1);
      }
      100% {
        transform: scale(1);
        /* background-size: auto 100%; */
      }
    }
`; 

const SideWrapper = styled(Wrapper)<{ campaign: string }>`
  display: flex;
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 100%;
  padding: ${pixelToRem(44)} ${pixelToRem(106)};
  color: white;
  overflow: hidden;

  &:first-child {
    align-items: flex-end;
    padding-left: ${pixelToRem(40)};
    padding-right: ${pixelToRem(40)};
    min-height: ${pixelToRem(400)};
    ${({campaign}) => showBackground(campaign)};
  }
  
  &:last-child {
    padding: 0;
  }

  @media (min-width: ${props => pixelToRem(props.theme.responsive.tablet.minWidth)}) {
    &:first-child {
      background-image: none;
      padding-left: ${pixelToRem(60)};
      padding-right: ${pixelToRem(60)};
    }

    &:last-child {
      display: flex;
      justify-content: center;
    }
  }
`;

const Home: React.FunctionComponent<{}> = () => {
  const { queryParams, campaign } = useContext(AppContext);
  const { path } = useRouteMatch();
  
  return useMemo(() => (
    <View>
      <Wrapper
        customCss={css`
          display: flex;
          flex-direction: column;

          @media (min-width: ${props => pixelToRem(props.theme.responsive.tablet.minWidth)}) {
            flex-direction: row;
            padding: ${pixelToRem(48)} 0;
            ${showBackground(campaign?.slug)};
          }
        `}
      >
        {
          (campaign) ? (
            <>
            <SideWrapper campaign={campaign.slug}>
              <Wrapper
                customCss={css`
                  display: flex;
                  flex-direction: column;
                  justify-content: flex-end;
                  width: 100%;
                  height: 100%;

                  @media (min-width: ${({theme}) => pixelToRem(theme.responsive.tablet.minWidth)}) {
                    justify-content: flex-start;
                  }
                `}
              >
                {
                  (campaign) ? (
                    <>
                      {(campaign.title || campaign.subtitle) ? (
                        <HGroup>
                          {campaign.title ? (
                            <H1
                              customCss={css`
                                font-family: ${props => props.theme.font.family.primary.bold};
                                font-size: ${pixelToRem(28)};

                                @media (min-width: ${({theme}) => pixelToRem(theme.responsive.tablet.minWidth)}) {
                                  font-size: ${pixelToRem(34)};
                                }
                              `}
                            >{campaign.title}</H1>
                          ) : null}

                          {campaign.subtitle ? (
                            <H2
                              customCss={css`
                                font-size: ${pixelToRem(22)};
        
                                @media (min-width: ${({theme}) => pixelToRem(theme.responsive.tablet.minWidth)}) {
                                  font-size: ${pixelToRem(26)};
                                }
                              `}
                            >{campaign.subtitle}</H2>
                          ) : null}
                        </HGroup>
                      ) : null}
                      
                      <P
                        customCss={css`
                          font-size: ${pixelToRem(20)};
                          font-family: ${(props) => props.theme.font.family.primary.normal};
                          line-height: 140%;
                          color: white;
                          text-shadow: rgba(0, 0, 0, 0.9) 0 0 ${pixelToRem(2)};

                          @media (min-width: ${({theme}) => pixelToRem(theme.responsive.tablet.minWidth)}) {
                            font-size: ${pixelToRem(22)};
                          }

                          p {
                            margin-bottom: ${pixelToRem(20)};
                          }
                        `}
                        dangerouslySetInnerHTML={{__html: campaign.description}}
                      />
                    </>
                  ) : null
                }
              </Wrapper>
            </SideWrapper>
            <SideWrapper campaign={campaign.slug}>
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
            </>
          ) : null
        }
      </Wrapper>
      <Topics />
    </View>
  ), [
    path,
    queryParams,
    campaign,
  ]);
};

export default memo(withRouter(Home));
