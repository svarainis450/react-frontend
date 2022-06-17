export interface TypographyProps {
  className?: string;
  children: string | React.ReactElement;
  variant?: TypographyVariant,
  weight?: TypographyWeight,
}

export enum TypographyVariant {
  HEADING_MAX = 'heading-max',
  HEADING_LARGE = 'heading-large',
  HEADING_SMALL = 'heading-small',
  SUBHEADING = 'subheading',
  DEFAULT = 'default',
  TEXT_SMALL = 'text-small',
  TEXT_DETAIL = 'text-detail',
}

export enum TypographyWeight {
  THIN = 'thin',
  REGULAR = 'regular',
  MEDIUM = 'medium',
  BOLD = 'bold'
}