import { ReactNode } from 'react';

export interface TypographyProps {
  className?: string;
  children: ReactNode | ReactNode[];
  variant?: TypographyVariant;
  weight?: TypographyWeight;
  onClick?: () => void;
}

export enum TypographyVariant {
  HEADING_MAX = 'heading-max',
  HEADING_LARGE = 'heading-large',
  HEADING_SMALL = 'heading-small',
  SUBHEADING = 'subheading',
  DEFAULT = 'default',
  TEXT_SMALL = 'text-small',
  TEXT_DETAIL = 'text-detail',
  CAPTION = 'caption',
}

export enum TypographyWeight {
  THIN = 'thin',
  REGULAR = 'regular',
  MEDIUM = 'medium',
  BOLD = 'bold',
  BOLD700 = 'bold700',
}
