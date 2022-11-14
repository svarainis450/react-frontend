import styled from "styled-components";
import { Container } from "src/Components";
import { Button } from "src/Components/Global/Button";
import { Link } from "react-router-dom";
import { LinkList } from "src/types";
import { useMediaQuery } from "src/hooks";

import HandPhone from "src/Assets/images/landing/hand_with_phone_desktop.png";
import HandPhoneMobile from "src/Assets/images/landing/hand_with_phone.png";

export const QuizSection = () => {
  const { isMobile } = useMediaQuery();
  return (
    <IMGBg>
      <Container isPage>
        <Wrapper>
          <Title>Start your journey today</Title>
          <Description>
            Take a free, 1-minute quiz created by experts to find which Potato
            program is best-fitting for you.
          </Description>
          {isMobile ? <Img src={HandPhoneMobile} /> : null}
          <Link to={LinkList.Quiz}>
            <ButtonStyled>Take a quiz</ButtonStyled>
          </Link>
        </Wrapper>
      </Container>
    </IMGBg>
  );
};

const IMGBg = styled.div`
  padding: 24rem 0;
  background: url(${HandPhone});
  background-size: 100% auto;
  background-position: center;
  background-repeat: no-repeat;

  @media (max-width: 440px) {
    padding: 2.5rem 0;
    background: #efebe7;
  }
`;

const Wrapper = styled.div`
  max-width: 23.75rem;

  @media (max-width: 440px) {
    max-width: none;
  }
`;

const Title = styled.h2`
  font-size: 30px;
  line-height: 36px;
  margin-bottom: 0.75rem;
  font-weight: 500;
  margin-top: 0;

  @media (max-width: 440px) {
    text-align: center;
    font-size: 24px;
    line-height: 29px;
  }
`;

const Description = styled.p`
  margin-bottom: 2.875rem;
  line-height: 24px;
  color: #171a1f;

  @media (max-width: 440px) {
    text-align: center;
    margin-bottom: 1rem;
  }
`;

const ButtonStyled = styled(Button)`
  min-width: 12rem;

  @media (max-width: 440px) {
    width: 100%;
  }
`;

const Img = styled.img`
  display: block;
  width: 110%;
  margin: 0 -6% 1rem -2%;
`;
