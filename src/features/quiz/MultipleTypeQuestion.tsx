import { FC, useState } from "react";
import { Button } from "src/Components/Global/Button";
import styled from "styled-components";
import { OptionCard } from "./OptionCard";
import { Question, QuestionOption } from "./quizTypes";

export const MultipleTypeQuestion: FC<{
  question: Question;
  onSelect: (answer: string) => void;
}> = ({ question, onSelect }) => {
  const [selected, setSelected] = useState<Record<string, boolean>>({});

  const handleSelection = (option: QuestionOption) => {
    const key = option.key;

    if (option.key === "none") {
      onSelect("none");
    } else {
      const newSelected = { ...selected };

      if (newSelected[key]) {
        delete newSelected[key];
      } else if (!newSelected[key]) {
        newSelected[key] = true;
      }

      setSelected(newSelected);
    }
  };

  const handleClick = () => {
    if (!!Object.keys(selected).length) {
      onSelect(Object.keys(selected).join("|"));
    }
  };

  return (
    <ContentWrapper>
      <Title>{question.label}</Title>
      {question.options && (
        <OptionsWrapper>
          {question.options.map((o, i) => (
            <OptionCard
              key={i}
              isSelected={selected[o.key]}
              isSelectable={o.key !== "none"}
              onClick={() => handleSelection(o)}
              imgSrc={o.img_url}
            >
              {o.label}
            </OptionCard>
          ))}
          <Button
            disabled={!Object.keys(selected).length}
            style={{ width: "100%" }}
            onClick={handleClick}
          >
            Continue
          </Button>
        </OptionsWrapper>
      )}
    </ContentWrapper>
  );
};

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 38rem;
  padding: 2rem 4% 0 4%;
  margin: auto;

  @media (max-width: 440px) {
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
  padding-bottom: 2rem;

  @media (max-width: 440px) {
    max-width: none;
  }
`;
