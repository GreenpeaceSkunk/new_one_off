import React, { createContext, FormEvent, useCallback, useEffect, useMemo, useReducer, useState, MouseEvent, ChangeEvent, useContext } from 'react';
import { IUserData } from 'greenpeace';
import { useParams, withRouter, RouteComponentProps, useHistory } from 'react-router';
import { ContextActionType, initialState, reducer } from './reducer';
import { submitData, submitDataWithSteps, IResponse } from './service';
import {
  validateAmount,
  validateCreditCard,
  validateEmail,
  validateFirstName,
  validateLastName,
  validateCitizenId,
  validateAreaCode,
  validatePhoneNumber,
} from './utils';
import { AppContext } from '../App/context';


type OnChangeEvent = MouseEvent<HTMLButtonElement> | ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>;

interface IContext {
  data: IUserData;
  error: string | null;
  currentStep: number;
  submitting?: boolean;
  submitted?: boolean;
  steps:string[];
  goBack: (evt: FormEvent<any>) => void;
  goNext: (evt: FormEvent<any>) => void;
  onChange: (evt: OnChangeEvent) => void;
  dispatch: (action: ContextActionType) => void;
  validate: (stepId: number) => boolean;
}

interface IProps {
  children: React.ReactNode | HTMLAllCollection;
}

const steps:string[] = ['Paso 1', 'Paso 2'];

const Context = createContext({} as IContext);
Context.displayName = 'RegistrationContext';
const { Provider, Consumer } = Context;

const ContextProvider: React.FunctionComponent<IProps & RouteComponentProps> = ({ children }) => {
  const history = useHistory();
  const [{ data, error, submitted, submitting }, dispatch] = useReducer(reducer, initialState);
  const { stepId } = useParams<{ stepId: string }>();
  const [ currentStep, setCurrentStep ] = useState<number>(1);
  const [ postId, setPostId ] = useState<number>(0);
  const { refParam } = useContext(AppContext);

  const onChange = useCallback((evt: OnChangeEvent) => {
    evt.preventDefault();
    dispatch({
      type: 'UPDATE_USER_DATA',
      payload: { [evt.currentTarget.name]: evt.currentTarget.value }
    });
  }, [
    dispatch,
  ]);

  const validate = useCallback((stepId: number): boolean => {
    const { monto, otherAmount, email, nombre, apellido, cod_area, telefono, creditCardNumber, dni } = data;
    if(!data) {
      dispatch({type: 'SET_ERROR', error: 'Se deberán completar los campos.'});
    } else {
      switch (stepId) {        
        case 1:
          if(!validateAmount(monto, otherAmount)) {
            dispatch({type: 'SET_ERROR', error: 'Monto incorrecto'});
          } else if(!validateEmail(email)) {
            dispatch({type: 'SET_ERROR', error: 'Correo eléctronico inválido'});
          } else if(!validateFirstName(nombre)) {
            dispatch({type: 'SET_ERROR', error: 'Nombre incorrecto'});
          } else if(!validateLastName(apellido)) {
            dispatch({type: 'SET_ERROR', error: 'Apellido incorrecto'});
          } else if(!validateAreaCode(cod_area)) {
            dispatch({type: 'SET_ERROR', error: 'Código de área incorrecto'});
          } else if(!validatePhoneNumber(telefono)) {
            dispatch({type: 'SET_ERROR', error: 'Teléfono incorrecto'});
          } else {
            dispatch({type: 'SET_ERROR', error: null});
            return true;
          }
          break;
        case 2:
          if(!validateCreditCard(creditCardNumber)) {
            dispatch({type: 'SET_ERROR', error: 'Tarjeta inválida'});
          } else if(!validateCitizenId(dni)) {
            dispatch({type: 'SET_ERROR', error: 'DNI inválido'});
          } else {
            dispatch({type: 'SET_ERROR', error: null});
            return true;
          }
          break;
        default: {
          return false;
        }
      };
    };
    return false;
  }, [
    data,
    dispatch,
  ]);

  // const goNext = useCallback(async (evt: FormEvent<any>) => {
  //   evt.preventDefault();
  //   const isValid = validate(currentStep);
  //   if(isValid) {
  //     dispatch({ type: 'SUBMIT'});
  //     let submitted = false;
      
  //     switch(currentStep) { 
  //       case 1:
  //         submitted = true;
  //         break;
  //       case 2:
  //         const resStep2: IResponse = await submitData(data, refParam);
  //         if(resStep2) {
  //           submitted = resStep2.submitted;
  //         }
  //         break;
  //     }
  //     if(submitted) {
  //       dispatch({ type: 'SUBMITTED' });
  //       if(currentStep < steps.length) {
  //         history.push(`/registration/step/${currentStep + 1}`);
  //       } else {
  //         history.push(`/thank-you`);
  //       }
  //     } else {
  //       dispatch({ type: 'SET_ERROR', error: 'Algo salió mal.' });
  //     }
  //   }
  // }, [
  //   data,
  //   postId,
  //   currentStep,
  //   history,
  //   refParam,
  //   validate,
  //   dispatch,
  // ]);

  const goNext = useCallback(async (evt: FormEvent<any>) => {
    evt.preventDefault();
    const isValid = validate(currentStep);
    if(isValid) {
      dispatch({ type: 'SUBMIT'});
      const {
        apellido,
        cod_area,
        creditCardNumber,
        dni,
        email,
        monto,
        nombre,
        otherAmount,
        telefono,
      } = data;
      let submitted = false;
      
      switch(currentStep) { 
        case 1:
          const resStep1: IResponse = await submitDataWithSteps(
            {
              apellido,
              email,
              monto: (monto === 'otherAmount') ? otherAmount : monto,
              nombre,
            },
            postId,
            refParam,
          );
          
          if(resStep1 && resStep1.post_id) {
            setPostId(resStep1.post_id);
            submitted = resStep1.submitted;
          }

          break;
        case 2:
          const resStep2: IResponse = await submitDataWithSteps(
            {
              apellido,
              cod_area,
              creditCardNumber,
              dni,
              email,
              monto,
              nombre,
              telefono,
            },
            postId,
            refParam
          );
          if(resStep2) {
            submitted = resStep2.submitted;
          }
          break;
      }
      if(submitted) {
        dispatch({ type: 'SUBMITTED' });
        if(currentStep < steps.length) {
          history.push(`/registration/step/${currentStep + 1}`);
        } else {
          history.push(`/thank-you`);
        }
      } else {
        dispatch({ type: 'SET_ERROR', error: 'Algo salió mal.' });
      }
    }
  }, [
    data,
    postId,
    currentStep,
    history,
    refParam,
    validate,
    dispatch,
  ]);

  const goBack = useCallback((evt: FormEvent<any>) => {
    evt.preventDefault();
    history.push(`/registration/step/${currentStep - 1}`);
  }, [
    currentStep,
    history,
  ]);

  useEffect(() => {
    setCurrentStep(Number(stepId));
  }, [
    stepId,
  ]);

  return useMemo(() => (
    <Provider value={{
      data,
      error,
      currentStep,
      submitted,
      submitting,
      steps,
      goBack,
      goNext,
      onChange,
      dispatch,
      validate,
    }}>
      { children }
    </Provider>
  ), [
    data,
    error,
    currentStep,
    submitted,
    submitting,
    children,
    goBack,
    goNext,
    onChange,
    dispatch,
    validate,
  ]);
};


const WrappedProvider = withRouter(ContextProvider);

export {
  WrappedProvider as RegistrationProvider,
  Consumer as RegistrationConsumer,
  Context as RegistrationContext,
}
