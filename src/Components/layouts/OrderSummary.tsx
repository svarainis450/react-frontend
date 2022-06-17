import { FC, memo, useContext } from 'react';
import styled from 'styled-components';
import { UserContext } from '../../state/userContext';

import { theme } from '../../theme';
import { Box } from '../wrappers/Box';
import { Flex } from '../wrappers/Flex';
import { useCookies } from 'react-cookie'

export const OrderSummary: FC = memo(() => {
  const { user } = useContext(UserContext);
  let totalPrice = Number(user.selectedPlan?.beginPrice);
  const [getCookie, setCookie] = useCookies(['currency', 'currencySymbol'])

  return (
    <>
      <Subtitle margin="0 0 0.625rem 0">Order Summary</Subtitle>
      <Background>
        <Row margin="0 0 0.875rem 0">
          <Regular color={theme.colors.greyDark}>Subtotal</Regular>
          <Regular color={theme.colors.greyDark}>{getCookie?.currencySymbol}{`${
            Number(user.selectedPlan?.beginPrice) -
            Number(user.selectedPlan?.discount)
          }.00`}</Regular>
        </Row>
        {user.selectedPlan?.discount ? (
          <Row margin="0 0 0.875rem 0">
            <Regular color={theme.colors.green}>
              {user.selectedPlan?.period} plan discount
            </Regular>
            <Regular color={theme.colors.green}>
              {user.selectedPlan?.discount}.00
            </Regular>
          </Row>
        ) : null}
        {user.selectedPlan?.priceAfterDownsell ? (
          <Row margin="0 0 0.875rem 0">
            <Regular color={theme.colors.green}>Additional discount</Regular>
            <Regular color={theme.colors.green}>
              -
              {parseFloat(
                String(Number(user.selectedPlan?.beginPrice) * 0.15)
              ).toFixed(2)}
            </Regular>
          </Row>
        ) : null}
        <Line margin="0 0 0.875rem 0" />
        <Row>
          <Regular>Billed now</Regular>
          <Regular>
          {getCookie?.currencySymbol}{user.selectedPlan?.priceAfterDownsell || `${totalPrice}`}.00
          </Regular>
        </Row>
      </Background>
    </>
  );
});

OrderSummary.displayName = 'OrderSummary';

const Background = styled.div`
  padding: 1.5rem 1.75rem;
  background: ${theme.colors.white};
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
  border-top: 1px solid ${theme.colors.greyDark};
`;
