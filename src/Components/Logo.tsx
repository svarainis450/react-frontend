import styled from 'styled-components';
import { theme } from '../theme';
import { images } from '../utils/images';

export const Logo = styled.img.attrs({ src: images.logo, alt: 'Potato logo' })`
  display: block;
  height: 2.625rem;

  @media (max-width: ${theme.breakpoints.mobile}px) {
    height: 2.5rem;
  }
`;
