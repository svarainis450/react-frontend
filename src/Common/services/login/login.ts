import { axiosInstance as instance, ENUM_API } from '../../axios';
import Cookies from 'js-cookie';

export const API_USER_LOGIN = (email: string, pass: string) => {
  const postBody = {
    username: email,
    password: pass,
  };

  return new Promise((resolve, reject) => {
    instance
      .post(ENUM_API.LOGIN, postBody)
      .then((res: any) => {
        Cookies.set('token', res.data['token'] ?? '');
        localStorage.setItem('token', JSON.stringify(res.data.token));
        return res;
      })
      .then((res: any) => resolve(res))
      .catch((err) => reject(err.response));
  });
};
