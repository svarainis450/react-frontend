import { Container, Flex } from "src/Components";
import { Question } from "./quizTypes";
import { FC } from "react";
import styled from "styled-components";

import graphImg from "src/Assets/images/graph.png";
import infoIcon from "src/Assets/images/infoIcon.svg";
import { Button } from "src/Components/Global/Button";
import { useMediaQuery } from "src/hooks";

export const Info1TypeQuestion: FC<{
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
          <H1>
            Why it’s important to track social sentiment and correlate with
            price
          </H1>
          <Description>
            Social sentiment has been shown to help predict whether Crypto & NFT
            prices will increase or decrease. The main research contribution
            from the paper below is that data scientists demonstrate that price
            direction prediction can be made, and the magnitude of price change
            can be predicted with a relative <b>accuracy of 63%.</b>
          </Description>
          <Flex
            alignItems="center"
            justifyContent={isMobile ? "center" : "left"}
            margin={isMobile ? "0 0 1rem 0" : "0 0 2rem 0"}
          >
            <img src={infoIcon} alt="" />
            <A
              href="https://jfin-swufe.springeropen.com/articles/10.1186/s40854-022-00352-7"
              target="_blank"
            >
              Click here for scientific information about sentiment tracking
            </A>
          </Flex>
          <ButtonWrapper>
            <ButtonStyled onClick={() => onSelect(question.key)}>
              Continue
            </ButtonStyled>
          </ButtonWrapper>
        </Content>
        <Img src={graphImg} alt="" />
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
  width: 48%;

  @media (max-width: 440px) {
    width: 100%;
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
    margin-bottom: 2rem;
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
