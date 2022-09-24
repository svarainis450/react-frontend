import { FC, memo, useContext } from 'react';
import styled from 'styled-components';
import { UserContext } from '../../state/userContext';

import { theme } from '../../theme';
import { Box } from '../wrappers/Box';
import { Flex } from '../wrappers/Flex';
import { useCookies } from 'react-cookie';

export const OrderSummary: FC = memo(() => {
  const { user } = useContext(UserContext);
  let totalPrice = Number(user.selectedPlan?.begin_price);
  const [getCookie, setCookie] = useCookies(['currency', 'currencySymbol']);

  return (
    <>
      <Subtitle margin="0 0 0.625rem 0">Order Summary</Subtitle>

      <Line margin="0 0 0.875rem 0" />

      <Background>
        <Row margin="0 0 1rem 0">
          <Regular>Subtotal</Regular>
          <Regular>
            {getCookie?.currencySymbol}
            {`${
              Number(user.selectedPlan?.begin_price) -
              Number(user.selectedPlan?.discount)
            }.00`}
          </Regular>
        </Row>
        {user.selectedPlan?.discount ? (
          <Row margin="0 0 1rem 0">
            <Regular>{user.selectedPlan?.billing_type} plan discount</Regular>
            <Regular>{user.selectedPlan?.discount}.00</Regular>
          </Row>
        ) : null}
        {user.selectedPlan?.priceAfterDownsell ? (
          <Row margin="0 0 1rem 0">
            <Regular color="#FA5000">Additional discount</Regular>
            <Regular color="#FA5000">
              -{getCookie?.currencySymbol}
              {parseFloat(
                String(Number(user.selectedPlan?.begin_price) * 0.15)
              ).toFixed(2)}
            </Regular>
          </Row>
        ) : null}

        <Row>
          <Regular>Billed now</Regular>
          <Regular>
            {getCookie?.currencySymbol}
            {user.selectedPlan?.priceAfterDownsell || `${totalPrice}`}.00
          </Regular>
        </Row>
      </Background>
    </>
  );
});

OrderSummary.displayName = 'OrderSummary';

const Background = styled.div`
  padding: 1.5rem 0;
  border-radius: 0.25rem;
`;

// @TODO: move to Typography component
const Subtitle = styled(Box).attrs({ as: 'p' })`
  font-size: 1.25rem;
  text-align: center;
  font-weight: 500;
`;

const Row = styled(Flex).attrs({
  alignItems: 'center',
  justifyContent: 'space-between',
})``;

const Regular = styled.p<{ color?: string }>`
  font-size: 1rem;
  color: ${({ color }) => color || 'inherit'};
`;

const Line = styled(Box)`
  padding: 0 1.75rem;
  display: block;
  border-top: 1px solid ${theme.colors.greyDark};
`;
