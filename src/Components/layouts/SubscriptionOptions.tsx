import { FC, memo, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useMediaQuery } from '../../hooks';
import { UserContext } from '../../state/userContext';
import { theme } from '../../theme';
import { icons } from '../../utils/icons';
import { priceOptions } from '../Global/PaymentOptions';

import { Box } from '../wrappers/Box';
import { Flex } from '../wrappers/Flex';
import { useCookies } from 'react-cookie';

export const SubscriptionOptions: FC = memo(() => {
  const { isMobile } = useMediaQuery();
  const { user, setUser } = useContext(UserContext);
  const [selectedPeriod, setSelectedPeriod] = useState(
    user.selectedPlan?.billing_type.toLocaleLowerCase() || 'yearly'
  );
  const [getCookie, setCookie] = useCookies(['currency', 'currencySymbol']);

  useEffect(() => {
    setUser((prev) => ({
      ...prev,
      selectedPlan: priceOptions[String(selectedPeriod)].find(
        (p) => p.plan === user.selectedPlan?.plan
      ),
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPeriod, setUser]);

  return (
    <>
      <Title margin={isMobile ? '0 0 1.25rem 0' : '0 0 3.25rem 0'}>
        Subscribe to {user.selectedPlan?.plan}
      </Title>
      <Flex
        margin={isMobile ? '0 0 2.875rem 0' : '0 0 2.5rem 0'}
        flexDirection={isMobile ? 'column' : 'row'}
      >
        <OptionCard
          isSelected={selectedPeriod === 'monthly'}
          onClick={() => setSelectedPeriod('monthly')}
        >
          <div>
            <Caption>Bill monthly</Caption>
            <Small>
              {getCookie.currencySymbol}
              {priceOptions['monthly'].find(
                (p) => p.plan === user.selectedPlan?.plan
              )?.begin_price || 0}
              /month
            </Small>
          </div>
          <img
            src={
              selectedPeriod === 'monthly' ? icons.circle_checked : icons.circle
            }
            alt="Cicle"
          />
        </OptionCard>
        <OptionCard
          isSelected={selectedPeriod === 'yearly'}
          onClick={() => setSelectedPeriod('yearly')}
        >
          <div>
            <Flex>
              <Caption margin="0 0.375rem 0 0">Bill yearly</Caption>
              <Discount>
                {
                  priceOptions['yearly'].find(
                    (p) => p.plan === user.selectedPlan?.plan
                  )?.discount
                }
                %
              </Discount>
            </Flex>
            <Small>
              {getCookie.currencySymbol}
              {priceOptions['yearly'].find(
                (p) => p.plan === user.selectedPlan?.plan
              )?.begin_price || 0 / 12}
              /month
            </Small>
          </div>
          <img
            src={
              selectedPeriod === 'yearly' ? icons.circle_checked : icons.circle
            }
            alt="Cicle"
          />
        </OptionCard>
      </Flex>
    </>
  );
});

// @TODO: move to Typography component
const Title = styled(Box).attrs({ as: 'h2' })`
  font-size: 1.875rem;
  text-align: center;

  @media (max-width: ${theme.breakpoints.mobile}px) {
    font-size: 1.5rem;
  }
`;

const OptionCard = styled(Flex).attrs({
  alignItems: 'baseline',
  justifyContent: 'space-between',
})<{ isSelected?: boolean }>`
  flex: 1;
  padding: 0.625rem 1.125rem;
  background: ${theme.colors.white};
  border: 1.5px solid
    ${({ isSelected }) =>
      isSelected ? theme.colors.heroYellow : theme.colors.white};
  cursor: pointer;

  &:first-of-type {
    margin-right: 0.75rem;

    @media (max-width: ${theme.breakpoints.mobile}px) {
      margin: 0 0 1rem 0;
    }
  }

  &:last-of-type {
    margin-left: 0.75rem;

    @media (max-width: ${theme.breakpoints.mobile}px) {
      margin: 0;
    }
  }
`;

// @TODO: move to Typography component
const Caption = styled(Box).attrs({ as: 'p' })`
  margin-bottom: 0.25rem;
  font-size: 1rem;
`;

// @TODO: move to Typography component
const Small = styled(Box).attrs({ as: 'p' })`
  font-size: 0.75rem;
  color: ${theme.colors.greyDark};
`;

// @TODO: move to Typography component
const Discount = styled.span`
  padding: 0.25rem;
  font-size: 0.75rem;
  color: ${theme.colors.white};
  background: ${theme.colors.black};
  border-radius: 0.75rem;
`;
