import axios, { Canceler } from 'axios';
import { apiv1 } from 'src/state/reduxstate/types';
import {
  cleanUpSessionWhenUnauthorized,
  applyRequestSuffix,
  setAuthToken,
} from './helpers';

const API_URL =
  process.env.NODE_ENV === 'development'
    ? apiv1 //change to dev
    : apiv1;

export const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 20000,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  cleanUpSessionWhenUnauthorized
);

axiosInstance.interceptors.request.use(setAuthToken);

axiosInstance.interceptors.request.use(applyRequestSuffix);

export const CancelToken = axios.CancelToken;
const isCancel = axios.isCancel;

export { isCancel };
export type { Canceler };
