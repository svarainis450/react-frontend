import { useState, ChangeEvent, useCallback, FormEvent, useContext, SyntheticEvent } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { Button } from 'src/Components/Global/Button';
import rocketTicket from 'src/Assets/images/rocketTicket.svg';
import { LayoutWithHeader } from 'src/Components/';
import { Input } from 'src/Components';

import { API_USER_REGISTER } from 'src/Common/services/register'

import './Register.scss';
import { LinkList } from 'src/types';

export const Register = () => {
  const [email, setEmail] = useState<string>('');
  const [pass, setPass] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [RegisterInProgress, setRegisterInProgress] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleRegister = () => {
    setError("");
    setRegisterInProgress(true);

    API_USER_REGISTER(email, pass)
      .then(() => navigate(LinkList.Login))
      .catch((err) => {
        setRegisterInProgress(false);

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
      <div className="Register">
        <div className="Register__content">
          <p className="Register__title">Sign up to Potato</p>

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

          <Button className="Register__button" type="submit" onClick={handleRegister}>
            {RegisterInProgress ? "Signing up  ..." : "Sign up"}
          </Button>

          <img className="Register__img" src={rocketTicket} alt="rocketTicket" />

          <p className="Register__teaser">
            Already have account? 
          </p>

          <Button className="Register__button" onClick={() => navigate(LinkList.Login)}>Log in</Button>
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
