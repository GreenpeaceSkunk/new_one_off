import React, { memo, MouseEvent, useContext, useEffect, useMemo, useRef } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { View, Wrapper, H1 } from '@bit/meema.ui-components.elements';
import { pixelToRem } from 'meema.utils';
import { css } from 'styled-components';
import Carousel, { IRef as ICarouselRef } from '@bit/meema.ui-components.carousel';
import Stepper from '../Stepper';
import { FormContext, FormProvider } from './context';
import { Loader } from '../Shared';
import { AppContext } from '../App/context';
import ThreeCircles from '@bit/meema.ui-components.loaders.three-circles';
import { SubmitNav, Errors, Form, FormButton } from './Shared';

const Component: React.FunctionComponent<{}> = memo(() => {
  const { couponType } = useContext(AppContext);
  const { submitting, step, Forms, error, validate, goNext, goBack, } = useContext(FormContext); 
  const carouselRef = useRef<ICarouselRef>(null);
  
  useEffect(() => {
    if(carouselRef && carouselRef.current) {
      carouselRef.current.setIndex(parseInt(step) - 1);
    }
  }, [
    step,
  ]);

  return useMemo(() => (
    <Wrapper
      customCss={css`
        display: flex;
        flex-direction: column;
        width: 100%;
        background: rgba(255, 255, 255, 0.8);
        transition: all 0.5s ease;
        color: ${(props) => props.theme.text.color.primary.normal};
        padding: ${pixelToRem(30)} 0;

        @media (min-width: ${props => pixelToRem(props.theme.responsive.tablet.minWidth)}) {
          width: ${pixelToRem(500)};
          background: rgba(255, 255, 255, 0.8);
        }
      `}
    >
      <Wrapper
        customCss={css`
          margin-top: ${pixelToRem(20)};
          margin-bottom: ${pixelToRem(40)};
        `}
      >
        <Stepper step={parseInt(step)}/>
      </Wrapper>
      <Wrapper
        customCss={css`
          padding: 0 ${pixelToRem(40)} ${pixelToRem(20)} ${pixelToRem(40)};
        `}
      >
        <H1
          customCss={css`
            font-size: ${pixelToRem(20)};
            margin-bottom: ${pixelToRem(10)};
            text-align: center;

            @media(min-width: ${({theme}) => pixelToRem(theme.responsive.tablet.minWidth)}) {
              text-align: left;
            }
          `}
        >{
          (couponType === 'oneoff')
            ? 'Quiero hacer la donación por única vez'
            : (couponType === 'regular')
              ? 'Quiero apoyar con donaciones mensuales'
              : ''
          }
          </H1>
      </Wrapper>
      <Wrapper
        customCss={css`
          height: 100%;
        `}
      >
        <Carousel
          ref={carouselRef}
          showControls={false}
          showIndicators={false}
          customCss={css`
            display: flex;
            flex-direction: column;
          `}
        >
          <React.Suspense fallback={<Loader />}>
            {Object.values(Forms).map(
              (Child: React.LazyExoticComponent<React.FunctionComponent>, key: number) => (
                <Child key={key} />
              )
            )}
          </React.Suspense>
        </Carousel>
        {(error) && <Errors>{error}</Errors>}
      </Wrapper>
      <Wrapper>
        <SubmitNav>
          <Switch>
            <Route path='/registration/step/1'>
              <FormButton
                disabled={submitting}
                onClick={(evt: MouseEvent<HTMLButtonElement>) => {
                  evt.preventDefault();
                  validate()
                }}
                format='outlined'
              >
                {submitting ? (
                  <ThreeCircles circleCss={css``}/>
                ) : `Continuar`}
              </FormButton>
            </Route>
            <Route path='/registration/step/2'>
              <FormButton
                onClick={(evt: MouseEvent<HTMLButtonElement>) => {
                  evt.preventDefault();
                  goBack();
                }}
                format='text'
              >Volver
              </FormButton>
              {/* <FormButton disabled={submitting} onClick={goNext} format='contained'>
                {submitting ? (
                  <ThreeCircles circleCss={css`background-color: white;`}/>
                ) : `Enviar mi aporte`}
              </FormButton> */}
            </Route>
          </Switch>
        </SubmitNav>
      </Wrapper>
    </Wrapper>
  ), [
    submitting,
    step,
    Forms,
    couponType,
    error,
    validate,
    goNext,
  ])
});

Component.displayName = 'Forms';
export default () => useMemo(() => (
  <FormProvider>
    <Component />
  </FormProvider>
), []);

