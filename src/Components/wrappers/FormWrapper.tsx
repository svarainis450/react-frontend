import styled from 'styled-components';

import { theme } from '../../theme';

export const FormWrapper = styled.div`
  width: 28rem;
  margin: auto;

  @media (max-width: ${theme.breakpoints.mobile}px) {
    width: auto;
    padding: 0 4%;
  }
`;
