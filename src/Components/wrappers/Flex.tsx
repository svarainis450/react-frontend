import styled from 'styled-components';
import { Box, BoxProps } from './Box';

interface FlexProps extends BoxProps {
  alignItems?: string;
  justifyContent?: string;
  flexDirection?: string;
}

export const Flex = styled(Box)<FlexProps>`
  display: flex;
  align-items: ${({ alignItems }) => alignItems};
  justify-content: ${({ justifyContent }) => justifyContent};
  flex-direction: ${({ flexDirection }) => flexDirection};
`;
