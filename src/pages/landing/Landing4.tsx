import styled, { keyframes } from "styled-components";

import { Container, Flex } from "src/Components";
import { Button } from "src/Components/Global/Button";

import { useMediaQuery } from "src/hooks";
import { Link } from "react-router-dom";
import { LinkList } from "src/types";

import CustomersCheck from "src/Assets/images/landing/customers_check.png";
import { Footer } from "src/Components/Global/Footer";
import { HeaderWithImage } from "src/Components/layouts/HeaderWithImage/HeaderWithImage";

import Mobile from "src/Assets/images/landing/slider_mobile.png";
import Desktop from "src/Assets/images/landing/slider_desktop.png";

const Landing4 = () => {
  const { isMobile } = useMediaQuery();

  return (
    <>
      <HeaderWithImage>
        <Link to={LinkList.Quiz}>
          <Button style={{ minWidth: "10rem" }}>Get started</Button>
        </Link>
      </HeaderWithImage>
      <Background>
        <Container isPage>
          <Flex
            alignItems="center"
            justifyContent="space-between"
            flexDirection={isMobile ? "column-reverse" : "row"}
          >
            <ContentWrapper>
              <Title>Data dashboard for Crypto traders</Title>
              <Description>
                See what investors, traders, and influencers say about the NFT,
                crypto, and web3, and discover the next Bitcoin or DOGE early.
              </Description>
              {isMobile ? null : <Img src={CustomersCheck} />}
              <Link to={LinkList.Quiz}>
                <ButtonStyled>Get started</ButtonStyled>
              </Link>
              {isMobile ? <Img src={CustomersCheck} /> : null}
            </ContentWrapper>
            <ImageWrapper />
          </Flex>
        </Container>
      </Background>
      <Footer />
    </>
  );
};

export default Landing4;

const Background = styled.div`
  padding: 3rem 0 3rem 0;
  background: #ffff00;

  @media (max-width: 440px) {
    padding: 1rem 0;
  }
`;

const Title = styled.h1`
  margin-bottom: 2.5rem;
  font-size: 45px;
  line-height: 54px;
  letter-spacing: -0.02em;
  color: #171a1f;

  @media (max-width: 440px) {
    font-size: 30px;
    text-align: center;
    margin-bottom: 1rem;
    line-height: 36px;
  }
`;

const Description = styled.p`
  margin-bottom: 1rem;
  line-height: 26px;

  @media (max-width: 440px) {
    text-align: center;
  }
`;

const ButtonStyled = styled(Button)`
  min-width: 14rem;
  margin-bottom: 4rem;

  @media (max-width: 440px) {
    margin-bottom: 1rem;
    width: 100%;
  }
`;

const ContentWrapper = styled.div`
  width: 40%;

  @media (max-width: 440px) {
    width: 100%;
  }
`;

const slideShowVertical = keyframes`
  from{background-position:0 0}
  to{background-position:0 -10000%}
`;

const slideShowHorizontal = keyframes`
from{background-position:0 0}
  to{background-position: 10000% 0}
`;

const ImageWrapper = styled.div`
  width: 50%;
  padding-bottom: calc(50% + 6rem);
  margin: -3rem 0;
  animation: ${slideShowVertical} 1800s linear infinite;
  background: transparent url(${Desktop}) no-repeat 50%;
  background-position-y: 100%;
  background-repeat: repeat-y;
  background-size: 100% auto;

  @media (max-width: 440px) {
    width: 108%;
    margin-bottom: 1.5rem;

    background: transparent url(${Mobile}) no-repeat 50%;
    background-repeat: repeat-x;
    background-size: auto 100%;
    animation: ${slideShowHorizontal} 3000s infinite;
    padding-bottom: 17.5rem;
    margin: 0 -4% 0rem -4%;
  }
`;

const Img = styled.img`
  width: 100%;
  max-width: 25rem;
  margin-bottom: 1.5rem;

  @media (max-width: 440px) {
    margin: 0;
  }
`;
