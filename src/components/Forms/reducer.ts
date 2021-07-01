import { FormState, SharedActions, GenericReducerFn, IData, } from 'greenpeace';

export type ContextStateType = FormState;

export type ContextActionType = 
| { type: 'UPDATE_USER_DATA', payload: { [x: string]: string | number }}
| { type: 'UPDATE_PAYMENT_DATA', payload: any}
| { type: 'SET_ERROR', error: string | null }
| SharedActions;

export const initialState: ContextStateType = {
  // data: {
  //   cod_area: '',
  //   dni: '',
  //   creditCardNumber: '',
  //   campania: '',
  //   email: '',
  //   nombre: '',
  //   apellido: '',
  //   otherAmount: '',
  //   telefono: '',
  //   monto: '',
  // } as IUserData,
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
  data: {
    user: {
      cod_area: '011',
      dni: '102930192',
      email: 'doe.deer@email.com',
      nombre: 'Doe',
      apellido: 'Deer',
      telefono: '44440000',
    },
    donation: {
      amount: 0,
      monto: '',
      creditCardNumber: '1111222233334444',
      otherAmount: '100',
    },
  },
  // data: {
  //   user: {
  //     cod_area: '',
  //     dni: '',
  //     email: '',
  //     nombre: '',
  //     apellido: '',
  //     telefono: '',
  //   },
  //   donation: {
  //     amount: 0,
  //     monto: '',
  //     creditCardNumber: '',
  //     otherAmount: '',
  //   },
  // },
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
            ...state.data?.user,
            ...action.payload,
          }
        } as IData,
      }
    case 'UPDATE_PAYMENT_DATA':
      return {
        ...state,
        // data: {
          // ...state.data,
          // donation: {
          //   ...(action.payload['monto']) && {
          //     otherAmount: '',
          //   },
          //   ...(action.payload['monto'] && action.payload['otherAmount']) && {
          //     otherAmount: action.payload['otherAmount'],
          //   },
          // },
        // }
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