import { useContext, useState } from 'react';
import classNames from 'classnames';

import { LoggedInLayoutProps } from './types';
import { UserInfoContext } from 'src/state/UserInfoContextProvider';
import { Navigate } from 'react-router-dom';
import { LinkList } from 'src/types';
import { HeaderUser } from 'src/Components/Global/HeaderUser';
import { FooterUser } from 'src/Components/Global/FooterUser';
import { UserSideMenu } from 'src/Components/Global/UserSideMenu';

import './LoggedInLayout.scss';

export const LoggedInLayout = ({
  children,
  activeLink,
}: LoggedInLayoutProps) => {
  const [mainNavActive, setMainNavActive] = useState<boolean>(false);
  const { isLoggedIn } = useContext(UserInfoContext);

  if (!isLoggedIn) {
    <Navigate replace to={LinkList.Login} />;
  }

  return (
    <div className={classNames('LoggedInLayout')}>
      <UserSideMenu
        activeLink={activeLink}
        isActive={mainNavActive}
        isActiveToggler={setMainNavActive}
      />
      <HeaderUser
        activeLink={activeLink}
        onMenuToggle={() => setMainNavActive((value) => !value)}
      />
      <div className="LoggedInLayout__content">{children}</div>
      <FooterUser />
    </div>
  );
};
