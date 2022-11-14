import styled from "styled-components";

import { Container, Flex } from "src/Components";
import { Button } from "src/Components/Global/Button";

import { useMediaQuery } from "src/hooks";
import { Link, useNavigate } from "react-router-dom";
import { LinkList } from "src/types";

import DashboardImg from "src/Assets/images/phoneSlider/phoneSliderImg2.png";
import Customers from "src/Assets/images/landing/customers.png";
import { Footer } from "src/Components/Global/Footer";
import { HeaderWithImage } from "src/Components/layouts/HeaderWithImage/HeaderWithImage";

const Landing2 = () => {
  const { isMobile } = useMediaQuery();
  const navigate = useNavigate();

  return (
    <>
      <HeaderWithImage>
        <Button
          style={{ minWidth: "10rem" }}
          onClick={() => navigate(LinkList.Quiz)}
        >
          Get started
        </Button>
      </HeaderWithImage>
      <Background>
        <Container isPage>
          <Flex
            alignItems="center"
            justifyContent="space-between"
            flexDirection={isMobile ? "column-reverse" : "row"}
          >
            <ContentWrapper>
              <Title>
                Don't miss the train. Discover the next Bitcoin or Doge coin
                early.
              </Title>
              <Description>
                An insight aggregator app designed to make investment to crypto
                & NFT easy. From the start.
              </Description>
              <CustomersImg src={Customers} alt="" />
              <Link to={LinkList.Quiz}>
                <ButtonStyled>Get started now</ButtonStyled>
              </Link>
            </ContentWrapper>
            <ImageWrapper>
              <Img src={DashboardImg} alt="" />
            </ImageWrapper>
          </Flex>
        </Container>
      </Background>
      <Footer />
    </>
  );
};

export default Landing2;

const Background = styled.div`
  padding: 8rem 0 10rem 0;
  background: #ffff00;

  @media (max-width: 440px) {
    padding: 2rem 0;
  }
`;

const Title = styled.h1`
  margin-top: 0;
  margin-bottom: 1.5rem;
  font-size: 36px;
  line-height: 43px;
  letter-spacing: -0.02em;
  color: #171a1f;

  @media (max-width: 440px) {
    font-size: 30px;
    text-align: center;
    line-height: 36px;
  }
`;

const Description = styled.p`
  margin-bottom: 1rem;
  line-height: 26px;

  @media (max-width: 440px) {
    text-align: center;
    margin-bottom: 1rem;
  }
`;

const ButtonStyled = styled(Button)`
  min-width: 14rem;

  @media (max-width: 440px) {
    width: 100%;
  }
`;

const ContentWrapper = styled.div`
  width: 46%;

  @media (max-width: 440px) {
    width: 100%;
  }
`;

const ImageWrapper = styled.div`
  width: 50%;

  @media (max-width: 440px) {
    width: 100%;
    margin-bottom: 1.5rem;
  }
`;

const Img = styled.img`
  display: block;
  width: 100%;
`;

const CustomersImg = styled.img`
  width: 18.75rem;
  margin-bottom: 1.5rem;
`;
