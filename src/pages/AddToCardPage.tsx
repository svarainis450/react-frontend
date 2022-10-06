import {
  FC,
  memo,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import TagManager from 'react-gtm-module';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CheckoutForm from 'src/Components/Payments/StripeCheckout';
import { paymentStatusSelector } from 'src/state/reduxstate/payments/selectors';
import { userTokenSelector } from 'src/state/reduxstate/user/selectors';
import styled from 'styled-components';

import {
  Box,
  Downsell,
  Flex,
  LayoutWithHeader,
  OrderSummary,
  OurPromise,
  PaymentCardForm,
  SubscriptionLayout,
} from '../Components';
import { useMediaQuery } from '../hooks';
import { UserContext } from '../state/userContext';
import { theme } from '../theme';
import { LinkList } from '../types';
import { icons } from '../utils/icons';

export const AddToCardPage: FC = memo(() => {
  const { isMobile, isTablet } = useMediaQuery();
  const [showDownsell, setShowDownsell] = useState<boolean>(false);
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const paymentStatus = useSelector(paymentStatusSelector);
  const myRef = useRef<null | HTMLDivElement>(null);
  const userToken = useSelector(userTokenSelector);

  const handlePaymentSubmit = useCallback(() => {
    TagManager.dataLayer({
      dataLayer: {
        event: 'purchase_main',
        currencyCode: 'USD',
        transactionId: user.orderId,
        transactionTotal:
          user.selectedPlan?.priceAfterDownsell ||
          Number(user.selectedPlan?.begin_price),
        transactionProducts: [
          {
            sku: user.selectedPlan?.plan,
            name: user.selectedPlan?.plan,
            price:
              user.selectedPlan?.priceAfterDownsell ||
              Number(user.selectedPlan?.begin_price),
            quantity: 1,
          },
        ],
      },
    });
    navigate(LinkList.Success);
  }, [navigate, user]);

  const handleLogoClick = useCallback(() => {
    setShowDownsell(true);
  }, []);

  const handeDownsellClose = useCallback(() => {
    setShowDownsell(false);
  }, []);

  // useEffect(() => {
  //   if (!user.selectedPlan) {
  //     navigate(LinkList.Membership);
  //   }
  // }, [navigate, user]);

  useEffect(() => {
    if (paymentStatus === 'succeeded') {
      handlePaymentSubmit();
      navigate(LinkList.Success);
    }
  }, [paymentStatus]);

  useEffect(() => {
    if (myRef.current) {
      myRef.current.scrollTo(0, 0);
    }
  }, [showDownsell]);

  return !user.selectedPlan ? null : (
    <>
      <LayoutWithHeader showLoginOption onClick={handleLogoClick}>
        <FlexStyled ref={myRef} isDownsell={showDownsell}>
          {isTablet ? null : <OurPromise />}
          <SubscriptionLayout onBack={handleLogoClick}>
            <Title margin={isMobile ? '0 0 1.5rem 0' : '0 0 2.5rem 0'}>
              Payment Details
            </Title>
            {/* <Img
              src={images.paymentProviders}
              alt="Payment providers"
              onClick={handlePaymentSubmit}
            /> */}
            {/* <Flex alignItems="center" margin="0 0 1rem 0">
              <Line />
              <Caption>or checkout using a credit card</Caption>
              <Line />
            </Flex> */}
            {/* <PaymentCardForm onSubmit={handlePaymentSubmit} /> */}
            <CheckoutForm />
            <TermsDisclaimerWrap margin="2rem 0">
              <img src={icons.cards_logos} alt="Payment cards" />
              <TermsDisclaimerText>
                By submitting your information and continuing to purchase, you
                agree to our <strong>Terms of Service</strong> and{' '}
                <strong>Privacy Policy</strong>.
              </TermsDisclaimerText>
            </TermsDisclaimerWrap>
            <OrderSummary hideTitle />
          </SubscriptionLayout>
        </FlexStyled>
      </LayoutWithHeader>
      {showDownsell ? <Downsell onClose={handeDownsellClose} /> : null}
    </>
  );
});

AddToCardPage.displayName = 'AddToCardPage';

const FlexStyled = styled(Flex)<{ isDownsell?: boolean }>`
  position: relative;
  height: calc(100vh - 5.625rem);
  overflow-y: auto;

  & > div:first-of-type {
    width: 35%;
  }

  & > div:last-of-type {
    flex: 1;
    padding: 3rem 4%;

    @media (max-width: ${theme.breakpoints.mobile}px) {
      padding: 1.5rem 4%;
    }
  }

  /* @TODO: improve Button component */
  & .Button {
    display: block;
    width: 100%;
    max-width: 14rem;
    margin: 0 auto 2rem auto;
  }

  @media (max-width: ${theme.breakpoints.mobile}px) {
    height: calc(100vh - 4rem);

    ${({ isDownsell }) =>
      isDownsell &&
      `
      height: auto;
      background: #04C604;
      overflow-y: scroll
    `};
  }
`;

// @TODO: move to Typography component
const Title = styled(Box).attrs({ as: 'h2' })`
  font-size: 1.875rem;
  text-align: center;

  @media (max-width: ${theme.breakpoints.mobile}px) {
    font-size: 1.5rem;
  }
`;

const TermsDisclaimerText = styled.p`
  font-size: 0.75rem;
  font-weight: 300;
  line-height: 22px;
  text-align: center;
`;

const TermsDisclaimerWrap = styled(Box)`
  text-align: center;
`;

// const Img = styled.img`
//   display: block;
//   width: 100%;
//   margin-bottom: 0.875rem;
//   cursor: pointer;
// `;

// const Line = styled.div`
//   flex: 0.3rem;
//   border: 0.5px solid ${theme.colors.greyDark};
// `;

// const Caption = styled.p`
//   flex: 3;
//   font-size: 0.875rem;
//   color: ${theme.colors.greyDark};
//   text-align: center;
// `;
