export type EventType =
  | 'pageview'

  export interface GenericReducerFn<S, A> { 
    (state: S, action: A): S;
  }
  
  export type AxiosResquestError = {
    error: boolean,
    status: number,
    message: string,
  };
  
  export type SharedState = {
    data?: any,
    fetching?: boolean,
    fetched?: boolean,
    updating?: boolean,
    updated?: boolean,
    edited?: boolean,
    error?: any,
  };
  
  export type SharedActions = 
    | { type: 'FETCH' }
    | { type: 'FETCHED', payload?: any }
    | { type: 'UPDATE' }
    | { type: 'UPDATED', payload?: any }
    | { type: 'CANCEL' }
    | { type: 'FAILURE', error: any }


interface IUserData {
  firstName: string;
  lastName: string;
  email: string;
  phoneAreaCode: number;
  phoneNumber: number;
  cardNumber: number;
  dni: number;
  amount: string; 
}

// export type DataLayerEvent = {
//   event: 'pageview',
// }

// declare global {
//   interface Window { dataLayer: any; }
// }

// window.dataLayer = window.dataLayer || {};