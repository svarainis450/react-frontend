import styled from "styled-components";

import { Container, Flex } from "src/Components";
import { Button } from "src/Components/Global/Button";
import { StatisticsHero } from "src/Components/Global/StatisticsHero";

import ReactPlayer from "react-player";
import { useMediaQuery } from "src/hooks";
import { Link, useNavigate } from "react-router-dom";
import { LinkList } from "src/types";
import { Footer } from "src/Components/Global/Footer";
import { HeaderWithImage } from "src/Components/layouts/HeaderWithImage/HeaderWithImage";

const Landing = () => {
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
              {isMobile ? null : (
                <Title>Struggling to find the next crypto opportunity?</Title>
              )}
              <Description>
                Take a quiz to find out which Crypto & NFTs are being talked
                about before they rocket to the moon 🚀{" "}
                <span>It only takes 1 minute to complete.</span>
              </Description>
              <Link to={LinkList.Quiz}>
                <ButtonStyled>Get started</ButtonStyled>
              </Link>
              <StatisticsHero />
            </ContentWrapper>
            <VideoWrapper>
              <ReactPlayer
                url="/videos/billo.mp4"
                width="100%"
                height="100%"
                controls={true}
              />
            </VideoWrapper>
            {isMobile ? (
              <Title>Struggling to find the next crypto opportunity?</Title>
            ) : null}
          </Flex>
        </Container>
      </Background>
      <Footer />
    </>
  );
};

export default Landing;

const Background = styled.div`
  padding: 3rem 0 4.375rem 0;
  background: #ffff00;

  @media (max-width: 440px) {
    padding: 0.5rem 0 1rem 0;
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

  span {
    color: #0022ff;
  }

  @media (max-width: 440px) {
    text-align: center;
    margin-bottom: 1.5rem;
  }
`;

const ButtonStyled = styled(Button)`
  min-width: 14rem;
  margin-bottom: 4rem;

  @media (max-width: 440px) {
    margin-bottom: 0;
    width: 100%;
  }
`;

const ContentWrapper = styled.div`
  width: 60%;

  @media (max-width: 440px) {
    width: 100%;
  }
`;

const VideoWrapper = styled.div`
  width: 35%;

  @media (max-width: 440px) {
    width: 100%;
    margin-bottom: 1.5rem;
  }
`;
