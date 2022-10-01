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
import { useAppDispatch } from 'src/state/reduxstate/store';
import { setSelectedPlan } from 'src/state/reduxstate/user/slice';
import { useSelector } from 'react-redux';
import { selectedPlanSelector } from 'src/state/reduxstate/user/selectors';

export const SubscriptionOptions: FC = memo(() => {
  const dispatch = useAppDispatch();
  const { isMobile } = useMediaQuery();
  const { user, setUser } = useContext(UserContext);
  const [selectedPeriod, setSelectedPeriod] = useState(
    user.selectedPlan?.billing_type.toLocaleLowerCase() || 'yearly'
  );
  const selectedPlan = useSelector(selectedPlanSelector);
  const userPlanContext = user.selectedPlan;
  const [getCookie, setCookie] = useCookies(['currency', 'currencySymbol']);

  useEffect(() => {
    const selectedPlanDetails = priceOptions[String(selectedPeriod)].find(
      (p) => p.plan === user.selectedPlan?.plan
    );
    console.log(selectedPlanDetails);
    setUser((prev) => ({
      ...prev,
      selectedPlan: priceOptions[String(selectedPeriod)].find(
        (p) => p.plan === user.selectedPlan?.plan
      ),
    }));
    if (selectedPlanDetails) {
      dispatch(
        setSelectedPlan({
          monthly_price: selectedPlanDetails.monthly_price,
          begin_price: selectedPlanDetails.begin_price,
          billing_type: selectedPlanDetails.billing_type,
          plan: selectedPlanDetails.plan,
          stripe_price_id: selectedPlanDetails.stripe_price_id,
          stripe_product: selectedPlanDetails.stripe_product,
        })
      );
    } // eslint-disable-next-line react-hooks/exhaustive-deps
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
          <Circle isSelected={selectedPeriod === 'monthly'} />
        </OptionCard>
        <OptionCard
          isSelected={selectedPeriod === 'yearly'}
          onClick={() => setSelectedPeriod('yearly')}
        >
          <div>
            <Flex alignItems="flex-start">
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
              {(priceOptions['yearly'].find(
                (p) => p.plan === user?.selectedPlan?.plan
              )?.begin_price || 0) / 12}
              /month
            </Small>
          </div>
          <Circle isSelected={selectedPeriod === 'yearly'} />
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
  padding: 0.625rem 0.9rem;
  background: ${({ isSelected }) =>
    isSelected ? 'rgba(43, 89, 209, 0.1);' : theme.colors.white};
  border: 1.5px solid
    ${({ isSelected }) =>
      isSelected ? theme.colors.potatoBlue : theme.colors.white};
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
  letter-spacing: -0.02rem;
`;

// @TODO: move to Typography component
const Small = styled(Box).attrs({ as: 'p' })`
  font-size: 0.75rem;
  color: ${theme.colors.greyDark};
`;

// @TODO: move to Typography component
const Discount = styled.span`
  padding: 0.125rem;
  font-size: 0.75rem;
  color: ${theme.colors.white};
  background: ${theme.colors.black};
  border-radius: 0.75rem;
`;

const Circle = styled.div<{ isSelected?: boolean }>`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: ${({ isSelected }) =>
    isSelected ? theme.colors.potatoBlue : '#f4f4f4'};
  box-shadow: ${({ isSelected }) =>
    isSelected ? '0px 2px 2px rgba(0, 0, 0, 0.1)' : ''};
`;
