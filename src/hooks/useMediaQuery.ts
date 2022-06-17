import {useMediaQuery as useQuery} from '@mui/material';
import { theme } from '../theme';

export const useMediaQuery = () => ({
  isMobile: useQuery(`(max-width: ${theme.breakpoints.mobile}px)`),
  isTablet: useQuery(`(max-width: ${theme.breakpoints.tablet}px)`),
  isDesktop: useQuery(`(max-width: ${theme.breakpoints.desktop}px)`),
});