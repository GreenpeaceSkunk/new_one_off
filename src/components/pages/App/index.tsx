import React, { memo, useMemo } from 'react';
import {Link, NavLink, Redirect, Route, Switch} from 'react-router-dom';
import styled, {css, ThemeProvider} from 'styled-components';
import { GlobalStyle } from '../../../theme/globalStyle';
// import {Theme} from '../../../theme/theme';
import {pushToDataLayer} from '../../../utils/gtm';
// import Registration from '../Registration';
// import ThankYou from '../ThankYou';
// import {Wrapper, LeftSideWrapper, RightSideWrapper, MainNavWrapper} from './styles';
import {DarkTheme as Theme} from 'greenpeace-ui-themes'
import Wrapper, { H1, H2, P, Span, Button, Header, Footer } from '@bit/meema.ui-components.elements';
import {GreenpeaceLogo} from '../../../assets/images/index'; 
import ThankYou from '../ThankYou';
import Registration from '../Registration';

const Logo = styled.img`
  height: auto;
  width: 10rem;
`;

const Main = styled(Wrapper)`
  display: flex;
  flex-direction: column;
  margin: auto;
  width: 80vw;
  min-height: 20rem;
  padding: 1rem 0 2rem 0;
`;

const Img = styled.img`
  width: auto;
  height: 100%;
`;

const Column: React.FunctionComponent<{
  to: string;
  title: string;
  description: string;
}> = ({
  to,
  title,
  description,
}) => {

const Title = styled(H1)`
  font-size: 1.2rem;
  line-height: 100%;
  margin-bottom: 1rem;
`;

const Description = styled(P)`
  font-size: 1rem;
`;

const A = styled.a`
  flex: 0 0 25%;
  
  @media (max-width: ${(props) => props.theme.responsive.tablet.maxWidth}) {
    flex: 0 0 50%;
  }

  @media (max-width: ${(props) => props.theme.responsive.tablet.minWidth}) {
    flex: 0 0 100%;
  }
`;


  return (
    <A
      href={to}
    >
      <Wrapper
        customCss={css`
          margin: 0.5rem;
          padding: 2rem 1rem;
          cursor: pointer;
          transition: all 0.5s ease;
          border-radius: 0.25rem;
          /* flex-basis: 25%; */
          /* flex: 0 0 25%; */
          
          &:first-child {
            margin-left: 0;
          }
        
          &:last-child {
            margin-right: 0;
          }
        
          &:hover {
            background: ${(props) => props.theme.color.primary.normal};
            color: white;
          }

          
        `}
      >
        <Title>{title}</Title>
        <Description>{description}</Description>
      </Wrapper>
    </A>
  )
}

const App: React.FunctionComponent<{}> = () => {
  pushToDataLayer('pageview');
  return useMemo(() => (
    <ThemeProvider theme={Theme}>
      <GlobalStyle />
      <Header
        customCss={css`
          display: flex;
          justify-content: center;
          min-height: 3rem;
          background: ${(props) => props.theme.color.primary.normal};
        `}
      >
        <Wrapper
          customCss={css`
            width: 80vw;
          `}
        >
          <Logo src={GreenpeaceLogo} />
        </Wrapper>
      </Header>
      <Main>
        <Wrapper
          customCss={css`
            display: flex;
            justify-content: center;  
            width: 100%;
            height: 500px;
            margin: 2rem 0;
          `}
        >
          <Img
            alt='Greenpeace'
            src='https://unite.greenpeace.org.ar/bosques/spappeal/assets/img/juntos.jpg'
          />
        </Wrapper>
        <Switch>
          <Route exact path='/thank-you'>
            <ThankYou/>
          </Route>
          <Route path='/'>
            <Redirect to='/registration' />
            <Route path='/registration'>
                <Registration />
                <Wrapper
                  customCss={css`
                    display: flex;
                    justify-content: center;
                    flex-direction: column;
                  `}>
                  <Wrapper
                    customCss={css`
                      display: flex;
                      flex-direction: column;
                      justify-content: center;
                      border-top: solid 3px ${(props) => props.theme.color.primary.normal};
                      border-bottom: solid 3px ${(props) => props.theme.color.primary.normal};
                      padding: 2rem 0;
                    `}>
                    <H1>Con tu aporte único ayudarás a:</H1>
                    <Wrapper
                      customCss={css`
                        display: flex;
                        flex-wrap: wrap;
                    `}>
                      <Column
                        to='https://www.greenpeace.org/argentina/campanas/oceanos/'
                        title='Cuidar océanos y mares'
                        description='Los océanos son vitales para nuestra vida: nos alimentan y regulan el clima.'
                      />
                      <Column
                        to='https://www.greenpeace.org/argentina/campanas/bosques/'
                        title='Proteger bosques'
                        description='Los bosques estabilizan el clima y mantienen la vida en la tierra.'
                      />
                      <Column
                        to='https://www.greenpeace.org/argentina/campanas/contaminacion/'
                        title='Reducir la contaminación'
                        description='Porque sabemos que un mundo sin contaminantes es posible.'
                      />
                      <Column
                        to='https://www.greenpeace.org/argentina/campanas/climayenergia/'
                        title='Clima y energía'
                        description='Tenemos que evitar que la temperatura de nuestro planeta siga aumentando.'
                      />
                    </Wrapper>
                  </Wrapper>
                </Wrapper>
                <Wrapper
                  customCss={css`
                    text-align: center;
                    padding: 2rem 0 1rem 0;
                  `}
                >
                  <H1 customCss={css`
                    margin-bottom: 1rem;
                  `}>Política de privacidad</H1>
                  <P>Desde <Link to='https://greenpeace.org.ar' target='blank'><Span customCss={css`
                    font-family: ${(props) => props.theme.font.family.primary.bold};
                  `}>GREENPEACE ARGENTINA</Span></Link> trataremos los datos aportados en calidad de Responsable del tratamiento con la finalidad de gestionar nuestra relación con vos, en pro de nuestros objetivos fundacionales, incluyendo en algunos casos el envío de información sobre nuestras actividades, en base al consentimiento o a la ejecución de un acuerdo</P>
                </Wrapper>
            </Route>
          </Route>
        </Switch>
      </Main>
      <Footer
        customCss={css`
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 1rem 0 2rem 0;
          width: 100vw;
          background: ${(props) => props.theme.color.primary.normal};
          align-items: center;
          color: white;
        `} 
      >
        <Logo src={GreenpeaceLogo} />
        © 2020 Greenpeace • Política de privacidad
      </Footer>
    </ThemeProvider>
  ), []);
}

export default memo(App);
