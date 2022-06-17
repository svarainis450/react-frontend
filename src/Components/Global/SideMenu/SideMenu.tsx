import classNames from 'classnames';

import { SideMenuProps } from './types';
import { Button } from '../Button';

import { Link } from 'react-router-dom';
import { NavigationList } from '../Header/NavigationList';
import { LinkList } from '../../../types/links';

import closeIcon from '../../../Assets/images/close.svg';
import './SideMenu.scss';

export const SideMenu = ({ isActive, isActiveToggler }: SideMenuProps) => {
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

        <NavigationList />

        {/* <Link to={LinkList.Pricing} className="SideMenu__signup">
          <Button className="SideMenu__login">Sign up</Button>
        </Link> */}

        <Link to={LinkList.WAITLIST} className="SideMenu__signup">
          <Button className="SideMenu__login">Join waitlist</Button>
        </Link>
      </div>
    </div>
  );
};
