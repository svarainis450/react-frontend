import { Container, Flex } from "src/Components";
import { Question } from "./quizTypes";
import { FC } from "react";
import styled from "styled-components";

import bullsEyeIndex from "src/Assets/images/quiz/bullseye_index.png";
import infoIcon from "src/Assets/images/infoIcon.svg";
import { Button } from "src/Components/Global/Button";
import { useMediaQuery } from "src/hooks";

export const InfoTypeQuestion: FC<{
  question: Question;
  onSelect: (answer: string) => void;
}> = ({ question, onSelect }) => {
  const { isMobile } = useMediaQuery();

  return (
    <Container isPage>
      <Flex
        alignItems="center"
        justifyContent="space-between"
        padding={isMobile ? "1rem 0 5rem 0" : "0"}
        flexDirection={isMobile ? "column" : "row"}
      >
        <Content>
          <H1>How to detect crypto scammers easier?</H1>
          <Description>
            Today everyone can say anything, and not necessarily, they would be
            accountable for their words. Many pseudo influencers have millions
            of followers within different social networks, manipulating their
            communities in a way beneficial to only them. Therefore, we are
            tracking every word the crypto experts and their community say to
            encourage consistency in their content.
          </Description>
          <ButtonWrapper>
            <ButtonStyled onClick={() => onSelect(question.key)}>
              Continue
            </ButtonStyled>
          </ButtonWrapper>
        </Content>
        <Img src={bullsEyeIndex} alt="" />
      </Flex>
    </Container>
  );
};

const Content = styled.div`
  margin-right: 7rem;

  @media (max-width: 440px) {
    margin-right: 0;
    text-align: center;
  }
`;

const Img = styled.img`
  display: block;
  width: 40%;

  @media (max-width: 440px) {
    width: 100%;
    padding: 0;
  }
`;

const H1 = styled.h1`
  font-size: 30px;
  line-height: 36px;
  margin-bottom: 1.5rem;
`;

const Description = styled.p`
  font-size: 14px;
  line-height: 24px;
  margin-bottom: 2rem;

  @media (max-width: 440px) {
    width: 100%;
    margin-bottom: 1.5rem;
  }
`;

const A = styled.a`
  margin-left: 0.5rem;
  color: #0022ff;
  font-size: 10px;
`;

const ButtonStyled = styled(Button)`
  min-width: 12rem;

  @media (max-width: 440px) {
    width: 100%;
    margin-bottom: 0rem;
  }
`;

const ButtonWrapper = styled.div`
  @media (max-width: 440px) {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 1rem 4%;
    background: rgba(255, 255, 255, 0.7);
  }
`;
