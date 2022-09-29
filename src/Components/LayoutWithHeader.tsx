import { FC, memo } from 'react';
import { HeaderWithLogo } from './';
import { LayoutProps } from './Pages/Layout/Layout';

export const LayoutWithHeader: FC<
  LayoutProps & { onClick?: () => void; showLoginOption?: boolean }
> = memo(({ onClick, children, showLoginOption }) => (
  <>
    <HeaderWithLogo onClick={onClick} showLoginOption={showLoginOption} />
    {children}
  </>
));

LayoutWithHeader.displayName = 'LayoutWithHeader';
