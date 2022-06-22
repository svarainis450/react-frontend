import { useContext, useState } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import { UserInfoContext } from 'src/state/UserInfoContextProvider';

import './UserMenu.scss';

export const UserMenu = () => {
  const [menuActive, setMenuActive] = useState(false);
  const {userInfo, isLoggedIn} = useContext(UserInfoContext);

  return (
    <div className="UserMenu">
      <div className="UserMenu__top">
        <div className="UserMenu__userimg">
          <img src={userInfo.img} alt="userimg" />
        </div>

        <div
          onClick={() => setMenuActive((boolean) => !boolean)}
          className={classNames('UserMenu__toggle', {'UserMenu__toggle--active': menuActive})}
        >
          Me
        </div>
      </div>

      {menuActive && 
        <div className="UserMenu__bottom">
          <ul className='UserMenu__list'>
            <li className='UserMenu__link'>
              <Link to="#">
                <img src={''} alt="user" />
                Account
              </Link>
            </li>

            <li className='UserMenu__link'>
              <Link to={'#'}>
                <img src={''} alt="bell" />
                Notifications
              </Link>
            </li>

            <li className='UserMenu__link'>
              <Link to={'#'}>
                <img src={''} alt="dimensions" />
                Terms {'&'} Conditions
              </Link>
            </li>

            <li className='UserMenu__link'>
              <Link to={'#'}>
                <img src={''} alt="shield" />
                Privacy policy
              </Link>
            </li>

            <li className='UserMenu__link'>
              <Link to={'#'}>
                <img src={''} alt="card" />
                Billing
              </Link>
            </li>
          </ul>

          <button className='UserMenu__logout'>
            Log out
          </button>
        </div>
        }
    </div>
  );
};
