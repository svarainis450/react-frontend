import {createContext, useState} from 'react';
import _ from 'lodash';
import {UserInfoContextProps} from "./types"
import { API_USER_INFO } from 'src/Common/services/userInfo';

const DEFAULT_USER = {
  email: "",
  firstName: "",
  lastName: ""
};

export const UserInfoContext = createContext<any>({
  userInfo: {},
  setUserInfo: () => undefined,
  getUserInfo: () => undefined,
});

export const UserInfoContextProvider = ({children} : UserInfoContextProps) => {
  const [userInfo, setUserInfo] = useState(DEFAULT_USER)

  const getUserInfo = () => {
    API_USER_INFO()
      .then((res: any) => setUserInfo(res.data))
      .catch((err: any) => console.error(err))
  }

  const exportValue = {
    userInfo,
    setUserInfo,
    getUserInfo,
  }

  return <UserInfoContext.Provider value={exportValue}>
    {children}
  </UserInfoContext.Provider>;
};
