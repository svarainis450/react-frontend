import {
  ChangeEvent,
  FC,
  FormEvent,
  memo,
  useCallback,
  useContext,
  useState,
} from 'react';
import styled from 'styled-components';
import { UserContext } from '../../state/userContext';
import { UserBasicInfo } from '../../types';

import { Button } from '../Global/Button';
import { Input } from '../Input';
import { Box } from '../wrappers/Box';

interface Props {
  onSubmit: (data: UserBasicInfo) => void;
}

export const GeneralInformationForm: FC<Props> = memo(({ onSubmit }) => {
  const { user, setUser } = useContext(UserContext);
  const [formData, setFormData] = useState<UserBasicInfo>({
    name: user.name,
    email: user.email,
  });

  const handleInputChange = useCallback(
    (value: string, field: 'email' | 'name') => {
      setFormData((fd) => ({
        ...fd,
        [field]: value,
      }));
    },
    []
  );

  const handleSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault();
      setUser((prevUser) => ({
        ...prevUser,
        ...formData,
      }));

      onSubmit(formData);
    },
    [formData, setUser, onSubmit]
  );

  return (
    <form onSubmit={handleSubmit}>
      <Input
        margin="0 0 1.25rem 0"
        type="text"
        placeholder="Full name"
        required={true}
        value={formData.name}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          handleInputChange(event.target.value, 'name')
        }
      />
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
      <Small margin="0 0 1rem 0">
        We’ll use this email to notify you of billing and account changes
      </Small>
      <Button type="submit">Continue</Button>
    </form>
  );
});

// @TODO: move to Typography component
const Small = styled(Box).attrs({ as: 'p' })`
  font-size: 0.75rem;
  text-align: center;
`;
