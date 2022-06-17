import { FC, memo } from 'react';
import styled from 'styled-components';

import { theme } from '../theme';
import { Logo, Container } from './';

interface HeaderWithLogoProps {
  onClick?: () => void;
}

export const HeaderWithLogo: FC<HeaderWithLogoProps> = memo(({ onClick }) => {
  return (
    <Background>
      <Logo onClick={onClick} />
    </Background>
  );
});

HeaderWithLogo.displayName = 'HeaderWithLogo';

const Background = styled(Container)`
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  background: ${theme.colors.white};

  @media (max-width: ${theme.breakpoints.mobile}px) {
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;

    & > img {
      margin: auto;
    }
  }
`;
