import styled from 'styled-components';

export const Container = styled.div<{ isPage?: boolean; position?: string }>`
  position: ${({ position }) => (position ? position : 'static')};
  max-width: 65.625rem;
  padding-left: 4%;
  padding-right: 4%;
  margin: auto;

  ${({ isPage }) =>
    isPage &&
    `
    max-width: calc(72.5rem + 12%);
    padding-left: 6%;
  padding-right: 6%;
  `}
`;
