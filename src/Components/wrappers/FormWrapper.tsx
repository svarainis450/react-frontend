import styled from 'styled-components';

import { theme } from '../../theme';

export const FormWrapper = styled.div`
  padding-top: 4rem;
  width: 22rem;
  margin: auto;

  @media (max-width: ${theme.breakpoints.mobile}px) {
    width: auto;
    padding: 3rem 4% 0;
  }
`;
