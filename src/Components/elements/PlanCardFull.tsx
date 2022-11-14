import { BaseHTMLAttributes, FC } from "react";
import { SelectedPlan } from "src/state/reduxstate/user/types";
import { theme } from "src/theme";
import styled from "styled-components";
import { Flex } from "../wrappers/Flex";

import circle from "src/Assets/icons/circle.svg";
import circle_checked from "src/Assets/icons/circle_checked.svg";
import { useMoney } from "src/hooks";
import { useLocation } from "react-router-dom";

interface PlanCardProps extends BaseHTMLAttributes<HTMLDivElement> {
  product: SelectedPlan;
  isSelected?: boolean;
  isMostPopular?: boolean;
}

export const PlanCardFull: FC<PlanCardProps> = ({
  product,
  isSelected,
  isMostPopular,
  ...restProps
}) => {
  const { getFormatedPrice, getPricePerMonth } = useMoney();

  return (
    <Background
      alignItems="center"
      justifyContent="center"
      isSelected={isSelected}
      {...restProps}
    >
      <Img src={isSelected ? circle_checked : circle} alt="" />
      <div style={{ textAlign: "center" }}>
        <Title>{product.title}</Title>
        <Small fontSize={9}>
          <span>{getFormatedPrice(product.price || 0)}</span>{" "}
          {getFormatedPrice(product.final_price)} billed every{" "}
          {product.subscription_period} months
        </Small>
      </div>
      <Line />
      <div style={{ textAlign: "center" }}>
        <Price>
          {getFormatedPrice(
            getPricePerMonth(
              product.final_price,
              product.subscription_period || 0
            ) / 4
          )}
        </Price>
        <Small>per week</Small>
      </div>
      {isMostPopular && (
        <MostPopularBanner>
          Best Value - <b>save 75%</b>
        </MostPopularBanner>
      )}
    </Background>
  );
};

const Background = styled(Flex)<{ isSelected?: boolean }>`
  position: relative;
  padding: 1rem;
  margin-bottom: 1rem;
  width: 100%;
  background: ${theme.colors.white};
  border-radius: 1rem;
  border: 2px solid ${theme.colors.white};
  cursor: pointer;

  ${({ isSelected }) =>
    isSelected &&
    `
  border: 2px solid #0022FF;
  background: linear-gradient(0deg, rgba(0, 34, 255, 0.1), rgba(0, 34, 255, 0.1)), #FFFFFF;
 `}
`;

const Title = styled.span`
  display: block;
  font-weight: 700;
  font-size: 18px;
  margin-bottom: 0.25rem;
`;

const Small = styled.p<{ fontSize?: number }>`
  font-weight: 400;
  font-size: ${({ fontSize }) => `${fontSize || 12}px`};

  span {
    color: ${theme.colors.red};
    text-decoration: line-through;
  }
`;

const Line = styled.div`
  height: 3.75rem;
  width: 0.5px;
  margin: 0 0.75rem;
  background: #000000;
`;

const Price = styled.p`
  font-weight: 900;
  font-size: 30px;
  line-height: 32px;
  letter-spacing: -0.02em;
`;

const Img = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 0.25rem;
`;

const MostPopularBanner = styled.div`
  position: absolute;
  top: -10px;
  padding: 0.25rem 2rem;
  background: #0022ff;
  font-size: 10px;
  line-height: 12px;
  color: ${theme.colors.white};
  border-radius: 0.75rem;
`;
