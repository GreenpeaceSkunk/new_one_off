import {SharedState, SharedActions, GenericReducerFn, IUserData} from 'greenpeace';

export type ContextStateType = SharedState;

export type ContextActionType = 
| { type: 'UPDATE_USER_DATA', payload: { [x: string]: string | number }}
| { type: 'SET_ERROR', error: string | null }
| SharedActions;

export const initialState: ContextStateType = {
  // data: {
  //   areaCode: '',
  //   citizenId: '',
  //   creditCard: '',
  //   donationFor: '',
  //   email: '',
  //   firstName: '',
  //   lastName: '',
  //   otherAmount: '',
  //   phoneNumber: '',
  //   totalAmount: '399',
  // } as IUserData,

  /*
Importe= string
Monto= numero
email= string
nombre= string
apellido= string
donationFor= string
ref= string
telefono_numero= string
telefono_area= string
tarjeta_numero= numero
tarjeta_dni= string

  */
  data: {
    telefono_area: '',
    tarjeta_dni: '',
    tarjeta_numero: '',
    donationFor: '',
    email: '',
    nombre: '',
    apellido: '',
    otherAmount: '',
    phoneNumber: '',
    totalAmount: '399',
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
          ...(action.payload['totalAmount']) && {
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