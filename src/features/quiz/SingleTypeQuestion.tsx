import { FC } from "react";
import styled from "styled-components";
import { OptionCard } from "./OptionCard";
import { Question } from "./quizTypes";

export const SingleTypeQuestion: FC<{
  question: Question;
  onSelect: (answer: string, nextQuestion?: string) => void;
}> = ({ question, onSelect }) => {
  return (
    <ContentWrapper>
      <Title>{question.label}</Title>
      {question.options && (
        <OptionsWrapper>
          {question.options.map((o, i) => (
            <OptionCard key={i} onClick={() => onSelect(o.key, o.nextQuestion)}>
              {o.label}
            </OptionCard>
          ))}
        </OptionsWrapper>
      )}
    </ContentWrapper>
  );
};

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 38rem;
  padding: 0 4% 0 4%;
  margin: auto;

  @media (max-width: 440px) {
    padding: 2rem 4% 0 4%;
    margin-bottom: 1.5rem;
  }
`;

const Title = styled.h1`
  font-size: 30px;
  margin-bottom: 2.75rem;
  text-align: center;
  margin-top: 0;

  @media (max-width: 440px) {
    margin-bottom: 1rem;
  }
`;

const OptionsWrapper = styled.div`
  max-width: 21.25rem;
  margin: auto;
`;
