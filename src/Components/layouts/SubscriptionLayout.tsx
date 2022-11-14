import { FC, memo, ReactNode, useContext } from "react";
import { UserContext } from "src/state/userContext";
import styled from "styled-components";

import { theme } from "../../theme";
import { icons } from "../../utils/icons";
import { Flex } from "../wrappers/Flex";
import { FormWrapper } from "../wrappers/FormWrapper";
import { SubscriptionOptions } from "./SubscriptionOptions";

interface SubscriptionLayoutProps {
  children?: ReactNode;
  onBack: () => void;
}

export const SubscriptionLayout: FC<SubscriptionLayoutProps> = memo(
  ({ children, onBack }) => {
    const { user } = useContext(UserContext);

    return (
      <Background alignItems="center" flexDirection="column">
        <CloseButtonPosition onClick={onBack}>
          <img src={icons.back} alt="Close" />
        </CloseButtonPosition>
        <FormWrapper>
          {user.selectedPlan?.togglePayment ? <SubscriptionOptions /> : null}
          {children}
        </FormWrapper>
      </Background>
    );
  }
);

const Background = styled(Flex)`
  background: ${theme.colors.grey};
  overflow: auto;
`;

const CloseButtonPosition = styled.div`
  display: block;
  width: 100%;
`;
