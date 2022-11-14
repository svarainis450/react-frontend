import { FC, memo, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useFunnel, useMediaQuery } from "../../hooks";
import { UserContext } from "../../state/userContext";
import { theme } from "../../theme";
import { priceOptions } from "../Global/PaymentOptions";

import { Box } from "../wrappers/Box";
import { Flex } from "../wrappers/Flex";
import { useCookies } from "react-cookie";
import { PRICE_OPTIONS_BIGGER } from "../Global/PaymentOptions/constants";

export const SubscriptionOptions: FC = memo(() => {
  const { isMobile } = useMediaQuery();
  const { user, setUser } = useContext(UserContext);
  const selectedPlan = user.selectedPlan;
  const hasDownsell = user.hasDownsell;
  const [selectedPeriod, setSelectedPeriod] = useState(
    selectedPlan?.subscription_period === 12 ? "yearly" : "monthly"
  );
  const [getCookie] = useCookies(["currency", "currencySymbol"]);
  const { funnel } = useFunnel();
  const PRODUCTS = funnel === 5 ? PRICE_OPTIONS_BIGGER : priceOptions;

  const handlePlanSelection = (plan: "yearly" | "monthly") => {
    setSelectedPeriod(plan);
    const foundNewPlan = PRODUCTS[plan].find(
      (p) => p.title === selectedPlan?.title
    );
    setUser((prev) => ({ ...prev, selectedPlan: foundNewPlan }));
  };

  return (
    <>
      <Title margin={isMobile ? "0 0 1.25rem 0" : "0 0 3.25rem 0"}>
        Subscribe to {selectedPlan?.title}
      </Title>
      <Flex
        margin={isMobile ? "0 0 2.875rem 0" : "0 0 2.5rem 0"}
        flexDirection={isMobile ? "column" : "row"}
      >
        <OptionCard
          isSelected={selectedPeriod === "monthly"}
          onClick={() => handlePlanSelection("monthly")}
        >
          <div>
            <Caption>Bill monthly</Caption>
            <Small>
              {getCookie.currencySymbol}
              {PRODUCTS["monthly"].find((p) => p.title === selectedPlan?.title)
                ?.final_price || 0}
              /month
            </Small>
          </div>
          <Circle isSelected={selectedPeriod === "monthly"} />
        </OptionCard>
        <OptionCard
          isSelected={selectedPeriod === "yearly"}
          onClick={() => handlePlanSelection("yearly")}
        >
          <div>
            <Flex alignItems="flex-start">
              <Caption margin="0 0.375rem 0 0">Bill yearly</Caption>
              <Discount>
                {
                  PRODUCTS["yearly"].find(
                    (p) => p.title === selectedPlan?.title
                  )?.discount
                }
                %
              </Discount>
            </Flex>
            <Small>
              {getCookie.currencySymbol}
              {(PRODUCTS["yearly"].find((p) => p.title === selectedPlan?.title)
                ?.final_price || 0) / 12}
              /month
            </Small>
          </div>
          <Circle isSelected={selectedPeriod === "yearly"} />
        </OptionCard>
      </Flex>
    </>
  );
});

// @TODO: move to Typography component
const Title = styled(Box).attrs({ as: "h2" })`
  font-size: 1.875rem;
  text-align: center;

  @media (max-width: ${theme.breakpoints.mobile}px) {
    font-size: 1.5rem;
  }
`;

const OptionCard = styled(Flex).attrs({
  alignItems: "baseline",
  justifyContent: "space-between",
})<{ isSelected?: boolean }>`
  flex: 1;
  padding: 0.625rem 0.9rem;
  background: ${({ isSelected }) =>
    isSelected ? "rgba(43, 89, 209, 0.1);" : theme.colors.white};
  border: 1.5px solid
    ${({ isSelected }) =>
      isSelected ? theme.colors.potatoBlue : theme.colors.white};
  cursor: pointer;

  &:first-of-type {
    margin-right: 0.75rem;

    @media (max-width: ${theme.breakpoints.mobile}px) {
      margin: 0 0 1rem 0;
    }
  }

  &:last-of-type {
    margin-left: 0.75rem;

    @media (max-width: ${theme.breakpoints.mobile}px) {
      margin: 0;
    }
  }
`;

// @TODO: move to Typography component
const Caption = styled(Box).attrs({ as: "p" })`
  margin-bottom: 0.25rem;
  font-size: 1rem;
  letter-spacing: -0.02rem;
`;

// @TODO: move to Typography component
const Small = styled(Box).attrs({ as: "p" })`
  font-size: 0.75rem;
  color: ${theme.colors.greyDark};
`;

// @TODO: move to Typography component
const Discount = styled.span`
  padding: 0.125rem;
  font-size: 0.75rem;
  color: ${theme.colors.white};
  background: ${theme.colors.black};
  border-radius: 0.75rem;
`;

const Circle = styled.div<{ isSelected?: boolean }>`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: ${({ isSelected }) =>
    isSelected ? theme.colors.potatoBlue : "#f4f4f4"};
  box-shadow: ${({ isSelected }) =>
    isSelected ? "0px 2px 2px rgba(0, 0, 0, 0.1)" : ""};
`;
