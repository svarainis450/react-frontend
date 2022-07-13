import {createContext, useState} from 'react';
import _ from 'lodash';
import {UserInfoContextProps} from "./types"

const DEFAULT_USER = {
  email: "",
  firstName: "",
  lastName: ""
};

export const UserInfoContext = createContext<any>({
  userInfo: {},
  getUserInfo: () => undefined,
});

export const UserInfoContextProvider = ({children} : UserInfoContextProps) => {
  const [userInfo, setUserInfo] = useState(DEFAULT_USER)

  const exportValue = {
    userInfo,
    setUserInfo
  }

  return <UserInfoContext.Provider value={exportValue}>
    {children}
  </UserInfoContext.Provider>;
};
