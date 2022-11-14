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

export const PlanCard: FC<PlanCardProps> = ({
  product,
  isSelected,
  isMostPopular,
  ...restProps
}) => {
  const { getFormatedPrice, getPricePerMonth } = useMoney();
  const { pathname } = useLocation();

  const renderPriceCalculationBlock = () => {
    return pathname === "/quiz-checkout/2" ? (
      <div style={{ textAlign: "center" }}>
        <PreviousPrice>
          {getFormatedPrice(
            getPricePerMonth(
              product.price || 0,
              product.subscription_period || 0
            ) / 30
          )}
        </PreviousPrice>
        <Price>
          {getFormatedPrice(
            getPricePerMonth(
              product.final_price,
              product.subscription_period || 0
            ) / 30
          )}
        </Price>
        <Small>per day</Small>
      </div>
    ) : (
      <div style={{ textAlign: "center" }}>
        <PreviousPrice>
          {getFormatedPrice(
            getPricePerMonth(
              product.price || 0,
              product.subscription_period || 0
            )
          )}
        </PreviousPrice>
        <Price>
          {getFormatedPrice(
            getPricePerMonth(
              product.final_price,
              product.subscription_period || 0
            )
          )}
        </Price>
        <Small>per month</Small>
      </div>
    );
  };

  return (
    <Background
      alignItems="center"
      justifyContent="center"
      isSelected={isSelected}
      {...restProps}
    >
      <Img src={isSelected ? circle_checked : circle} alt="" />
      <div>
        <Title>{product.title}</Title>
        <Small>Billed every {product.subscription_period} months</Small>
      </div>
      <Line />
      {renderPriceCalculationBlock()}
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
  padding: 1.5rem;
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
  font-weight: 700;
  font-size: 18px;
`;

const Small = styled.p`
  font-weight: 400;
  font-size: 12px;
`;

const Line = styled.div`
  height: 3.75rem;
  width: 0.5px;
  margin: 0 1rem;
  background: #000000;
`;

const PreviousPrice = styled.p`
  text-align: center;
  margin-bottom: 4px;
  font-size: 14px;
  letter-spacing: -0.02em;
  text-decoration: line-through;

  color: #fa5000;
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
  margin-right: 1rem;
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
