import { FC, memo } from 'react';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'src/hooks';
import { LinkList } from 'src/types';
import styled from 'styled-components';

import { theme } from '../theme';
import { Logo, Container, Flex } from './';

interface HeaderWithLogoProps {
  onClick?: () => void;
  showLoginOption?: boolean;
}

export const HeaderWithLogo: FC<HeaderWithLogoProps> = memo(
  ({ onClick, showLoginOption = false }) => {
    const { isTablet } = useMediaQuery();
    return (
      <Background showLoginOption={showLoginOption}>
        <Logo onClick={onClick} />
        {showLoginOption && (
          <Flex>
            {!isTablet && (
              <AlreadyAccount>Already have Potato account?</AlreadyAccount>
            )}
            <LinkStyled to={LinkList.Login}>Log in</LinkStyled>
          </Flex>
        )}
      </Background>
    );
  }
);

HeaderWithLogo.displayName = 'HeaderWithLogo';

const Background = styled(Container)<{ showLoginOption?: boolean }>`
  display: ${({ showLoginOption }) => (showLoginOption ? 'flex' : 'block')};
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 1.2rem;
  max-width: 1300px;
  background: ${theme.colors.white};

  @media (max-width: ${theme.breakpoints.mobile}px) {
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;

    & > img {
      margin: ${({ showLoginOption }) => (showLoginOption ? '0' : 'auto')};
    }
  }
`;

const AlreadyAccount = styled.p`
  margin-right: 6px;

  color: #88898c;
  font-weight: 400;
  font-size: 0.875rem;
`;

const LinkStyled = styled(Link)`
  color: #2842ea;
  font-weight: 500;
  font-size: 0.875rem;
`;
