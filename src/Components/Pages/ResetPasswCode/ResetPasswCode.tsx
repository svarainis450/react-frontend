import { useState, ChangeEvent, useEffect, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from 'src/Components/Global/Button';
import rocketTicket from 'src/Assets/images/rocketTicket.svg';
import { LayoutWithHeader } from 'src/Components/';
import { Input } from 'src/Components';

import './ResetPasswCode.scss';
import { LinkList } from 'src/types';
import { useAppDispatch } from 'src/state/reduxstate/store';
import {
  generatePasswResetToken,
  redeemPasswResetToken,
} from 'src/state/reduxstate/user/thunks';
import { Statuses } from 'src/state/reduxstate/projects/types';
import { useSelector } from 'react-redux';
import {
  resetTokenSelector,
  userDataSelector,
} from 'src/state/reduxstate/user/selectors';
import { Loader } from 'src/Components/Global';

const INPUTS = [1, 2, 3, 4, 5, 6];

export const ResetPasswCode = () => {
  const dispatch = useAppDispatch();
  const userData = useSelector(userDataSelector);
  const resetToken = useSelector(resetTokenSelector);
  const [pass, setPass] = useState<string>('');
  const [repeatPass, setRepeatPass] = useState<string>('');

  const [codeState, setCodeState] = useState({
    0: '',
    1: '',
    2: '',
    3: '',
    4: '',
    5: '',
  });
  const [error, setError] = useState<string>('');
  const [redeemStatus, setRedeemStatus] = useState<Statuses>('idle');
  const [showPassword, setShowPassword] = useState(false);
  const [tokenValue, setTokenValue] = useState('');
  const navigate = useNavigate();
  const [generateStatus, setGenerateStatus] = useState<Statuses>('idle');

  useEffect(() => {
    setTokenValue(Object.values(codeState).join(''));

    String(tokenValue) === resetToken && setShowPassword(true);

    redeemStatus === 'error' && navigate(LinkList.ResetPassword);
    redeemStatus === 'success' && navigate(LinkList.Login);
  }, [codeState, tokenValue, redeemStatus]);

  const handleDigitChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const lastInput = INPUTS.length - 1;
    setError('');

    if (
      e.target.value.length > 0 &&
      e.target.value.length < 2 &&
      index <= lastInput
    ) {
      setCodeState({ ...codeState, [index]: e.target.value });
      document.getElementById(`digit-${index + 1}`)?.focus();
    } else if (
      index === lastInput &&
      e.target.value.length > 0 &&
      e.target.value.length < 2
    ) {
      setShowPassword(true);
    } else {
      setCodeState({ ...codeState, [index]: e.target.value });
    }
  };

  const handleBackSpaceKey = (index: number, e: KeyboardEvent) => {
    if (index > 0 && e.key === 'Backspace') {
      setCodeState({ ...codeState, [index]: '' });
      document.getElementById(`digit-${index - 1}`)?.focus();
    }
  };

  const submitPasswords = (e: FormEvent) => {
    e.preventDefault();
    if (pass.length < 8) {
      setError('Password must at least 8 characters');
    } else if (pass !== repeatPass) {
      setError("Paswords doesn't match");
    } else if (pass === repeatPass && userData.email) {
      dispatch(
        redeemPasswResetToken({
          email: userData.email,
          token: tokenValue,
          password: pass,
          redeemCalback: setRedeemStatus,
        })
      );
    }
  };

  const hanldeResendCode = () => {
    if (userData.email) {
      dispatch(
        generatePasswResetToken({
          email: userData.email,
          generatePasswStatus: setGenerateStatus,
          errorMsgCallBack: setError,
        })
      );
    } else {
      navigate(LinkList.ResetPassword);
    }
  };

  return (
    <LayoutWithHeader>
      <div className="Reset-password-code">
        {generateStatus === 'pending' ? (
          <div className="reset-loader">
            <Loader width={50} height={50} />
          </div>
        ) : (
          <div className="Reset-password-code__content">
            <p className="Reset-password-code__title">
              {showPassword ? 'Enter new password' : 'We emailed you a code'}
            </p>
            {!showPassword && (
              <>
                <p className="Reset-password-code__subtitle">
                  Enter in the verification code sent to:
                </p>
                <p>
                  <strong>{userData.email}</strong>
                </p>
              </>
            )}
            {!showPassword && (
              <form className="digits-form">
                {error.length > 0 && <p>{error}</p>}
                <div className="digits-wrapper">
                  {INPUTS.map((_, index) => (
                    <Input
                      key={index}
                      type="text"
                      id={`digit-${index}`}
                      // @ts-ignore
                      value={codeState[index]}
                      min={0}
                      max={9}
                      maxLength={1}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        handleDigitChange(e, index)
                      }
                      className="digit-input"
                      // @ts-ignore
                      onKeyDown={(e: KeyboardEvent) =>
                        handleBackSpaceKey(index, e)
                      }
                    />
                  ))}
                </div>
              </form>
            )}
            {showPassword && (
              <form onSubmit={submitPasswords} className="passwords-wrapper">
                <Input
                  placeholder="New password"
                  value={pass}
                  type="password"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setPass(e.target.value)
                  }
                />
                <Input
                  placeholder="Repeat new password"
                  value={repeatPass}
                  type="password"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setRepeatPass(e.target.value)
                  }
                  error={error}
                />
                <Button>Go to login</Button>
              </form>
            )}
            {!showPassword && (
              <div>
                <p className="resend-code">
                  Didn’t get your code?{' '}
                  <span onClick={hanldeResendCode}>Send a new code</span>
                </p>
              </div>
            )}
            <img
              className="Reset-password-code__img"
              src={rocketTicket}
              alt="rocketTicket"
            />
          </div>
        )}
      </div>
    </LayoutWithHeader>
  );
};
