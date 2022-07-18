import { useContext, useState } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import { UserInfoContext } from 'src/state/UserInfoContextProvider';
import { LogOut } from 'src/Common/utils/LogOut'

import human from 'src/Assets/icons/human.svg';
import bell_small from 'src/Assets/icons/bell_small.svg';
import dimensions from 'src/Assets/icons/dimensions.svg';
import shield from 'src/Assets/icons/shield.svg';
import card from 'src/Assets/icons/card.svg';

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
                <img src={human} alt="user" />
                Account
              </Link>
            </li>

            <li className='UserMenu__link'>
              <Link to={'#'}>
                <img src={bell_small} alt="bell" />
                Notifications
              </Link>
            </li>

            <li className='UserMenu__link'>
              <Link to={'#'}>
                <img src={dimensions} alt="dimensions" />
                Terms {'&'} Conditions
              </Link>
            </li>

            <li className='UserMenu__link'>
              <Link to={'#'}>
                <img src={shield} alt="shield" />
                Privacy policy
              </Link>
            </li>

            <li className='UserMenu__link'>
              <Link to={'#'}>
                <img src={card} alt="card" />
                Billing
              </Link>
            </li>
          </ul>

          <button className='UserMenu__logout' onClick={LogOut}>
            Log out
          </button>
        </div>
        }
    </div>
  );
};
