import { theme } from "src/theme";
import styled from "styled-components";
import { Container } from "../wrappers/Container";
import { Flex } from "../wrappers/Flex";
import { useMediaQuery } from "src/hooks";

import phoneSliderImg2 from "src/Assets/images/phoneSlider/phoneSliderImg2.png";
import AppleStoreBadge from "src/Assets/images/apple_store_badge.png";
import ProductHunt from "src/Assets/images/product_hunt.png";
import { PlanCard } from "../elements/PlanCard";
import { SelectedPlan } from "src/state/reduxstate/user/types";
import { useState, useRef, useContext, FC } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LinkList } from "src/types";
import { Button } from "../Global/Button";

import SecureIcons from "src/Assets/images/secure_image.png";
import Review1 from "src/Assets/images/reviews/review_1.png";
import Review2 from "src/Assets/images/reviews/review_2.png";
import Review3 from "src/Assets/images/reviews/review_3.png";

import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { UserContext } from "src/state/userContext";
import { PlanCardFull } from "../elements/PlanCardFull";

export const QuizCheckoutHero: FC<{
  products: Record<3 | 6 | 12, SelectedPlan>;
}> = ({ products }) => {
  const [selected, setSelected] = useState<3 | 6 | 12>(12);
  const checkboxRef = useRef<null | HTMLInputElement>(null);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();
  const { isMobile } = useMediaQuery();
  const { setUser } = useContext(UserContext);
  const { pathname } = useLocation();
  const CardComponent =
    pathname === "/quiz-checkout/4" ? PlanCardFull : PlanCard;

  const handlePlanSelection = (plan: 3 | 6 | 12) => {
    setSelected(plan);
  };

  const handleButtonSubmit = () => {
    const checked = checkboxRef?.current?.checked;
    setIsError(!checked);

    if (checked) {
      setUser((prev) => ({ ...prev, selectedPlan: products[selected] }));
      navigate(LinkList.Checkout);
    }
  };

  return (
    <Background>
      <Container isPage>
        <Heading>
          Don't miss the train. Discover the next <b>Bitcoin</b> or{" "}
          <b>Dogecoin</b> early.
        </Heading>
        <Description>
          The most popular crypto analytics platform!{isMobile ? <br /> : " "}
          Over <b>270 000</b> plans ordered.
        </Description>
        <Flex
          justifyContent="space-between"
          margin={isMobile ? "0 0 3.75rem" : "0 0 5.625rem 0"}
          flexDirection={isMobile ? "column-reverse" : "row"}
          alignItems="center"
        >
          <PricingWrapper id="checkout__plan-selection">
            <CardComponent
              product={products[3]}
              isSelected={selected === 3}
              onClick={() => handlePlanSelection(3)}
            />
            <CardComponent
              product={products[12]}
              isSelected={selected === 12}
              isMostPopular={true}
              onClick={() => handlePlanSelection(12)}
            />
            <CardComponent
              product={products[6]}
              isSelected={selected === 6}
              onClick={() => handlePlanSelection(6)}
            />
            <Label isError={isError}>
              <Checkbox ref={checkboxRef} type="checkbox" /> I agree to the{" "}
              <Link to={LinkList.TermsAndConditions}>T&C</Link> and{" "}
              <Link to={LinkList.PrivacyPolicy}>Privacy policy</Link>
            </Label>
            <ButtonStyled onClick={handleButtonSubmit}>
              Receive my plan
            </ButtonStyled>
            <SecureIconsImg src={SecureIcons} alt="" />
          </PricingWrapper>
          <Img src={phoneSliderImg2} alt="" />
        </Flex>
        <Badge src={AppleStoreBadge} alt="" />
        <a
          href="https://www.producthunt.com/products/potato-2#potato-4"
          target="_blank"
        >
          <ProductHuntBadge src={ProductHunt} alt="" />
        </a>
        <Swiper modules={[Pagination]} pagination={isMobile} loop={isMobile}>
          {isMobile ? (
            <>
              <SwiperSlide>
                <Review src={Review1} alt="" />
              </SwiperSlide>
              <SwiperSlide>
                <Review src={Review2} alt="" />
              </SwiperSlide>
              <SwiperSlide>
                <Review src={Review3} alt="" />
              </SwiperSlide>
            </>
          ) : (
            <SwiperSlide>
              <Grid>
                <Review src={Review1} alt="" />
                <Review src={Review2} alt="" />
                <Review src={Review3} alt="" />
              </Grid>
            </SwiperSlide>
          )}
        </Swiper>
      </Container>
    </Background>
  );
};

const Background = styled.div`
  padding-top: 3.125rem;
  padding-bottom: 5rem;
  background: ${theme.colors.grey};

  @media (max-width: ${theme.breakpoints.mobile}px) {
    padding-top: 2rem;
    padding-bottom: 2rem;

    .swiper {
      padding-bottom: 2rem;
    }

    .swiper-pagination {
      bottom: 0px;
      height: 12px;
      display: flex;
      align-items: center;
      justify-content: center;

      @media (min-width: 1024px) {
        display: none;
      }
    }

    .swiper-pagination-bullet {
      background: #000000;
      opacity: 1;
    }

    .swiper-pagination-bullet-active {
      background: ${theme.colors.grey};
      border: 1px solid #000000;
      width: 10px;
      height: 10px;
    }
  }
`;

const Heading = styled.h1`
  max-width: 30rem;
  font-size: 1.875rem;
  font-weight: 500;
  margin: 0 auto 1.5rem auto;
  text-align: center;
  line-height: 36px;
  letter-spacing: -0.02em;
  color: #111111;

  @media (max-width: ${theme.breakpoints.mobile}px) {
    margin-bottom: 0.625rem;
    font-size: 1.5rem;
    line-height: 29px;
  }
`;

const Description = styled.p`
  text-align: center;
  color: #727477;
  font-weight: 400;
  font-size: 14px;
  margin-bottom: 3rem;

  @media (max-width: ${theme.breakpoints.mobile}px) {
    margin-bottom: 1.5rem;
  }
`;

const Img = styled.img`
  display: block;
  width: 58%;

  @media (max-width: ${theme.breakpoints.mobile}px) {
    width: 98%;

    margin: 0 auto 1.5rem auto;
  }
`;

const Badge = styled.img`
  display: block;
  max-width: 24rem;
  width: 100%;
  height: auto;
  margin: 0 auto 2rem auto;

  @media (max-width: ${theme.breakpoints.mobile}px) {
    margin: 0 auto 1.5rem auto;
  }
`;

const ProductHuntBadge = styled.img`
  display: block;
  max-width: 15.625rem;
  height: auto;
  margin: 0 auto 3.75rem auto;

  @media (max-width: ${theme.breakpoints.mobile}px) {
    margin: 0 auto 1.5rem auto;
  }
`;

const PricingWrapper = styled.div`
  max-width: 23rem;
  width: 100%;
`;

const Label = styled.label<{ isError: boolean }>`
  font-size: 14px;
  line-height: 24px;
  color: ${({ isError }) => (isError ? theme.colors.red : theme.colors.black)};

  a {
    text-decoration: underline;
    color: inherit;
  }
`;

const ButtonStyled = styled(Button)`
  margin-top: 0.75rem;
  margin-bottom: 1rem;
  width: 100%;
  font-weight: 500;
`;

const SecureIconsImg = styled.img`
  display: block;
  max-width: 12.5rem;
  margin: auto;
`;

const Checkbox = styled.input`
  margin-right: 0.5rem;
`;

const Review = styled.img`
  display: block;
  width: 100%;
`;

const Grid = styled.div`
  display: grid;
  grid-gap: 4.375rem;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
`;
