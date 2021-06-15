import React, { memo, useContext, useMemo } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { css } from 'styled-components';
import { pixelToRem, colorPrimaryDark } from 'greenpeace-ui-themes';
import { Wrapper, H1 } from '@bit/meema.ui-components.elements';
import Carousel from '@bit/meema.ui-components.carousel';
import Stepper from '@bit/meema.ui-components.stepper';
import { SubmitNav, Errors, Form, FormButton } from '../../components/Registration/Shared';
import { RegistrationContext, RegistrationProvider } from './context';
import StepOneForm from '../../components/Registration/StepOneForm';
import StepTwoForm from '../../components/Registration/StepTwoForm';
import ThreeCircles from '@bit/meema.ui-components.loaders.three-circles';

const Component: React.FunctionComponent<{}> = () => {
  const {
    currentStep,
    error,
    submitting,
    steps,
    goBack,
    goNext,
  } = useContext(RegistrationContext);

  return useMemo(() => (
    <Wrapper
      customCss={css`
        display: flex;
        flex-direction: column;
        width: 100%;
        background: rgba(255, 255, 255, 0.8);
        transition: all 0.5s ease;
        color: ${(props) => props.theme.text.color.primary.normal};

        @media (min-width: ${props => pixelToRem(props.theme.responsive.tablet.minWidth)}) {
          width: ${pixelToRem(500)};
          background: rgba(255, 255, 255, 0.8);
        }
      `}
    >
      <Wrapper
        customCss={css`
          padding: ${pixelToRem(32)} ${pixelToRem(40)} ${pixelToRem(20)} ${pixelToRem(40)};
        `}
      >
        <H1
          customCss={css`
            font-size: ${pixelToRem(20)};
            margin-bottom: ${pixelToRem(30)};
          `}
        >Quiero hacer la donación por única vez</H1>
        <Stepper
          steps={steps}
          currentStep={currentStep}
          alignCircle='right'
          alignXLabel='left'
          alignYLabel='top'
          showAlwaysTick={true} 
        />
      </Wrapper>
      <Wrapper
        customCss={css`
          height: 100%;
        `}
      >
        <Form>
          <Carousel
            index={currentStep - 1}
            showControls={false}
            showIndicators={false}
          >
            <StepOneForm />
            <StepTwoForm />
          </Carousel>
          {(error) && <Errors>{error}</Errors>}
        </Form>
      </Wrapper>
      <Wrapper>
        <SubmitNav>
          <Switch>
            <Route path='/registration/step/1'>
              <FormButton disabled={submitting} onClick={goNext} format='outlined' primaryColor={colorPrimaryDark}>
                {submitting ? (
                  <ThreeCircles circleCss={css`background-color: ${colorPrimaryDark};`}/>
                ) : `Continuar`}
              </FormButton>
            </Route>
            <Route path='/registration/step/2'>
              <FormButton onClick={goBack} format='text'>
                Volver
              </FormButton>
              <FormButton disabled={submitting} onClick={goNext} format='contained' primaryColor={colorPrimaryDark}>
                {submitting ? (
                  <ThreeCircles circleCss={css`background-color: white;`}/>
                ) : `Enviar mi aporte`}
              </FormButton>
            </Route>
          </Switch>
        </SubmitNav>
      </Wrapper>
  </Wrapper>
  ), [
    currentStep,
    error,
    submitting,
    steps,
    goBack,
    goNext,
  ]);
};

const Registration = memo(withRouter(Component));

export default withRouter(() => useMemo(() => (
	<RegistrationProvider>
		<Registration />
	</RegistrationProvider>
), []));

Registration.displayName = 'Registration';