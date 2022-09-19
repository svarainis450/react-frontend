import { axiosInstance as instance, ENUM_API } from '../../axios';
import Cookies from 'js-cookie';
import { store } from 'src/state/reduxstate/store';
import { setUserToken } from 'src/state/reduxstate/user/slice';

export const API_USER_LOGIN = (email: string, pass: string) => {
  const postBody = {
    email: email,
    password: pass,
  };

  return new Promise((resolve, reject) => {
    instance
      .post(ENUM_API.LOGIN, postBody)
      .then((res: any) => {
        Cookies.set('token', res.data.access_token ?? '');
        localStorage.setItem('token', JSON.stringify(res.data.access_token));
        store.dispatch(setUserToken(res.data.access_token));
        return res;
      })
      .then((res: any) => {
        store.dispatch(setUserToken(res.data.access_token));
        resolve(res);
      })
      .catch((err) => reject(err.response));
  });
};
