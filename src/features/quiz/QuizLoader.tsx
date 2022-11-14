import { FC, useEffect, useState } from "react";
import { Container, Logo } from "src/Components";
import { theme } from "src/theme";
import styled, { keyframes } from "styled-components";

import Lottie from "lottie-react";

import * as animationData from "src/Assets/lotties/Lottie_rocket.json";

const LOTTIE_OPTIONS = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

export const QuizLoader: FC<{ onFinish: () => void }> = ({ onFinish }) => {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent((value) => {
        const newValue = value + 1;

        if (newValue >= 100) {
          clearInterval(interval);
          onFinish();
        }

        return newValue;
      });
    }, 60);

    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Background>
      <Container>
        <Logo />
        <LoaderWrapper>
          <Title>{percent}%</Title>
          <ProgressBar>
            <Progress />
          </ProgressBar>
          <Caption>
            {percent > 40 ? "Sit tight!" : "Calculating Your Results..."}
          </Caption>
          {percent > 40 ? (
            <Regular>
              We are connecting hundreds of data points to get you the most
              suitable Potato plan.
            </Regular>
          ) : null}
          <AnimationWrapper>
            <Lottie {...LOTTIE_OPTIONS} />
          </AnimationWrapper>
        </LoaderWrapper>
      </Container>
    </Background>
  );
};

const Background = styled.div`
  padding-top: 1.5rem;
  min-height: 100vh;
  background: ${theme.colors.heroYellow};

  @media (max-width: 440px) {
    ${Logo} {
      margin: auto;
    }
  }
`;

const LoaderWrapper = styled.div`
  padding-top: 12.5rem;
  max-width: 26rem;
  margin: auto;

  @media (max-width: 440px) {
    padding: 8rem 4% 0 4%;
  }
`;

const Title = styled.h1`
  font-size: 45px;
  text-align: center;
  margin-bottom: 2rem;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 3px;
  background: ${theme.colors.white};
  margin-bottom: 2rem;
`;

const progressAnimation = keyframes`
  0% {
    width: 0%;
  } 100% {
    width: 100%;
  }
`;

const Progress = styled.div`
  width: 0%;
  height: 3px;
  background: ${theme.colors.black};
  animation: ${progressAnimation} 7s ease forwards;
`;

const Caption = styled.p`
  font-size: 20px;
  margin-bottom: 1rem;
  text-align: center;
`;

const Regular = styled.p`
  font-size: 14px;
  color: #88898c;
  text-align: center;
  line-height: 24px;
  font-weight: 500;
`;

const AnimationWrapper = styled.div`
  max-width: 7.5rem;
  margin: auto;
`;
