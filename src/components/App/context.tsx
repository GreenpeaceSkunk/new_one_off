import React, { createContext, useEffect, useMemo, useState } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import useQuery from "../../hooks/useQuery";

interface IContext {
  refParam: string;
  queryParams: URLSearchParams;
}

interface IProps {
  children: React.ReactNode | HTMLAllCollection;
}

const Context = createContext({} as IContext);
Context.displayName = 'AppContext';
const { Provider, Consumer } = Context;

const ContextProvider: React.FunctionComponent<IProps & RouteComponentProps> = ({ children }) => {
  const [ refParam, setRefParam ] = useState<string>(`${process.env.REACT_APP_DEFAULT_REF_PARAM}`);
  const queryParams = useQuery();
  
  useEffect(() => {
    if(queryParams) {
      if(queryParams.get('ref')) {
        setRefParam(queryParams.get('ref') || `${process.env.REACT_APP_DEFAULT_REF_PARAM}`);
      }
    }
  }, [
    queryParams,
  ])

  return useMemo(() => (
    <Provider value={{
      refParam,
      queryParams,
    }}>
      { children }
    </Provider>
  ), [
    refParam,
    queryParams,
    children,
  ]);
};


const WrappedProvider = withRouter(ContextProvider);

export {
  WrappedProvider as AppProvider,
  Consumer as AppConsumer,
  Context as AppContext,
}
