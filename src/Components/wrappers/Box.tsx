import styled from 'styled-components';

export interface BoxProps {
  margin?: string;
  padding?: string;
}

export const Box = styled.div<BoxProps>`
  margin: ${({ margin }) => margin};
  padding: ${({ padding }) => padding};
`;
