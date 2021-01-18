import {SharedState, SharedActions, GenericReducerFn, IUserData} from 'greenpeace';

export type ContextStateType = SharedState;

export type ContextActionType = 
| { type: 'UPDATE_USER_DATA', payload: { [x: string]: string | number }}
| { type: 'SET_ERROR', error: string | null }
| SharedActions;

export const initialState: ContextStateType = {
  data: {
    cod_area: '',
    dni: '',
    creditCardNumber: '',
    donationFor: '',
    email: '',
    nombre: '',
    apellido: '',
    otherAmount: '',
    telefono: '',
    monto: '399',
  } as IUserData,
  submitting: false,
  submitted: false,
  error: null,
}

export const reducer: GenericReducerFn<ContextStateType, ContextActionType> = (state: ContextStateType, action: ContextActionType) => {
  switch (action.type) {
    case 'UPDATE_USER_DATA': 
      return {
        ...state,
        data: {
          ...state.data,
          ...action.payload,
          ...(action.payload['monto']) && {
            otherAmount: '',
          },
        } as IUserData,
      }
    case 'SUBMIT':
      return {
        ...state,
        submitting: true,
        submitted: false,
      };
    case 'SUBMITTED':
      return {
        ...state,
        submitting: false,
        submitted: true,
      };
    case 'SET_ERROR':
      return {
        ...state,
        submitting: false,
        submitted: false,
        error: action.error,
      };
    default: {
      throw new Error('Context Error');
    }
  }
}