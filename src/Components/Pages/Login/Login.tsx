import { useState, ChangeEvent, useCallback, FormEvent, useContext, SyntheticEvent } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { Button } from 'src/Components/Global/Button';
import rocketTicket from 'src/Assets/images/rocketTicket.svg';
import { LayoutWithHeader } from 'src/Components/';
import { Input } from 'src/Components';

import { API_USER_LOGIN } from 'src/Common/services/login'
import { UserInfoContext } from 'src/state/UserInfoContextProvider'

import './Login.scss';
import { LinkList } from 'src/types';

export const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [pass, setPass] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loginInProgress, setLoginInProgress] = useState<boolean>(false);

  const { userInfo, setUserInfo, isLoggedIn } = useContext(UserInfoContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    setError("");
    setLoginInProgress(true);

    API_USER_LOGIN(email, pass)
      .then((response: any) => {
        console.log('Login response', response)
        setUserInfo(response.data);
      })
      .then(() => {
        setLoginInProgress(false);
        return navigate(LinkList.DASHBOARD);
      })
      .catch((err) => {
        setLoginInProgress(false);
        err
          ? setError(err.data.message)
          : setError(
              `We're experiencing some internal problems. Try in few minutes`
            );
      });
  }

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
            margin="0 0 1.875rem 0"
            // error={error}
          />

          <Input
            name="password"
            type="password"
            value={pass}
            onChange={handlePassChange}
            placeholder="Password"
            margin="0 0 1.875rem 0"
            error={error}
          />

          <Button className="Login__button" type="submit" onClick={handleLogin}>
            {loginInProgress ? "Logging in ..." : "Log in"}
          </Button>

          <img className="Login__img" src={rocketTicket} alt="rocketTicket" />

          <p className="Login__teaser">
            New to Potato? Potato is a crypto influencer marketplace to help
            people discover x100 opportunities on time
          </p>

          <Button className="Login__button" onClick={() => navigate(LinkList.Register)}>Sign up</Button>
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
