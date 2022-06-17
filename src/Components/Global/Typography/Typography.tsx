import classNames from 'classnames';

import { TypographyVariant, TypographyWeight, TypographyProps } from './types';

import './Typography.scss';

export const Typography = ({
  className,
  children,
  variant = TypographyVariant.DEFAULT,
  weight = TypographyWeight.REGULAR,
}: TypographyProps) => {
  return (
    <p
      className={classNames(
        'Typography',
        className,
        `Typography--${variant}`,
        `Typography--${weight}`
      )}
    >
      {children}
    </p>
  );
};
