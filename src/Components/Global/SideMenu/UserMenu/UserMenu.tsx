import { useContext, useState } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import { UserInfoContext } from 'src/state/UserInfoContextProvider';
import { LinkList } from 'src/types/links';

import closeIcon from '../../../Assets/images/close.svg';
import { LogOut } from 'src/Common/utils/LogOut';
import './UserMenu.scss';

export const UserMenu = () => {
  const [menuActive, setMenuActive] = useState(false);
  const { userInfo, isLoggedIn } = useContext(UserInfoContext);

  return (
    <div className="menuOpen">
      <div className="menuOpen__top">
        <img src={userInfo.img} alt="userimg" />

        <div
          onClick={() => setMenuActive(false)}
          className={classNames('SideMenu__overlay', {
            'SideMenu__overlay--active': menuActive,
          })}
        >
          Open
        </div>
      </div>

      <div className="menuOpen__bottom">
        <ul className="menuOpen__list">
          <li className="menuOpen__link">
            <Link to={'#'}>
              <img src={''} alt="user" />
              Account
            </Link>
          </li>

          <li className="menuOpen__link">
            <Link to={'#'}>
              <img src={''} alt="bell" />
              Notifications
            </Link>
          </li>

          <li className="menuOpen__link">
            <Link to={'#'}>
              <img src={''} alt="dimensions" />
              Terms {'&'} Conditions
            </Link>
          </li>

          <li className="menuOpen__link">
            <Link to={'#'}>
              <img src={''} alt="shield" />
              Privacy policy
            </Link>
          </li>

          <li className="menuOpen__link">
            <Link to={'#'}>
              <img src={''} alt="card" />
              Billing
            </Link>
          </li>
        </ul>

        <button className="menuOpen__logout" onClick={LogOut}>
          Log out
        </button>
      </div>
    </div>
  );
};
