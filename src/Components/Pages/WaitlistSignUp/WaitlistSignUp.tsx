import { Button } from '../../Global/Button';
import { useState, ChangeEvent, useCallback, FormEvent, SyntheticEvent } from 'react';
import styled from 'styled-components';

import './WaitlistSignUp.scss';
import rocketTicket from '../../../Assets/images/rocketTicket.svg';
import { LayoutWithHeader } from '../../';
import { Input } from '../..';

export const WaitlistSignUp = () => {
  const [surname, setSurname] = useState<string>('');
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
      <div className="WaitlistSignUp">
        <div className="WaitlistSignUp__content">
          <p className="WaitlistSignUp__title">Join the waitlist</p>
          <p className="WaitlistSignUp__subtitle">
            We're currently in closed beta as we onboard partners and add more features. Sign up for the waitlist.
          </p>
          <Form onSubmit={handleFormSubmit}>

            <Input
              name="surname"
              type="text"
              value={surname}
              onChange={(e : ChangeEvent<HTMLInputElement>) => setSurname(e.target.value)}
              placeholder="Name Surname"
              margin="0 0 1.875rem 0"
              required={true}
            />

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

            <Button className="WaitlistSignUp__button" type="submit">
              Sign up for the waitlist
            </Button>
          </Form>
          <img className="WaitlistSignUp__img" src={rocketTicket} alt="rocketTicket" />
{/* 
          <p className="WaitlistSignUp__teaser">
            New to Potato? Potato is a crypto influencer marketplace to help
            people discover x100 opportunities on time
          </p>

          <Button className="WaitlistSignUp__button">Sign up</Button> */}
        </div>
      </div>
    </LayoutWithHeader>
  );
};

const Form = styled.form`
  width: 100%;
  max-width: 24rem;
  padding: 0 2rem;
`;
