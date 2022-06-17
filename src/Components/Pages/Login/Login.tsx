import { Button } from '../../Global/Button';
import { useState, ChangeEvent, useCallback, FormEvent } from 'react';
import styled from 'styled-components';

import './Login.scss';
import rocketTicket from '../../../Assets/images/rocketTicket.svg';
import { LayoutWithHeader } from '../../';
import { Input } from '../..';

export const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleFormSubmit = useCallback((event: FormEvent) => {
    event.preventDefault();

    setError('This Potato account does not exist.');
  }, []);

  const handleEmailChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setEmail(event.target.value);
    },
    []
  );

  return (
    <LayoutWithHeader>
      <div className="Login">
        <div className="Login__content">
          <p className="Login__title">Welcome back to Potato</p>
          <Form onSubmit={handleFormSubmit}>
            <Input
              name="email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Email"
              margin="0 0 1.875rem 0"
              required={true}
              error={error}
            />
            <Button className="Login__button" type="submit">
              Log in
            </Button>
          </Form>
          <img className="Login__img" src={rocketTicket} alt="rocketTicket" />

          <p className="Login__teaser">
            New to Potato? Potato is a crypto influencer marketplace to help
            people discover x100 opportunities on time
          </p>

          <Button className="Login__button">Sign up</Button>
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
