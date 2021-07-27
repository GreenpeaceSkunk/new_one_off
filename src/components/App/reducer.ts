import {AppState, SharedActions, GenericReducerFn, ICampaign, CouponType} from 'greenpeace';

export type ContextStateType = AppState;

export type ContextActionType = 
| { type: 'SET_CAMPAIGN_DATA', payload: ICampaign }
| { type: 'SET_COUPON_TYPE', payload: CouponType }
| { type: 'SET_ERROR', error: string | null }
| SharedActions;

export const initialState: ContextStateType = {
  error: null,
  campaign: null,
  couponType: 'regular',
}

export const reducer: GenericReducerFn<ContextStateType, ContextActionType> = (state: ContextStateType, action: ContextActionType) => {
  switch (action.type) {
    case 'SET_CAMPAIGN_DATA':
      return {
        ...state,
        campaign: {
          ...action.payload as ICampaign,
        },
      };
    case 'SET_COUPON_TYPE':
      return {
        ...state,
        couponType: action.payload as CouponType,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.error,
      };
    default: {
      throw new Error('Context Error');
    }
  }
}