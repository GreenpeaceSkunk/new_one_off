declare global {
  interface Window {
    dataLayer: [{
      event: EventType,
    }];
    
    dcS: {
      synchro: any;
    };

    dc: {
      track: {
        event: (portalId: string, eventId: string, userEmail: string) => void;
      }
    };
  }
}

export type CouponType = 'regular' | 'oneoff';
export type CampaignType = 'default' | 'bosques' | 'clima-y-energia' | 'contaminacion' | 'oceanos' | 'delta-del-parana' | 'landing-sustentabilidad';
export type EventType = 'pageview';
export type OnChangeEvent = MouseEvent<HTMLButtonElement> | ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLSelectElement>;
export type OnClickEvent = MouseEvent<HTMLButtonElement>;

export type FormFieldsType = {
  [Key in FormFields]: boolean;
}
export interface ICampaign {
  name: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
}

export interface GenericReducerFn<S, A> { 
  (state: S, action: A): S;
}

export type StylesType = {
  [el: string]: React.CSSProperties,
};

export type ServiceParams = {
  public_key?: string;
}

export type AxiosResquestError = {
  error: boolean,
  status: number,
  message: string,
};

export type SharedState = {
  submitting?: boolean,
  submitted?: boolean,
  error: string | null,
};

export type AppState = {
  couponType: CouponType;
  campaign: ICampaign | null; 
} & SharedState;

export type FormState = {
  data: IData;
} & SharedState;

export interface IUserData {
  cod_area?: string;
  dni?: string;
  // creditCardNumber?: string;
  // campania?: string;
  email?: string;
  nombre?: string;
  apellido?: string;
  // otherAmount?: string;
  telefono?: string;
  // monto?: string;
}

export interface IPayment {
  monto?: string;
  amount?: number;
  otherAmount?: string;
  creditCardNumber?: string;
}

export interface IData {
  user: IUserData;
  // feedback: IFeedbackData;
  donation: IPayment;
}

export type SharedActions = 
  | { type: 'SUBMIT' }
  | { type: 'SUBMITTED' }
  | { type: 'CANCEL' }
  | { type: 'FAILURE', error: any }
