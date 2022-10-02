import {
  createContext,
  useState,
  FC,
  useMemo,
  Dispatch,
  SetStateAction,
  ReactNode,
  useEffect,
} from 'react';
import { User } from '../types';

const DEFAULT_USER: User = {
  name: '',
  email: '',
  password: '',
  paymentCard: {},
  /** @TODO: persist this random number */
  orderId: Math.floor(Math.random() * (999999 - 100000)) + 100000,
  selectedPlan: undefined,
};

export const UserContext = createContext<{
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
}>({
  user: DEFAULT_USER,
  setUser: () => {},
});

export const UserContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User>(
    JSON.parse(String(localStorage.getItem('potatoe')))?.user || DEFAULT_USER
  );

  const value = useMemo(() => ({ user, setUser }), [user]);

  useEffect(() => {
    localStorage.setItem('potatoe', JSON.stringify(value));
  }, [value]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
