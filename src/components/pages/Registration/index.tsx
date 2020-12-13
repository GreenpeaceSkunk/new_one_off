import React, { ChangeEvent, MouseEvent, FormEvent, memo, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { NavLink, Redirect, Route, RouteComponentProps, Switch, useHistory, withRouter } from 'react-router-dom';
import styled, { css } from 'styled-components';
import Wrapper, { H1, H2, P, Span, Button, Header } from '@bit/meema.ui-components.elements';
import { RegistrationContext, RegistrationProvider } from './context';

interface MatchParams {};
interface IProps extends RouteComponentProps<MatchParams> {};

const amount = ['399', '699', '1200'];

const Form = styled.form`
  padding: 2rem 0;

  
`;


const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin: 1rem 0 0 0;
  font-size: 1rem;
`;

const Amount = styled(Button)`
  display: inline-block;
  padding: 0.5rem;
  margin: 0.5rem 0;
  border: 1px solid ${({theme: {color}}) => color.primary.normal};
  color: ${({theme: {color}}) => color.primary.normal};
  background: white;
  border-radius: 0.7rem;
  font-weight: bold;
  font-size: 1.2rem;
  margin-right: 0.6rem;

  &:hover, &.selected {
    background: ${({theme: {color}}) => color.primary.normal};
    color: white;
  }

  &:last-child {
    margin-right: 0;
  }
`;

const FormButton = styled(Button)`
  width: 100%;
  background: ${({theme}) => theme.color.secondary.normal};
  color: white;
  border-radius: 0.25rem;
  margin: 1rem 0;
`;

const Component: React.FunctionComponent<IProps> = ({
  match,
}) => {

const {
  data,
  dispatch,
  validate,
} = useContext(RegistrationContext);
const history = useHistory();

const onSubmit = useCallback((evt: FormEvent<any>) => {
  evt.preventDefault();
  validate();
  history.push('/registration/step-2');
}, [
  data,
  validate,
]);

const donate = useCallback((evt: FormEvent<any>) => {
  evt.preventDefault();
  validate();
  history.push('/thank-you');
}, [
  data,
  validate,
]);


const onChange = useCallback((evt: MouseEvent<HTMLButtonElement> | ChangeEvent<HTMLInputElement>) => {
  evt.preventDefault();
  dispatch({
    type: 'UPDATE_USER_DATA',
    payload: { [evt.currentTarget.name]: evt.currentTarget.value }
  });
}, [
  dispatch,
]);

const Errors = styled(Wrapper)`
  width: 100%;
  background: rgb(255, 77, 79, 0.1);
  border-radius: 0.25rem;
  font-size: .9rem;
  line-height: 1.3rem;
  padding: 1rem;
  margin: 0 0 2rem 0;
  color: #FF4D4F;
`;

  return useMemo(() => (
    <Wrapper
      customCss={css`
        align-self: center;
        width: 70%;
        padding: 1rem 0;
        transition: all 0.5s ease;
      
        @media (max-width: ${(props) => props.theme.responsive.tablet.maxWidth}) {
          width: 100%;
        }
      `}
    >
      <Switch>
        <Route path={`${match.path}/step-1`}>
          <Header>
            <H1>DONÁ A GREENPEACE PARA DEFENDER EL MEDIOAMBIENTE</H1>
            <P>En Greenpeace continuamos enfrentando los peligros que amenazan al planeta. Tu apoyo es fundamental para proteger el medioambiente. <span className='highlighted'>Sumá tu donación mensual ahora:</span></P>
          </Header>
          <Form>
            <H2>PASO 1 (Monto a donar x mes + Tus datos)</H2>
            <Wrapper
              customCss={css`
                padding: 1rem 0 0 0;
              `}
            >
              {amount.map((amount: string, idx: number) => (
                <Amount
                  key={idx}
                  onClick={onChange}
                  name='amount'
                  value={amount}
                  className={(data?.amount === amount) ? 'selected' : ''}
                >${amount}</Amount>
              ))}
              <Amount 
                onClick={onChange}
                name='amount'
                value={0}
                className={(data?.amount === '0') ? 'selected' : ''}
              >Otro importe</Amount>
              <Input
                type='number'
                name='amount'
                placeholder='Otro importe'
                value={data?.amount || ''}
                onChange={onChange}
              />
            </Wrapper>
            <Wrapper>
              <Input type='email' name='email' value={data?.email || ''} placeholder='Email' onChange={onChange} />
              <Input type='text' name='firstName' value={data?.firstName || ''} placeholder='Nombre' onChange={onChange} />
              <Input type='text' name='lastName' value={data?.lastName || ''} placeholder='Apellido' onChange={onChange} />
              <Wrapper
                customCss={css`
                  display: flex;
                  flex-direction: row;
                `}
              >
                <Input 
                  style={{
                    width: '30%',
                    marginRight: '1rem',
                  }}
                  type='number'
                  name='phoneAreaCode'
                  value={data?.phoneAreaCode || ''}
                  placeholder='Código de área'
                  onChange={onChange}
                />
                <Input type='number' name='phoneNumber' value={data?.phoneNumber || ''} placeholder='Telefono' onChange={onChange} />
              </Wrapper>
            </Wrapper>
            {/* <Wrapper>
              Importe: {data?.amount}<br/>
              Email: {data?.email}<br/>
              Nombre: {data?.firstName}<br/>
              Apellido: {data?.lastName}<br/>
              Codigo de Area: {data?.phoneAreaCode} - {data?.phoneNumber}<br/>
            </Wrapper> */}
            <FormButton type='submit' onClick={onSubmit}>Continuar</FormButton>
            {/* <Errors>
              Errors
            </Errors> */}
          </Form>
        </Route>
        <Route path={`${match.path}/step-2`}>
          <Header>
            <H1>DONÁ A GREENPEACE PARA DEFENDER EL MEDIOAMBIENTE</H1>
            <p>Ya solo falta 1 paso más para asociarte. Completá el formulario con los datos de tu tarjeta:</p>
          </Header>
          <Form>
            <H2>PASO 2 (Completá tu donación)</H2>
            <Wrapper
              customCss={css`
                padding: 1rem 0 0 0;
              `}
            >
              <Input type='string' name='cardNumber' maxLength={16} value={data?.cardNumber || ''} placeholder='Número de tarjeta' onChange={onChange} />
              <Input type='string' name='dni' maxLength={8} value={data?.dni || ''} placeholder='DNI' onChange={onChange} />
            </Wrapper>
            <Wrapper
              customCss={
                css`
                  display: flex;
                  flex-direction: column;
                `
              }
            >
              <FormButton type='submit' onClick={donate}>Doná</FormButton>
              <NavLink 
                to='/registration/step-1'
                style={{
                  alignSelf: 'center',
                  textDecoration: 'none',
                }}
              >
                
                <Button
                  customCss={css`
                    display: inline-flex;
                    align-self: center;
                    background: transparent;
                  `}
                >Volver</Button>
              </NavLink>
            </Wrapper>
          </Form>
        </Route>
          <Redirect from={`${match.path}`} to={`${match.path}/step-1`} />
      </Switch>
    </Wrapper>
  ), [
    match,
    data,
    dispatch,
    validate,
  ]);
};

const Registration = memo(withRouter(Component));

export default () => useMemo(() => (
	<RegistrationProvider>
		<Registration />
	</RegistrationProvider>
), []);

Registration.displayName = 'Registration';