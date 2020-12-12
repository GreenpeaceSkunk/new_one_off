import { IUserData } from 'greenpeace';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from 'react';
import { ContextActionType, initialState, reducer } from './reducer';
// import { get } from './service';

interface IContext {
  data: IUserData | null; 
  dispatch: (action: ContextActionType) => void;
  validate: () => void;
}
interface IProps {
  children: React.ReactNode | HTMLAllCollection;
}

const Context = createContext({} as IContext);
Context.displayName = 'QuizContext';
const { Provider, Consumer } = Context;

const ContextProvider: React.FunctionComponent<IProps> = ({children}) => {
  const [{ data, errorTxt }, dispatch] = useReducer(reducer, initialState);

  const validate = useCallback((): boolean => {
    console.log('validate', data);
    if(!data) {
      // dispatch({type: 'SET_ERROR', error: 'Invalid License Status'}); 
    // } else if(!data.paymentSchedule) {
    //   dispatch({type: 'SET_ERROR', error: 'Invalid Payment Schedule'});
    // } else if(!data.dayOfMonthFillingDue || (data.dayOfMonthFillingDue <= 0 || data.dayOfMonthFillingDue >= 31)) {
    //   dispatch({type: 'SET_ERROR', error: 'Invalid Day of Month Filling Due'});
    // } else if(!data.bussinessTaxId) {
    //   dispatch({type: 'SET_ERROR', error: 'Invalid Bussiness Tax ID'});
    // } else if(!data.bussinessName) {
    //   dispatch({type: 'SET_ERROR', error: 'Invalid Bussiness Name'});
    // } else if(!data.nexusEstablished || !moment(data.nexusEstablished).isValid()) {
    //   dispatch({type: 'SET_ERROR', error: 'Invalid Nexus Established Date'});
    } else {
      // dispatch({type: 'SET_ERROR', error: null});
      return true;
    }
    return false;
  }, [
    data,
    errorTxt,
    dispatch,
  ]);

  return useMemo(() => (
    <Provider value={{
      data,
      dispatch,
      validate,
    }}>
      { children }
    </Provider>
  ), [
    data,
    errorTxt,
    dispatch,
    validate,
  ]);
};

export {
  ContextProvider as RegistrationProvider,
  Consumer as RegistrationConsumer,
  Context as RegistrationContext,
}
