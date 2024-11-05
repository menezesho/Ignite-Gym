import axios, { AxiosInstance } from 'axios';
import { AppError } from '@utils/AppError';

type SignOut = () => void;

type ApiInstanceProps = AxiosInstance & {
  registerInterceptTokenManager: (signOut: SignOut) => () => void;
}

const api = axios.create({
  baseURL: 'http://192.168.15.101:3333',
}) as ApiInstanceProps;

api.registerInterceptTokenManager = signOut => {
  const interceptTokenManager = api.interceptors.response.use(response => response, requestError => {
    if (requestError?.response?.status === 401) {
      signOut();
    }

    if (requestError.response && requestError.response.data) {
      return Promise.reject(new AppError(requestError.response.data.message));
    } else {
      return Promise.reject(requestError);
    }
  });

  return () => {
    api.interceptors.response.eject(interceptTokenManager);
  }
}

export { api };