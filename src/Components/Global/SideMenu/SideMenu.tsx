import { useContext } from 'react';
import classNames from 'classnames';

import { UserInfoContext } from 'src/state/UserInfoContextProvider';
import { SideMenuProps } from './types';
import { Button } from '../Button';

import { Link, useNavigate } from 'react-router-dom';
import { NavigationList } from '../NavigationList';
import { simpleNavList } from '../NavigationList/const';
import { LinkList } from '../../../types/links';

import closeIcon from '../../../Assets/images/close.svg';
import './SideMenu.scss';

export const SideMenu = ({ isActive, isActiveToggler }: SideMenuProps) => {
  const { userInfo, setUserInfo, isLoggedIn } = useContext(UserInfoContext);
  const navigate = useNavigate();

  return (
    <div className={classNames('SideMenu', { 'SideMenu--active': isActive })}>
      <div
        onClick={() => isActiveToggler(false)}
        className={classNames('SideMenu__overlay', {
          'SideMenu__overlay--inactive': !isActive,
        })}
      />

      <div className="SideMenu__content">
        <div className="SideMenu__top">
          <button
            className="SideMenu__close"
            onClick={() => isActiveToggler(false)}
          >
            <img src={closeIcon} alt="" />
          </button>

          {/* <Link to={LinkList.Login}>
            <Button className="SideMenu__login" buttonType="transparent">
              Log in
            </Button>
          </Link> */}
        </div>

        <NavigationList list={simpleNavList} />

        {/* <Link to={LinkList.Pricing} className="SideMenu__signup">
          <Button className="SideMenu__login">Sign up</Button>
        </Link> */}

        <Button
          className="SideMenu__login"
          onClick={() => {
            navigate(LinkList.Pricing);
            isActiveToggler(false);
          }}
        >
          Get started
        </Button>
      </div>
    </div>
  );
};
