import React, { memo, useContext, useMemo, useEffect, useState, } from 'react';
import { Redirect, Route, Switch, useRouteMatch, withRouter } from 'react-router';
import { Wrapper, H1, H2, P, View } from '@bit/meema.ui-components.elements';
import { pixelToRem } from 'greenpeace-ui-themes';
import styled, { css } from 'styled-components';
import RegistrationForm from '../Registration';
import Topics from './Topics';
import {
  BackgroundHome,
  CampaignBosques,
  CampaignClimaYEnergia,
  CampaignOceanos,
  CampaignContaminacion,
  CampaignDeltaDelParana,
} from '../../assets/images';
import { AppContext } from '../App/context';
import { data } from '../../data/campaigns.json';
// import config from '../../config';
import { CampaignType } from 'greenpeace';

const HGroup = styled.hgroup`
  margin-bottom: ${pixelToRem(16)};
  font-family: ${props => props.theme.font.family.primary.bold};
  text-shadow: rgba(0, 0, 0, 0.9) 0 0 ${pixelToRem(2)};

  * {
    color: white;
    line-height: 120%;
  }

  h1 {
    font-size: ${pixelToRem(28)};
    margin-bottom: ${pixelToRem(10)};

    @media (min-width: ${({theme}) => pixelToRem(theme.responsive.tablet.minWidth)}) {
      font-size: ${pixelToRem(30)};
    }
  }
  
  h2 {
    font-size: ${pixelToRem(22)};
    
    @media (min-width: ${({theme}) => pixelToRem(theme.responsive.tablet.minWidth)}) {
      font-size: ${pixelToRem(26)};
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
  const { queryParams } = useContext(AppContext);
  const { path } = useRouteMatch();
  const [ campaign, setCampaign ] = useState<CampaignType>();

  useEffect(() => {
    if(queryParams.get('campaign')) {
      setCampaign(queryParams.get('campaign') as CampaignType);
    } else {
      setCampaign('default');
    }
  }, [
    queryParams.get('campaign'),
  ])
  
  return useMemo(() => (
    <View>
      <Wrapper
        customCss={css`
          display: flex;
          flex-direction: column;

          @media (min-width: ${props => pixelToRem(props.theme.responsive.tablet.minWidth)}) {
            flex-direction: row;
            padding: ${pixelToRem(48)} 0;
            ${showBackground(queryParams.get('campaign') || '')};
          }
        `}
      >
        <SideWrapper campaign={queryParams.get('campaign') || ''}>
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
                  {(data[campaign].title || data[campaign].subtitle) ? (
                    <HGroup>
                      {data[campaign].title ? (
                        <H1>{data[campaign].title}</H1>
                      ) : null}

                      {data[campaign].subtitle ? (
                        <H2>{data[campaign].subtitle}</H2>
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
                    dangerouslySetInnerHTML={{__html: data[campaign].description}}
                  />
                </>
              ) : null
            }
            
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
    campaign,
  ]);
};

export default memo(withRouter(Home));
