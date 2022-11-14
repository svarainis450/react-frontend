import styled from "styled-components";

import { Container, Flex } from "src/Components";
import { Button } from "src/Components/Global/Button";

import ReactPlayer from "react-player";
import { useMediaQuery } from "src/hooks";
import { Link, useNavigate } from "react-router-dom";
import { LinkList } from "src/types";
import { theme } from "src/theme";
import { Footer } from "src/Components/Global/Footer";
import { HeaderWithImage } from "src/Components/layouts/HeaderWithImage/HeaderWithImage";

const Landing3 = () => {
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
                <Title>
                  Most accurate Data dashboard for NFT & Crypto trading
                </Title>
              )}
              <Description>
                Potato gives you the knowledge to make better, faster trading
                decisions. <span>Take a free, 1-minute quiz</span> created by
                experts to find which Potato program is best-fitting for you.
              </Description>
              <Link to={LinkList.Quiz}>
                <ButtonStyled>Get started</ButtonStyled>
              </Link>
              <Description isMobileNotCentered={true}>
                📈 Discover early momentum signals
                <br />
                🎯 Track influencers' NFT & crypto picks daily
                <br />
                📬 Discover upcoming crypto & NFT projects
                <br />
                🔎 Keep tabs on crypto & NFT experts
                <br />
                💰 Follow leading investor profiles
                <br />
                📱🖥 Designed to use both on desktop and mobile
              </Description>
            </ContentWrapper>
            <VideoWrapper>
              <ReactPlayer
                url="/videos/testimonial.mp4"
                width="100%"
                height="100%"
                controls={true}
              />
            </VideoWrapper>
            {isMobile ? (
              <Title>
                Most accurate Data dashboard for NFT & Crypto trading
              </Title>
            ) : null}
          </Flex>
        </Container>
      </Background>
      <Footer />
    </>
  );
};

export default Landing3;

const Background = styled.div`
  padding: 3rem 0 4.375rem 0;
  background: ${theme.colors.grey};

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
  margin-top: 0;

  @media (max-width: 440px) {
    font-size: 30px;
    text-align: center;
    margin-bottom: 1rem;
    line-height: 36px;
  }
`;

const Description = styled.p<{ isMobileNotCentered?: boolean }>`
  margin-bottom: 2rem;
  line-height: 26px;

  span {
    color: #0022ff;
  }

  @media (max-width: 440px) {
    text-align: ${({ isMobileNotCentered }) =>
      isMobileNotCentered ? "inherit" : "center"};
    margin-bottom: 1rem;
  }
`;

const ButtonStyled = styled(Button)`
  min-width: 14rem;
  margin-bottom: 2rem;

  @media (max-width: 440px) {
    width: 100%;
  }
`;

const ContentWrapper = styled.div`
  width: 54%;

  @media (max-width: 440px) {
    width: 100%;
  }
`;

const VideoWrapper = styled.div`
  width: 36%;

  @media (max-width: 440px) {
    width: 100%;
    margin-bottom: 1.5rem;
  }
`;
