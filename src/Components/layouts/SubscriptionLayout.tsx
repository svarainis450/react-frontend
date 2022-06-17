import { FC, memo, ReactNode } from 'react';
import styled from 'styled-components';

import { theme } from '../../theme';
import { icons } from '../../utils/icons';
import { Flex } from '../wrappers/Flex';
import { FormWrapper } from '../wrappers/FormWrapper';
import { SubscriptionOptions } from './SubscriptionOptions';

interface SubscriptionLayoutProps {
  children?: ReactNode;
  onBack: () => void;
}

export const SubscriptionLayout: FC<SubscriptionLayoutProps> = memo(
  ({ children, onBack }) => {
    return (
      <Background alignItems="center" flexDirection="column">
        <CloseButtonPosition onClick={onBack}>
          <img src={icons.back} alt="Close" />
        </CloseButtonPosition>
        <FormWrapper>
          <SubscriptionOptions />
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
  margin-bottom: 1.5rem;
`;
