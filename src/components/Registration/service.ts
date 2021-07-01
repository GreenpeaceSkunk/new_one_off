import { AxiosResquestError, IData, IUserData } from 'greenpeace';
import {ApiCall} from '../../utils/apiCall';

export interface IResponse {
  submitted: boolean;
  post_id?: number;
}

export const submitData = async  (data?: IUserData, refParam = `${process.env.REACT_APP_DEFAULT_REF_PARAM}`): Promise<IResponse> => {

  let formData = new FormData();
  formData.append('form_id', `${process.env.REACT_APP_FORM_ID}`);
  formData.append('ref', `${refParam}`);

  if(data) {
    for(const field in Object.keys(data)) {
      if(field) {
        formData.append(Object.keys(data)[field], Object.values(data)[field]);
      }
    }
  }

  const response = await ApiCall<AxiosResquestError | any>({
    url: 'procesar_cupon.php',
    method: 'POST',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    params: {},
  });

  if(response.error) {
    return {
      submitted: false,
    }
  } else {
    return {
      submitted: true,
    };
  }
};

// export const submitDataWithSteps = async  (data?: IUserData, post_id?: number, refParam = `${process.env.REACT_APP_DEFAULT_REF_PARAM}`): Promise<IResponse> => {
export const submitDataWithSteps = async  (payload: IData, post_id?: number, refParam = `${process.env.REACT_APP_DEFAULT_REF_PARAM}`): Promise<IResponse> => {
  let formData = new FormData();
  formData.append('partial_post_id', `${post_id}`);
  formData.append('form_id', `${process.env.REACT_APP_FORM_ID}`);
  formData.append('ref', `${refParam}`);

  if(payload) {
    for(const field in Object.keys(payload.user)) {
      if(field) {
        formData.append(Object.keys(payload.user)[field], Object.values(payload.user)[field]);
      }
    }
    
    for(const field in Object.keys(payload.donation)) {
      if(field) {
        formData.append(Object.keys(payload.donation)[field], Object.values(payload.donation)[field]);
      }
    }
  }
  const response = await ApiCall<AxiosResquestError | any>({
    url: 'procesar_cupon_en_pasos_ajax.php',
    method: 'POST',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    params: {},
  });

  if(response.error) {
    return {
      submitted: false,
    }
  } else {
    return {
      submitted: true,
      post_id: response.post_id || post_id,
    };
  }
};
