import styled from "styled-components";

import { Container, Flex } from "src/Components";
import { Button } from "src/Components/Global/Button";

import ReactPlayer from "react-player";
import { useMediaQuery, useTracking } from "src/hooks";
import { LinkList } from "src/types";
import { theme } from "src/theme";

import { AllFeaturesBlock } from "src/Components/Global/AllFeaturesBlock";
import { FAQ, faqItems } from "src/Components/Global/FAQ";
import { Footer } from "src/Components/Global/Footer";
import { GetStarted } from "src/Components/Global/GetStarted";
import { Reasoning } from "src/Components/Global/Reasoning";
import { SliderBigBlock } from "src/Components/Global/SliderBigBlock";
import { SliderPhoneBlock } from "src/Components/Global/SliderPhoneBlock";
import { SourcesBlock } from "src/Components/Global/SourcesBlock";
import { TwoSideBlock } from "src/Components/Global/TwoSideBlock";
import graphImg from "src/Assets/images/graph.png";

import AutumnSale from "src/Assets/images/landing/autumn_sale.png";
import { Link, useNavigate } from "react-router-dom";
import { HeaderWithImage } from "src/Components/layouts/HeaderWithImage/HeaderWithImage";
import { useContext } from "react";
import { UserContext } from "src/state/userContext";

const Landing5 = () => {
  const { isMobile } = useMediaQuery();
  const navigate = useNavigate();
  const { trackQuizAnswer } = useTracking();
  const { setUser } = useContext(UserContext);

  const handleSelection = (level: string) => {
    setUser((prev) => ({
      ...prev,
      quizAnswers: { ...prev.quizAnswers, level },
    }));

    trackQuizAnswer("level", level);

    navigate(LinkList.Quiz);
  };

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
              {isMobile ? null : (
                <Title>
                  Reduce trading risks by tracking crypto influencers
                </Title>
              )}
              <Description>
                Potato is an innovative and effective way to build up your
                portfolio and track authentic projects in one place.
                {isMobile ? " " : <br />}
                <span>Take a quiz to see how it can help you.</span>
              </Description>
              <Grid>
                <ButtonStyled
                  className="Button__heavy"
                  onClick={() => handleSelection("expert")}
                >
                  Expert
                </ButtonStyled>
                <ButtonStyled
                  className="Button__heavy"
                  isGrey
                  onClick={() => handleSelection("beginner")}
                >
                  Beginner
                </ButtonStyled>
              </Grid>
              <img style={{ width: "100%" }} src={AutumnSale} alt="" />
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
              <Title>Reduce trading risks by tracking crypto influencers</Title>
            ) : null}
          </Flex>
        </Container>
      </Background>
      <SliderPhoneBlock />
      <AllFeaturesBlock />
      <SourcesBlock />
      <TwoSideBlock
        title="Track sentiment, correlate with price"
        subtitle="Social sentiment has been shown to be useful in predicting whether Crypto & NFT prices will increase or decrease."
        ctaText="Get started"
        url={LinkList.Pricing}
        subText="Click here for scientific information about sentiment tracking"
        subUrl="https://jfin-swufe.springeropen.com/articles/10.1186/s40854-022-00352-7"
        img={graphImg}
        className="Frontpage__graphBlock"
      />

      <Reasoning />
      <SliderBigBlock />
      <GetStarted />
      <TwoSideBlock
        title="Get the first row ticket now"
        subtitle="Join thousands who've already invested by copying the leading industry traders and crypto experts in our community."
        ctaText="Try 1 Month For $5"
        url={LinkList.Pricing}
      />
      <FAQ faqItems={faqItems} />
      <Footer />
    </>
  );
};

export default Landing5;

const Background = styled.div`
  padding: 3rem 0 4.375rem 0;
  background: ${theme.colors.grey};

  @media (max-width: 440px) {
    padding: 0.5rem 0 1rem 0;
  }
`;

const Title = styled.h1`
  margin-bottom: 2.5rem;
  font-size: 30;
  line-height: 36px;
  letter-spacing: -0.02em;
  color: #171a1f;

  @media (max-width: 440px) {
    text-align: center;
    margin-bottom: 1rem;
  }
`;

const Description = styled.p`
  margin-bottom: 3rem;
  line-height: 26px;

  span {
    color: #0022ff;
  }

  @media (max-width: 440px) {
    text-align: center;
    margin-bottom: 1rem;
  }
`;

const ButtonStyled = styled(Button)<{ isGrey?: boolean }>`
  min-width: 10rem;

  ${({ isGrey }) =>
    isGrey &&
    `
    background: #88898C !important;
    border-color: #88898C !important;
  `}

  @media (max-width: 440px) {
    width: 100%;
  }
`;

const ContentWrapper = styled.div`
  width: 45%;

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

const Grid = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(2, 1fr);
  margin-bottom: 1rem;
`;
