import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Input, Logo } from "src/Components";
import { Button } from "src/Components/Global/Button";
import { theme } from "src/theme";
import { LinkList } from "src/types";
import styled from "styled-components";

const Email = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    navigate(LinkList.QuizCheckout);
  };

  return (
    <Background>
      <Container>
        <LogoPosition>
          <Logo />
        </LogoPosition>
        <Wrapper>
          <Title>How can we reach you?</Title>
          <Regular>
            Enter your email address below to receive your guide
          </Regular>
          <Form onSubmit={handleSubmit}>
            <Input
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
            />
            <Label>
              <Checkbox type="checkbox" required />
              By clicking “Show my plan”, you agree to get future information
              about your plan from us
            </Label>
            <ButtonStyled type="submit">Show my plan</ButtonStyled>
            <Disclaimer>
              NOTE: We don't send spam or share email addresses. We respect your
              privacy.
            </Disclaimer>
          </Form>
        </Wrapper>
      </Container>
    </Background>
  );
};

export default Email;

const Background = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  min-height: 100vh;
  background: ${theme.colors.grey};

  ${Logo} {
    @media (max-width: 440px) {
      ${Logo} {
        margin: auto;
      }
    }
  }
`;

const LogoPosition = styled(Container).attrs({ isPage: true })`
  position: absolute;
  top: 1.5rem;
  left: 0;
  right: 0;
  margin: auto;
`;

const Wrapper = styled.div`
  padding: 2rem 0;
  max-width: 40rem;
  margin: auto;

  @media (max-width: 440px) {
    padding: 2rem 4% 2rem 4%;
  }
`;

const Title = styled.h1`
  font-size: 30px;
  text-align: center;
  margin-bottom: 1rem;
`;

const Regular = styled.p`
  text-align: center;
  color: #88898c;
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  font-size: 12px;
  margin-top: 1rem;
  margin-bottom: 1.5rem;
`;

const Checkbox = styled.input`
  margin-right: 0.5rem;
`;

const Form = styled.form`
  max-width: 24rem;
  margin: auto;
`;

const ButtonStyled = styled(Button)`
  min-width: 12rem;
  margin: 0 auto 3.5rem auto;
`;

const Disclaimer = styled.p`
  text-align: center;
  font-size: 12px;
  color: #0022ff;
`;
