import React, { createContext, FormEvent, useCallback, useEffect, useMemo, useReducer, useState, MouseEvent, ChangeEvent, useContext } from 'react';
import { IData } from 'greenpeace';
import { useParams, withRouter, RouteComponentProps, useHistory } from 'react-router';
import { ContextActionType, initialState, reducer } from './reducer';
import { submitDataWithSteps, IResponse } from './service';
import {
  validateAmount,
  validateCreditCard,
  validateEmail,
  validateFirstName,
  validateLastName,
  validateCitizenId,
  validateAreaCode,
  validatePhoneNumber,
  parseAmount,
} from './utils';
import { AppContext } from '../App/context';
import { synchroInit, trackEvent as trackDataCrushEvent } from '../../utils/dataCrush';

type OnChangeEvent = MouseEvent<HTMLButtonElement> | ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>;

interface IContext {
  data: IData;
  error: string | null;
  currentStep: number;
  submitting?: boolean;
  submitted?: boolean;
  steps: string[];
  defaultAmounts: string[];
  goBack: (evt: FormEvent<any>) => void;
  goNext: (evt: FormEvent<any>) => void;
  onChange: (evt: OnChangeEvent) => void;
  dispatch: (action: ContextActionType) => void;
  validate: (stepId: number) => boolean;
}

interface IProps {
  children: React.ReactNode | HTMLAllCollection;
}

const steps:string[] = ['Datos personales', 'Tu donación'];
const defaultAmounts = ['699', '799', '1999', '2999'];

const Context = createContext({} as IContext);
Context.displayName = 'RegistrationContext';
const { Provider, Consumer } = Context;

const ContextProvider: React.FunctionComponent<IProps & RouteComponentProps> = ({ children }) => {
  const history = useHistory();
  const [{ data, error, submitted, submitting }, dispatch] = useReducer(reducer, initialState);
  const { stepId } = useParams<{ stepId: string }>();
  const [ currentStep, setCurrentStep ] = useState<number>(1);
  const [ postId, setPostId ] = useState<number>(0);
  const { refParam, queryParams } = useContext(AppContext);

  const onChange = useCallback((evt: OnChangeEvent) => {
    evt.preventDefault();

    const fieldName = evt.currentTarget.name;
    if(fieldName === 'otherAmount' || fieldName === 'monto' || fieldName === 'amount' || fieldName === 'creditCardNumber') {
      dispatch({
        type: 'UPDATE_PAYMENT_DATA',
        payload: { [evt.currentTarget.name]: evt.currentTarget.value }
      });
    } else {
      dispatch({
        type: 'UPDATE_USER_DATA',
        payload: { [evt.currentTarget.name]: evt.currentTarget.value }
      });
    }

  }, [
    dispatch,
  ]);

  const validate = useCallback((stepId: number): boolean => {
    const {
      user: {
        email,
        nombre,
        apellido,
        cod_area,
        telefono,
        dni,
      },
      donation: {
        monto,
        otherAmount,
        creditCardNumber,
      }
    } = data;
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

  const goNext = useCallback(async (evt: FormEvent<any>) => {
    evt.preventDefault();
    const isValid = validate(currentStep);
    if(isValid) {
      
      dispatch({ type: 'SUBMIT'});
      const {
        user: {
          apellido,
          cod_area,
          dni,
          email,
          nombre,
          telefono,
        },
        donation: {
          creditCardNumber,
          monto,
          otherAmount,
        },
      } = data;
      const newAmount = parseAmount(monto, otherAmount);
      let submitted = false;
      
      switch(currentStep) {
        case 1:
          const resStep1: IResponse = await submitDataWithSteps(
            {
              user: {
                apellido,
                cod_area,
                dni,
                email,
                nombre,
                telefono,
              },
              donation: {
                monto: newAmount,
              }
            },
            postId,
            refParam,
          );
          
          if(resStep1 && resStep1.post_id) {
            setPostId(resStep1.post_id);
            submitted = resStep1.submitted;
            synchroInit({
              email,
              first_name: nombre,
              last_name: apellido,
              dni,
              area_code: cod_area,
              telefono,
            }, `${process.env.REACT_APP_DATA_CRUSH_EVENT_SK_DONACION_PASO_1}`);
          }
          break;
        case 2:
          const resStep2: IResponse = await submitDataWithSteps(
            {
              user: {
                apellido,
                cod_area,
                dni,
                email,
                nombre,
                telefono,
              },
              donation: {
                creditCardNumber,
                monto: newAmount,
              } 
            },
            postId,
            refParam
          );
          if(resStep2) {
            synchroInit({
              email,
              first_name: nombre,
              last_name: apellido,
              dni,
              area_code: cod_area,
              telefono,
              sk_oneoff_monto: newAmount,
              sk_pre_socio: '0',
            }, `${process.env.REACT_APP_DATA_CRUSH_EVENT_SK_DONACION_PASO_2}`);
            submitted = resStep2.submitted;
          }
          break;
      }
      if(submitted) {
        dispatch({ type: 'SUBMITTED' });
        if(currentStep < steps.length) {
          history.push({
            pathname: `/registration/step/${currentStep + 1}`,
            search: queryParams.toString(),
          });
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
    queryParams,
    validate,
    dispatch,
  ]);

  const goBack = useCallback((evt: FormEvent<any>) => {
    evt.preventDefault();
    history.push({
      pathname: `/registration/step/${currentStep - 1}`,
      search: queryParams.toString(),
    });
  }, [
    queryParams,
    currentStep,
    history,
  ]);

  useEffect(() => {
    setCurrentStep(parseInt(stepId));
  }, [
    stepId,
  ]);

  useEffect(() => {
    const amountParam = queryParams.get('default');
    const isCustom = (amountParam && !defaultAmounts.filter((amount: string) => amount === amountParam).length) ? true : false; 
    dispatch({
      type: 'UPDATE_PAYMENT_DATA',
      payload: { 
        monto: (isCustom) ? 'otherAmount' : `${amountParam || '699'}`,
      },
    });
  }, [
  ]);

  return useMemo(() => (
    <Provider value={{
      data,
      error,
      currentStep,
      submitted,
      submitting,
      steps,
      defaultAmounts,
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
