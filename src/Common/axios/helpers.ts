import { AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";
import { ResponseCode } from "./const";
import { sessionCleanUp } from "../utils/sessionCleanUp/sessionCleanUp";
import { redirectToLogin } from "../utils/redirectToLogin";
import { isLoggedIn } from "../utils/isLoggedIn";

export const cleanUpSessionWhenUnauthorized = (error: {
  response?: {
    status?: number;
  };
}) => {
  if (error?.response?.status === ResponseCode.UNAUTHORIZED && isLoggedIn()) {
    sessionCleanUp();
    redirectToLogin();
  }

  return Promise.reject(error);
};

export const applyRequestSuffix = (config: AxiosRequestConfig) => {
  const params = config?.params
    ? { ...config.params }
    : undefined;

  return {
    ...config,
    baseURL: config.baseURL,
    params,
  };
};

export const setAuthToken = (config: AxiosRequestConfig) => {
  return {
    ...config,
    headers: {
      ...config.headers,
      Authorization: Cookies.get("token"),
    },
  };
};
