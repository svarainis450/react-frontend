import { useState, ChangeEvent, useEffect, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from 'src/Components/Global/Button';
import rocketTicket from 'src/Assets/images/rocketTicket.svg';
import { LayoutWithHeader } from 'src/Components/';
import { Input } from 'src/Components';

import './ResetPassword.scss';
import { LinkList } from 'src/types';
import { useAppDispatch } from 'src/state/reduxstate/store';
import { generatePasswResetToken } from 'src/state/reduxstate/user/thunks';
import { Statuses } from 'src/state/reduxstate/projects/types';
import { setUserData } from 'src/state/reduxstate/user/slice';
import { useSelector } from 'react-redux';
import { userDataSelector } from 'src/state/reduxstate/user/selectors';

export const ResetPassword = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string>('');
  const userData = useSelector(userDataSelector);
  const [generateStatus, setGenerateStatus] = useState<Statuses>('idle');

  const navigate = useNavigate();

  useEffect(() => {
    generateStatus === 'success' && navigate(LinkList.ResetPasswordCode);
  }, [generateStatus]);

  const handleSubmitEmail = (e: FormEvent) => {
    e.preventDefault();
    dispatch(setUserData({ ...userData, email }));
    dispatch(
      generatePasswResetToken({
        email,
        generatePasswStatus: setGenerateStatus,
        errorMsgCallBack: setError,
      })
    );
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setError('');
  };

  return (
    <LayoutWithHeader>
      <div className="Reset-password ">
        <div className="Reset-password__content">
          <p className="Reset-password__title">Enter email</p>

          <form onSubmit={handleSubmitEmail}>
            <Input
              name="email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Email"
              className="Reset-password__input"
              error={error}
            />
            <Button
              textWeight="heavy"
              className="Reset-password__button"
              type="submit"
            >
              {generateStatus === 'pending' ? 'Loading ...' : 'Send code'}
            </Button>
          </form>

          <img
            className="Reset-password__img"
            src={rocketTicket}
            alt="rocketTicket"
          />
        </div>
      </div>
    </LayoutWithHeader>
  );
};
