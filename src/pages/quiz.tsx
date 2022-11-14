import { FC, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { quizzes } from "src/data/quizzes";
import { Info1TypeQuestion } from "src/features/quiz/Info1TypeQuestion";
import { InfoTypeQuestion } from "src/features/quiz/InfoTypeQuestion";
import { MultipleTypeQuestion } from "src/features/quiz/MultipleTypeQuestion";
import { QuizLoader } from "src/features/quiz/QuizLoader";
import { QuizProgressHeader } from "src/features/quiz/QuizProgressHeader";
import { Question } from "src/features/quiz/quizTypes";
import { SingleTypeQuestion } from "src/features/quiz/SingleTypeQuestion";
import { useTracking } from "src/hooks";
import { UserContext } from "src/state/userContext";
import { theme } from "src/theme";
import { LinkList } from "src/types";
import styled from "styled-components";

const QuestionToComp: Record<
  string,
  FC<{
    question: Question;
    onSelect: (answers: string, nextQuestion?: string) => void;
  }>
> = {
  single: SingleTypeQuestion,
  multiple: MultipleTypeQuestion,
  info_1: Info1TypeQuestion,
  info: InfoTypeQuestion,
};

const Quiz = () => {
  const navigate = useNavigate();
  const { trackQuizAnswer } = useTracking();
  const { user, setUser } = useContext(UserContext);
  const [stepIndex, setStepIndex] = useState(user?.quizAnswers?.level ? 1 : 0);
  const [isLoading, setIsLoading] = useState(false);
  const questions = quizzes["main"];
  const currentQuestion = questions[stepIndex];
  const Component = QuestionToComp[currentQuestion.type as string];

  const handleSelection = (answers: string, nextQuestion?: string) => {
    setUser((prev) => ({
      ...prev,
      quizAnswers: { ...prev.quizAnswers, [currentQuestion.key]: answers },
    }));

    trackQuizAnswer(currentQuestion.key, answers);

    if (nextQuestion) {
      let currentStepIndex = stepIndex + 1;
      const otherQuestions = questions.slice(currentStepIndex);
      const nextQuestionIndex = otherQuestions.findIndex(
        (q) => q.key === nextQuestion
      );

      setStepIndex(nextQuestionIndex + currentStepIndex);
    } else {
      if (stepIndex + 1 < questions.length) {
        setStepIndex(
          stepIndex + (currentQuestion.key === "which_tracking_tools" ? 2 : 1)
        );
      } else {
        setIsLoading(true);
      }
    }
  };

  useEffect(() => {
    return () => {
      setUser((prev) => ({ ...prev, quizAnswers: {} }));
    };
  }, [setUser]);

  return isLoading ? (
    <QuizLoader onFinish={() => navigate(LinkList.Email)} />
  ) : (
    <>
      <QuizProgressHeader
        totalNumber={questions.length}
        currentStep={stepIndex + 1}
      />
      <GreyBG>
        {Component && (
          <Component
            key={currentQuestion.key}
            question={currentQuestion}
            onSelect={handleSelection}
          />
        )}
      </GreyBG>
    </>
  );
};

export default Quiz;

const GreyBG = styled.div`
  display: flex;
  align-items: center;
  min-height: calc(100vh - 90px);
  background: ${theme.colors.grey};

  @media (max-width: 440px) {
    display: block;
    min-height: calc(100vh - 4.5rem);
    align-items: baseline;
  }
`;
