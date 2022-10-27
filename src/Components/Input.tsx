import { FC, InputHTMLAttributes } from 'react';
import styled from 'styled-components';
import { theme } from '../theme';

import { Box, BoxProps } from './wrappers/Box';

type InputProps = { error?: string } & BoxProps &
  InputHTMLAttributes<HTMLInputElement>;

export const Input: FC<InputProps> = ({
  margin,
  padding,
  error,
  className,
  min,
  max,
  type,
  ...inputProps
}) => (
  <Box margin={margin} padding={padding} className={className}>
    <InputComponent min={min} max={max} type={type} {...inputProps} />
    {error ? <Small>{error}</Small> : null}
  </Box>
);

const InputComponent = styled.input<InputHTMLAttributes<HTMLInputElement>>`
  display: block;
  width: 100%;
  padding: 1.25rem;
  font-size: 0.875rem;
  border: none;
  outline: none;
`;

const Small = styled.p`
  margin-top: 0.625rem;
  font-size: 0.875rem;
  color: ${theme.colors.red};
  text-align: center;
`;
