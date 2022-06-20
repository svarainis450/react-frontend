import {createContext, useState} from 'react';
import _ from 'lodash';
import {UserInfoContextProps} from "./types"

const DEFAULT_USER = {
  name: '',
  email: '',
  userId: '',
  img: '',
};

export const UserInfoContext = createContext<any>({
  userInfo: {},
  getUserInfo: () => undefined,
  isLoggedIn: false
});

export const UserInfoContextProvider = ({children} : UserInfoContextProps) => {
  const [userInfo, setUserInfo] = useState({
    name: 'test name',
    email: 'test@email.com',
    userId: 'test',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSVJBP55ozm4y789qQ-_BV6twDwG4E1e-qEw&usqp=CAU'
  } || DEFAULT_USER)

  const isLoggedIn = !_.isEmpty(userInfo);

  const exportValue = {
    userInfo,
    setUserInfo,
    isLoggedIn
  }

  return <UserInfoContext.Provider value={exportValue}>
    {children}
  </UserInfoContext.Provider>;
};
