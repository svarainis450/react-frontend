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
import { PaymentCardInfo } from '../../types';
import { images } from '../../utils/images';

import { Button } from '../Global/Button';
import { Input } from '../Input';
import { Box } from '../wrappers/Box';
import { Flex } from '../wrappers/Flex';

interface Props {
  onSubmit: (data: PaymentCardInfo) => void;
}

export const PaymentCardForm: FC<Props> = memo(({ onSubmit }) => {
  const { user, setUser } = useContext(UserContext);
  const [paymentData, setPaymentData] = useState<Partial<PaymentCardInfo>>({
    name: user.paymentCard?.name,
    number: user.paymentCard?.number,
    cvv: user.paymentCard?.cvv,
    expDate: user.paymentCard?.expDate,
  });

  const handleInputChange = useCallback(
    (value: string, field: keyof PaymentCardInfo) => {
      setPaymentData((pd) => ({
        ...pd,
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
        paymentCard: paymentData,
      }));

      onSubmit(paymentData as PaymentCardInfo);
    },
    [paymentData, setUser, onSubmit]
  );

  return (
    <form onSubmit={handleSubmit}>
      <Input
        margin="0 0 1.25rem 0"
        type="number"
        name="number"
        placeholder="Card Number"
        required={true}
        value={paymentData.number || ''}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          handleInputChange(event.target.value, 'number')
        }
      />
      <FlexStyled margin="0 0 1.25rem 0">
        <Input
          margin="0 0.625rem 0 0"
          type="text"
          name="expDate"
          placeholder="Expiry  (MM/DD)"
          maxLength={5}
          minLength={5}
          required={true}
          value={paymentData.expDate || ''}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            handleInputChange(event.target.value, 'expDate')
          }
        />
        <Input
          margin="0 0 0 0.625rem"
          type="number"
          name="cvv"
          placeholder="CVV (123)"
          min={100}
          max={999}
          required={true}
          value={paymentData.cvv || ''}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            handleInputChange(event.target.value, 'cvv')
          }
        />
      </FlexStyled>
      <Input
        margin="0 0 1.875rem 0"
        type="text"
        name="name"
        placeholder="Name on card"
        required={true}
        value={paymentData.name || ''}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          handleInputChange(event.target.value, 'name')
        }
      />
      <PaymentBlock src={images.paymentBlock} alt="Payment Block" />
      <Small margin="0 0 1rem 0">
        By signing up you agree with our Terms of Service, Privacy Policy, and
        our default Notification Settings.
      </Small>
      <Button type="submit">Subscribe & Checkout</Button>
    </form>
  );
});

// @TODO: move to Typography component
const Small = styled(Box).attrs({ as: 'p' })`
  font-size: 0.75rem;
  line-height: 1.375rem;
  text-align: center;
`;

const PaymentBlock = styled.img`
  display: block;
  margin: 0 auto 1.25rem auto;
  max-width: 20rem;
  width: 100%;
`;

const FlexStyled = styled(Flex)`
  & > div {
    flex: 1;
  }
`;
