import { FC } from "react";
import styled from "styled-components";
import { Logo } from "../../Components/Logo";
import { Container } from "../../Components/wrappers/Container";
import { Flex } from "../../Components/wrappers/Flex";

export const QuizProgressHeader: FC<{
  totalNumber: number;
  currentStep: number;
}> = ({ totalNumber, currentStep }) => {
  return (
    <Background isPage>
      <Flex alignItems="center" justifyContent="space-between">
        <Logo />
        <Progress>{`${currentStep}/${totalNumber}`}</Progress>
      </Flex>
    </Background>
  );
};

const Background = styled(Container)`
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;

  @media (max-width: 440px) {
    padding-top: 1rem;
    padding-bottom: 1rem;
  }
`;

const Progress = styled.p`
  color: #686868;
`;
