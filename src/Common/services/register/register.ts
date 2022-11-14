import { axiosInstance as instance, ENUM_API } from '../../axios';

export const API_USER_REGISTER = (email: string, pass: string) => {
  const postBody = {
    email: email,
    password: pass,
  };

  return new Promise((resolve, reject) => {
    instance
      .post(ENUM_API.REGISTER, postBody)
      .then((res: any) => resolve(res))
      .catch((err) => reject(err.response));
  });
};
