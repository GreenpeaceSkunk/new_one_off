import {FormState, SharedActions, GenericReducerFn, IUserData, IData, IPayment} from 'greenpeace';

export type ContextStateType = FormState;

export type ContextActionType = 
| { type: 'UPDATE_USER_DATA', payload: { [x: string]: string | number }}
| { type: 'UPDATE_PAYMENT_DATA', payload: { [x: string]: string | number }}
| { type: 'SET_ERROR', error: string | null }
| SharedActions;

export const initialState: ContextStateType = {
  data: {
    user: {
      cod_area: '',
      dni: '',
      email: '',
      nombre: '',
      apellido: '',
      otherAmount: '',
      telefono: '',
      monto: '',
    } as IUserData,
    donation: {
      amount: 0,
      creditCardNumber: '',
      monto: '',
      otherAmount: '',
    } as IPayment,
  },
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
          user: {
            ...state.data.user,
            ...action.payload,
          },
        } as IData,
      }
    case 'UPDATE_PAYMENT_DATA':
      return {
        ...state,
        data: {
          ...state.data,
          donation: {
            ...state.data.donation,
            ...action.payload,
            ...(action.payload['monto']) && {
              otherAmount: '',
            },
            ...(action.payload['monto'] && action.payload['otherAmount']) && {
              otherAmount: action.payload['otherAmount'],
            },
          },
        } as IData,
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