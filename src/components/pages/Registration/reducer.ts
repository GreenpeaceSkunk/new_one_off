import {SharedState, SharedActions, GenericReducerFn, IUserData} from 'greenpeace';

export type ContextStateType = { 
  data: IUserData | null;
  errorTxt?: string | null,
} & SharedState;

export type ContextActionType = 
| { type: 'UPDATE_USER_DATA', payload: { [x: string]: string | number }}
| { type: 'SET_ERROR', payload: string }
| SharedActions;

export const initialState: ContextStateType = {
  data: null,
  fetching: false,
  fetched: false,
  updating: false,
  updated: false,
  error: null,
  errorTxt: null,
}

export const reducer: GenericReducerFn<ContextStateType, ContextActionType> = (state: ContextStateType, action: ContextActionType) => {
  switch (action.type) {
    case 'UPDATE_USER_DATA': {
      return {
        ...state,
        data: {
          ...state.data,
          ...action.payload,
        } as IUserData,
      }
    };
    case 'SET_ERROR': {
      return {
        ...state,
        errorTxt: action.payload,
      }
    };
    default: {
      throw new Error('Context Error');
    }
  }
}