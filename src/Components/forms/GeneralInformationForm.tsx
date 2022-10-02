import {
  ChangeEvent,
  FC,
  FormEvent,
  memo,
  useCallback,
  useContext,
  useState,
} from 'react';
import { useSelector } from 'react-redux';
import { userDataSelector } from 'src/state/reduxstate/user/selectors';
import styled from 'styled-components';
import { UserContext } from '../../state/userContext';
import { LinkList, UserBasicInfo } from '../../types';

import { Button } from '../Global/Button';
import { Input } from '../Input';
import { Box } from '../wrappers/Box';
import { API_USER_REGISTER } from 'src/Common/services/register';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'src/state/reduxstate/store';
import { loginUser } from 'src/state/reduxstate/user/thunks';

interface Props {
  onSubmit: (data: UserBasicInfo) => void;
}

export const GeneralInformationForm: FC<Props> = memo(({ onSubmit }) => {
  const { user, setUser } = useContext(UserContext);
  const userData = useSelector(userDataSelector);
  const [formData, setFormData] = useState<UserBasicInfo>({
    email: '',
    password: '',
  });
  const [error, setError] = useState<string>('');
  const [RegisterInProgress, setRegisterInProgress] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleInputChange = useCallback(
    (value: string, field: 'email' | 'password') => {
      setFormData((fd) => ({
        ...fd,
        [field]: value,
      }));
    },
    []
  );

  console.log(formData);

  const handleRegister = (event: FormEvent) => {
    event.preventDefault();
    setError('');
    setRegisterInProgress(true);

    API_USER_REGISTER(formData.email, formData.password)
      .then(() => {
        dispatch(
          loginUser({ email: formData.email, password: formData.password })
        ).then(() => navigate(LinkList.AddToCard));
      })
      .catch((err) => {
        setRegisterInProgress(false);

        if (err?.data?.error?.faults[0].includes('Duplicate entry')) {
          setError(`${formData.email} user exists.`);
        } else if (err) {
          setError(err.data.error.message);
        } else {
          setError(
            `We're experiencing some internal problems. Try in few minutes`
          );
        }
      });
  };

  return (
    <form onSubmit={(event: FormEvent) => handleRegister(event)}>
      <Input
        margin="0 0 1rem 0"
        type="email"
        placeholder="Email"
        required={true}
        value={formData.email}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          handleInputChange(event.target.value, 'email')
        }
      />
      <Input
        margin="0 0 1.25rem 0"
        type="password"
        placeholder="Password"
        required={true}
        error={error}
        value={formData.password}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          handleInputChange(event.target.value, 'password')
        }
      />
      <Small margin="0 0 1rem 0">
        We’ll use this email to notify you of billing and account changes
      </Small>
      <Button type="submit">
        {RegisterInProgress ? 'Creting account...' : 'Continue'}
      </Button>
    </form>
  );
});

// @TODO: move to Typography component
const Small = styled(Box).attrs({ as: 'p' })`
  font-size: 0.75rem;
  text-align: center;
`;
