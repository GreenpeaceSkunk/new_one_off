import React, { createContext, FormEvent, useCallback, useMemo, useReducer } from 'react';
import { generatePath, useRouteMatch } from 'react-router';
import { useParams, useHistory } from 'react-router';
import { IData } from 'greenpeace';
import { ContextActionType, initialState, reducer } from './reducer';

const UserDataForm = React.lazy(() => import('./UserDataForm'));
const DonationForm = React.lazy(() => import('./DonationForm'));

export interface IContext {
  submitting?: boolean;
  data: IData;
  step: string;
  Forms: {[key: string] : React.LazyExoticComponent<React.FunctionComponent> };
  error: string | null;
  dispatch: (action: ContextActionType) => void;
  validate: () => void;
  goBack: () => void;
  goNext: () => void;
}
interface IProps {
  children: React.ReactNode | HTMLAllCollection;
}

const Context = createContext({} as IContext);
Context.displayName = 'FormContext';
const { Provider, Consumer } = Context;

const ContextProvider: React.FunctionComponent<IProps> = ({ children }) => {
  const [{ data, submitting, error, }, dispatch] = useReducer(reducer, initialState);
  const history = useHistory();
  const routeMatch = useRouteMatch();
  const { step } = useParams<{ step: string }>();

  const Forms = {
    userDataForm: UserDataForm,
    donationForm: DonationForm,
  };

  const goBack = useCallback(() => {
    history.push(generatePath(routeMatch.path, { step: parseInt(step) - 1 }));
  }, [
    step,
    Forms,
    routeMatch,
    history,
  ]);
    
  const goNext = useCallback(() => {
    if((parseInt(step) + 1) <= Object.keys(Forms).length) {
      // history.push(generatePath(routeMatch.path, { step: parseInt(step) + 1 }));
    } else {
      history.push('/thank-you');
    }
  }, [
    step,
    Forms,
    routeMatch,
    history,
  ]);

  const validate = useCallback(() => {
    console.log(step)

    switch (parseInt(step)) {  
      case 1:
        console.log('Validate step 1');
        dispatch({type: 'SET_ERROR', error: 'Se deberán completar los campos.'});
        goNext();
        break;
      case 2:
        console.log('Validate step 2')
        break;
    }

    // if(!data) {
    //   dispatch({type: 'SET_ERROR', error: 'Se deberán completar los campos.'});
    // } else {
    //   switch (stepId) {        
    //     case 1:
    //       if(!validateAmount(monto, otherAmount)) {
    //         dispatch({type: 'SET_ERROR', error: 'Monto incorrecto'});
    //       } else if(!validateEmail(email)) {
    //         dispatch({type: 'SET_ERROR', error: 'Correo eléctronico inválido'});
    //       } else if(!validateFirstName(nombre)) {
    //         dispatch({type: 'SET_ERROR', error: 'Nombre incorrecto'});
    //       } else if(!validateLastName(apellido)) {
    //         dispatch({type: 'SET_ERROR', error: 'Apellido incorrecto'});
    //       } else if(!validateAreaCode(cod_area)) {
    //         dispatch({type: 'SET_ERROR', error: 'Código de área incorrecto'});
    //       } else if(!validatePhoneNumber(telefono)) {
    //         dispatch({type: 'SET_ERROR', error: 'Teléfono incorrecto'});
    //       } else {
    //         dispatch({type: 'SET_ERROR', error: null});
    //         return true;
    //       }
    //       break;
    //     case 2:
    //       if(!validateCreditCard(creditCardNumber)) {
    //         dispatch({type: 'SET_ERROR', error: 'Tarjeta inválida'});
    //       } else if(!validateCitizenId(dni)) {
    //         dispatch({type: 'SET_ERROR', error: 'DNI inválido'});
    //       } else {
    //         dispatch({type: 'SET_ERROR', error: null});
    //         return true;
    //       }
    //       break;
    //     default: {
    //       return false;
    //     }
    //   };
    // };
  }, [
    data,
    step,
    dispatch,
    goNext,
  ]);

  return useMemo(() => (
    <Provider 
      value={{
        submitting,
        data,
        step,
        Forms,
        error,
        dispatch,
        validate,
        goBack,
        goNext,
      }}>
        {children}
      </Provider>
  ), [
    submitting,
    data,
    step,
    history,
    routeMatch,
    Forms,
    error,
    dispatch,
    validate,
    goBack,
    goNext,
  ]);
};

export {
  ContextProvider as FormProvider,
  Consumer as FormConsumer,
  Context as FormContext,
}
