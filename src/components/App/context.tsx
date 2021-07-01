import React, { createContext, useEffect, useMemo, useState, useReducer } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import useQuery from "../../hooks/useQuery";
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '../../theme/globalStyle';
import Theme from '../../theme/Theme';
import ErrorBoundary from '../ErrorBoundary';
import { CampaignType, CouponType, ICampaign } from "greenpeace";
import { data } from '../../data/campaigns.json';
import { reducer, initialState } from './reducer';
import { isCampaign, isCouponType } from "../../utils/utils";


interface IContext {
  refParam: string;
  queryParams: URLSearchParams;
  campaign: ICampaign | null;
  couponType: CouponType;
}

interface IProps {
  children: React.ReactNode | HTMLAllCollection;
}

const Context = createContext({} as IContext);
Context.displayName = 'AppContext';
const { Provider, Consumer } = Context;

const ContextProvider: React.FunctionComponent<IProps & RouteComponentProps> = ({ children }) => {
  const [{ campaign, couponType }, dispatch ] = useReducer(reducer, initialState);
  const [ refParam, setRefParam ] = useState<string>(`${process.env.REACT_APP_DEFAULT_REF_PARAM}`);
  const queryParams = useQuery();
  
  useEffect(() => {
    if(queryParams) {
      if(queryParams.get('ref')) {
        setRefParam(queryParams.get('ref') || `${process.env.REACT_APP_DEFAULT_REF_PARAM}`);
      }

      dispatch({
        type: 'SET_COUPON_TYPE',
        payload: isCouponType(queryParams.get('type'), [
          'oneoff',
          'regular',
        ] as const) ? queryParams.get('type') as CouponType : 'regular',
      });
      
      dispatch({
        type: 'SET_CAMPAIGN_DATA',
        payload: isCampaign(queryParams.get('campaign'), [
          'default',
          'bosques',
          'clima-y-energia',
          'contaminacion',
          'oceanos',
          'delta-del-parana',
          'landing-sustentabilidad'
        ] as const) ? data[queryParams.get('campaign') as CampaignType] : data['default'],
      });
    }
  }, []);

  return useMemo(() => (
    <Provider value={{
      refParam,
      queryParams,
      campaign,
      couponType,
    }}>
      <ThemeProvider theme={Theme}>
        <GlobalStyle />
        <ErrorBoundary>
          { children }
        </ErrorBoundary>
      </ThemeProvider>
    </Provider>
  ), [
    refParam,
    queryParams,
    campaign,
    couponType,
    children,
  ]);
};


const WrappedProvider = withRouter(ContextProvider);

export {
  WrappedProvider as AppProvider,
  Consumer as AppConsumer,
  Context as AppContext,
}
