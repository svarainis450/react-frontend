import { FC, memo, useContext, useEffect, useState } from 'react';
import { Link as LinkTag } from 'react-router-dom';
import styled from 'styled-components';

import {
  Box,
  Flex,
  FormWrapper,
  LayoutWithHeader,
  OrderSummary,
} from '../Components';
import { Button } from '../Components/Global/Button';
import { UserContext } from '../state/userContext';
import { theme } from '../theme';
import { LinkList } from '../types';
import { icons } from '../utils/icons';
import { images } from '../utils/images';

const TIME_UNTIL_ERROR = 6000;

export const SuccessPage: FC = memo(() => {
  const { user } = useContext(UserContext);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setIsError(true);
    }, TIME_UNTIL_ERROR);
  }, []);

  return (
    <LayoutWithHeader>
      <Background alignItems="center" justifyContent="center" isError={isError}>
        {isError ? (
          <FlexStyled alignItems="center" justifyContent="center">
            <Sign src={images.errorSign} alt="Error Sign" />
            <ContentWrapper>
              <img src={icons.close} alt="Close" />
              <H1>
                Sorry, we are currently experiencing some technical issues. Your
                order wasn’t processed.
              </H1>
            </ContentWrapper>
          </FlexStyled>
        ) : (
          <FormWrapper>
            <SuccessImg src={images.success} alt="Success" />
            <Title margin="-1.5rem 0 1.25rem 0">Thank you for your order</Title>
            <OrderNumber margin="0 0 2rem 0">{`#${user.orderId}`}</OrderNumber>
            <OrderSummary />
            <LinkTag to={LinkList.Landing}>
              <Button>Go to the homepage</Button>
            </LinkTag>
          </FormWrapper>
        )}
      </Background>
    </LayoutWithHeader>
  );
});

SuccessPage.displayName = 'SuccessPage';

const Background = styled(Flex)<{ isError: boolean }>`
  padding: 2rem 0;
  height: calc(100vh - 5.625rem);
  background: ${theme.colors.green};
  overflow-y: scroll;

  ${({ isError }) =>
    isError &&
    `
    align-items: end;
    padding: 0;
    background: ${theme.colors.red};
  `}

  .Button {
    width: 100%;
    max-width: 14rem;
    margin: 4rem auto 0 auto;
  }

  @media (max-width: ${theme.breakpoints.mobile}px) {
    height: calc(100vh - 4rem);
  }
`;

const SuccessImg = styled.img`
  display: block;
  width: 50%;
  margin: auto;
`;

// @TODO: move to Typography component
const Title = styled(Box).attrs({ as: 'h2' })`
  font-size: 1.875rem;
  text-align: center;

  @media (max-width: ${theme.breakpoints.mobile}px) {
    font-size: 1.5rem;
  }
`;

// @TODO: move to Typography component
const OrderNumber = styled(Box).attrs({ as: 'p' })`
  padding: 1rem 0;
  text-align: center;
  font-size: 0.875rem;
  color: ${theme.colors.white};
  background: ${theme.colors.black};
  border-radius: 0.25rem;
`;

const Sign = styled.img`
  width: 25rem;

  @media (max-width: ${theme.breakpoints.smallDesktop}px) {
    width: 18rem;
  }

  @media (max-width: ${theme.breakpoints.tablet}px) {
    width: 60%;
  }
`;

const ContentWrapper = styled.div`
  flex: 0.5;
  text-align: center;
  margin-left: 10rem;

  @media (max-width: ${theme.breakpoints.smallDesktop}px) {
    margin-left: 5rem;
  }

  @media (max-width: ${theme.breakpoints.tablet}px) {
    margin: 0 0 2rem 0;
  }
`;

const FlexStyled = styled(Flex)`
  @media (max-width: ${theme.breakpoints.tablet}px) {
    flex-direction: column-reverse;
    padding: 0 4%;
  }
`;

// @TODO: move to Typography component
const H1 = styled.h1`
  font-size: 1.25rem;
  line-height: 1.5rem;
  text-align: center;
  color: ${theme.colors.white};

  @media (max-width: ${theme.breakpoints.mobile}px) {
    font-size: 1.5rem;
  }
`;
