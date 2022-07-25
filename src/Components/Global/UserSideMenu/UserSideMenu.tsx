import { useContext } from 'react';
import classNames from 'classnames';

import { UserInfoContext } from 'src/state/UserInfoContextProvider';
import { UserSideMenuProps } from './types';

import { NavigationList } from 'src/Components/Global/NavigationList';
import { userNavList } from '../NavigationList/const';

import closeIcon from '../../../Assets/images/close.svg';
import './UserSideMenu.scss';
import { UserMenu } from './UserMenu';

export const UserSideMenu = ({
  isActive,
  isActiveToggler,
}: UserSideMenuProps) => {
  const { userInfo, setUserInfo, isLoggedIn } = useContext(UserInfoContext);

  return (
    <div
      className={classNames('UserSideMenu', {
        'UserSideMenu--active': isActive,
      })}
    >
      <div
        onClick={() => isActiveToggler(false)}
        className={classNames('UserSideMenu__overlay', {
          'UserSideMenu__overlay--inactive': !isActive,
        })}
      />

      <div className="UserSideMenu__content">
        <div className="UserSideMenu__top">
          <button
            className="UserSideMenu__close"
            onClick={() => isActiveToggler(false)}
          >
            <img src={closeIcon} alt="" />
          </button>
        </div>

        <NavigationList list={userNavList} />

        <UserMenu isActiveToggler={() => isActiveToggler(false)} />
      </div>
    </div>
  );
};
