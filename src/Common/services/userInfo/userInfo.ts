
import { axiosInstance as instance, ENUM_API } from "../../axios";

export const API_USER_INFO = () => {
  return new Promise((resolve, reject) => {
    instance
      .get(ENUM_API.ME)
      .then((res: any) => resolve(res))
      .catch((err) => reject(err.response));
  });
};