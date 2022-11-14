import { FC, memo, useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../../state/userContext";

import { theme } from "../../theme";
import { Box } from "../wrappers/Box";
import { Flex } from "../wrappers/Flex";
import { useMoney } from "src/hooks";

interface OrderSummaryProps {
  hideTitle?: boolean;
}

export const OrderSummary: FC<OrderSummaryProps> = memo(
  ({ hideTitle = false }) => {
    const { user } = useContext(UserContext);
    const hasAcceptedDownsell = user.hasDownsell;
    const selectedPlan = user.selectedPlan;
    const { getFormatedPrice } = useMoney();

    if (!selectedPlan) return null;

    let finalPrice =
      hasAcceptedDownsell && selectedPlan.downsell?.final_price
        ? selectedPlan.downsell?.final_price
        : selectedPlan.final_price || 0;
    let discount = selectedPlan.price
      ? selectedPlan.final_price - selectedPlan.price
      : 0;

    return (
      <>
        {!hideTitle && (
          <Subtitle margin="2rem 0 0.625rem 0">Order Summary</Subtitle>
        )}
        <Line margin="0 0 0.875rem 0" />

        <Background>
          <Row margin="0 0 1rem 0">
            <Regular>Subtotal:</Regular>
            <Regular>
              {getFormatedPrice(selectedPlan.price || selectedPlan.final_price)}
            </Regular>
          </Row>
          {discount ? (
            <Row margin="0 0 1rem 0">
              <Regular color={theme.colors.red}>Discount:</Regular>
              <Regular color={theme.colors.red}>
                {getFormatedPrice(discount)}
              </Regular>
            </Row>
          ) : null}
          {hasAcceptedDownsell ? (
            <Row margin="0 0 1rem 0">
              <Regular color={theme.colors.red}>Additional discount: </Regular>
              <Regular color={theme.colors.red}>
                {getFormatedPrice(
                  (selectedPlan.downsell?.final_price || 0) -
                    (selectedPlan.downsell?.price || 0)
                )}
              </Regular>
            </Row>
          ) : null}

          <Row>
            <Regular>Billed now:</Regular>
            <Regular>{getFormatedPrice(finalPrice)}</Regular>
          </Row>
        </Background>
      </>
    );
  }
);

OrderSummary.displayName = "OrderSummary";

const Background = styled.div`
  padding: 1.5rem 0;
  border-radius: 0.25rem;
`;

// @TODO: move to Typography component
const Subtitle = styled(Box).attrs({ as: "p" })`
  font-size: 1.25rem;
  text-align: center;
  font-weight: 500;
`;

const Row = styled(Flex).attrs({
  alignItems: "center",
  justifyContent: "space-between",
})``;

const Regular = styled.p<{ color?: string }>`
  font-size: 1rem;
  color: ${({ color }) => color || "inherit"};
`;

const Line = styled(Box)`
  padding: 0 1.75rem;
  display: block;
  border-top: 1px solid ${theme.colors.greyDark};
`;
