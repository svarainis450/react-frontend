import { useState, ChangeEvent } from 'react';

import { API_USER_REGISTER_WAITLIST } from 'src/Common/services/waitlistSignUp';
import { Button } from '../../Global/Button';
import { LayoutWithHeader } from '../../';
import { Input } from '../..';

import rocketTicket from '../../../Assets/images/rocketTicket.svg';
import './WaitlistSignUp.scss';

export const WaitlistSignUp = () => {
  const [surname, setSurname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [success, setSucces] = useState<string>('');
  const [registerInProgress, setRegisterInProgress] = useState<boolean>(false);

  const handleFormSubmit = () => {
    setSucces('');
    setRegisterInProgress(true);

    API_USER_REGISTER_WAITLIST(surname, email)
      .then(() => {
        setRegisterInProgress(false)
        setSucces('Thanks for signing up for the Waitlist!')
      })
      .catch((err) => {
        setRegisterInProgress(false);

        err
          ? setError(err.data.message)
          : setError(
              `We're experiencing some internal problems. Try in few minutes`
            );
      });
  }

  const handleSurnameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSurname(e.target.value);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  return (
    <LayoutWithHeader>
      <div className="WaitlistSignUp">
        <div className="WaitlistSignUp__content">
          <p className="WaitlistSignUp__title">Join the waitlist</p>
          <p className="WaitlistSignUp__subtitle">
            We're currently in closed beta as we onboard partners and add more features. Sign up for the waitlist.
          </p>

          <Input
            name="surname"
            type="text"
            value={surname}
            onChange={handleSurnameChange}
            placeholder="Name Surname"
            margin="0 0 1.875rem 0"
            required={true}
            className="WaitlistSignUp__input"
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
            className="WaitlistSignUp__input"
          />

          {success && <div className="WaitlistSignUp__success">
            {success}
          </div> }

          <Button className="WaitlistSignUp__button" onClick={handleFormSubmit}>
            {registerInProgress
              ? "Signing up ..."
              : "Sign up for the waitlist"
            }
          </Button>

          <img className="WaitlistSignUp__img" src={rocketTicket} alt="rocketTicket" /> 
        </div>
      </div>
    </LayoutWithHeader>
  );
};