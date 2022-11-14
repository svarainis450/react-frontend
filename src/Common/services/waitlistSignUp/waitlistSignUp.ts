
import { axiosInstance as instance, ENUM_API } from "../../axios";

export const API_USER_REGISTER_WAITLIST = (surname: string, email: string) => {
  const postBody = {
    name: surname,
    email: email,
  };

  return new Promise((resolve, reject) => {
    instance
      .post(ENUM_API.WAITLIST_SIGN, postBody)
      .then((res: any) => resolve(res))
      .catch((err) => reject(err.response));
  });
};