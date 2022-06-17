import classnames from 'classnames';

import { ButtonProps } from './types';

import './Button.scss';

export const Button = ({
  buttonType = 'dark',
  textWeight = 'thin',
  children,
  className,
  disabled,
  onClick,
  ...rest
}: ButtonProps) => {
  return (
    <button
      className={classnames(
        'Button',
        `Button__${buttonType}`,
        `Button__${textWeight}`,
        className
      )}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};
