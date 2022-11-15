import styled from 'styled-components';

import { theme } from '../../theme';

export const FormWrapper = styled.div`
  padding-top: 3rem;
  width: 22rem;
  margin: auto;

  @media (max-width: ${theme.breakpoints.mobile}px) {
    width: 100%;
    padding: 3rem 1rem 0;
  }
`;
