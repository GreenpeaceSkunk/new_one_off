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
    campania: '',
    email: '',
    nombre: '',
    apellido: '',
    otherAmount: '',
    telefono: '',
    monto: '',
  } as IUserData,
  // data: {
  //   cod_area: '011',
  //   dni: '10029128',
  //   creditCardNumber: '1111000011110000',
  //   campania: '',
  //   email: 'doe.deer@email.com',
  //   nombre: 'Doe',
  //   apellido: 'Deer',
  //   otherAmount: '',
  //   telefono: '20000000',
  //   monto: '',
  // } as IUserData,
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