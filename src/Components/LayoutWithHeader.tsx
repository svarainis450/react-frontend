import { FC, memo } from 'react';
import { HeaderWithLogo } from './';
import { LayoutProps } from './Pages/Layout/Layout';

export const LayoutWithHeader: FC<LayoutProps & { onClick?: () => void }> =
  memo(({ onClick, children }) => (
    <>
      <HeaderWithLogo onClick={onClick} />
      {children}
    </>
  ));

LayoutWithHeader.displayName = 'LayoutWithHeader';
