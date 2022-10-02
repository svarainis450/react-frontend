import { useState, ChangeEvent, useContext } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';

import { Button } from 'src/Components/Global/Button';
import rocketTicket from 'src/Assets/images/rocketTicket.svg';
import { LayoutWithHeader } from 'src/Components/';
import { Input } from 'src/Components';

import { API_USER_LOGIN } from 'src/Common/services/login';
import { UserInfoContext } from 'src/state/UserInfoContextProvider';

import './Login.scss';
import { LinkList } from 'src/types';
import { useAppDispatch } from 'src/state/reduxstate/store';
import { setUserData } from 'src/state/reduxstate/user/slice';
import { UserDataType } from 'src/state/reduxstate/user/types';

export const Login = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState<string>('');
  const [pass, setPass] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loginInProgress, setLoginInProgress] = useState<boolean>(false);

  const { setUserInfo } = useContext(UserInfoContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    setError('');
    setLoginInProgress(true);

    API_USER_LOGIN(email, pass)
      .then((response: any) => {
        setUserInfo(response.data);
        dispatch(setUserData(response.data as UserDataType));
      })
      .then(() => {
        setLoginInProgress(false);
        return navigate(LinkList.TRENDS);
      })
      .catch((err) => {
        setLoginInProgress(false);
        err
          ? setError(err.data.error.message)
          : setError(
              `We're experiencing some internal problems. Try in few minutes`
            );
      });
  };

  const handlePassChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPass(e.target.value);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  return (
    <LayoutWithHeader>
      <div className="Login">
        <div className="Login__content">
          <p className="Login__title">Welcome back to Potato</p>

          <Input
            name="email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Email"
            className="Login__input"
          />

          <Input
            name="password"
            type="password"
            value={pass}
            onChange={handlePassChange}
            placeholder="Password"
            error={error}
            className="Login__input"
          />

          <Button
            textWeight="heavy"
            className="Login__button"
            type="submit"
            onClick={handleLogin}
          >
            {loginInProgress ? 'Logging in ...' : 'Log in'}
          </Button>

          <img className="Login__img" src={rocketTicket} alt="rocketTicket" />

          <p className="Login__teaser">
            New to Potato?
            <Link to={LinkList.Checkout}>&nbsp; Sign Up here.</Link>
          </p>
        </div>
      </div>
    </LayoutWithHeader>
  );
};

const Form = styled.form`
  width: 100%;
  max-width: 24rem;
  padding: 0 4%;
`;
