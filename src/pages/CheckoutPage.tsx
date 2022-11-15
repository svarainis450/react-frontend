import {
  useRef,
  FC,
  memo,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import {
  Box,
  Downsell,
  Flex,
  GeneralInformationForm,
  LayoutWithHeader,
  OurPromise,
  SubscriptionLayout,
} from '../Components';
import { useMediaQuery } from '../hooks';
import { UserContext } from '../state/userContext';
import { theme } from '../theme';
import { LinkList } from '../types';

const CheckoutPage: FC = memo(() => {
  const { isMobile, isTablet } = useMediaQuery();
  const [showDownsell, setShowDownsell] = useState<boolean>(false);
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const myRef = useRef<null | HTMLDivElement>(null);

  const handleSubmit = useCallback(() => {
    navigate(LinkList.AddToCard);
  }, [navigate]);

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
              Create account
            </Title>
            <GeneralInformationForm onSubmit={handleSubmit} />
          </SubscriptionLayout>
        </FlexStyled>
      </LayoutWithHeader>
      {showDownsell ? <Downsell onClose={handeDownsellClose} /> : null}
    </>
  );
});

CheckoutPage.displayName = 'CheckoutPage';

export default CheckoutPage;

const FlexStyled = styled(Flex)<{ isDownsell?: boolean }>`
  position: relative;
  height: calc(100vh - 5.625rem);

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
    margin: auto;
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
