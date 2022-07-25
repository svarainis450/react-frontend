import { useContext, useState } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import { UserInfoContext } from 'src/state/UserInfoContextProvider';
import { LogOut } from 'src/Common/utils/LogOut';

import './UserMenu.scss';
import { useAppDispatch } from 'src/state/reduxstate/store';
import { NavClassTypes } from 'src/state/reduxstate/user/types';
import { setProfileBlock } from 'src/state/reduxstate/user/slice';
import { icons } from 'src/utils/icons';
import { PROFILE_NAVIGATION } from '../../SideMenu/types';
import { LinkList } from 'src/types';

interface UserMenuProps {
  isActiveToggler: (value: boolean) => void;
}

export const UserMenu: React.FC<UserMenuProps> = ({ isActiveToggler }) => {
  const [menuActive, setMenuActive] = useState(false);
  const { userInfo, isLoggedIn } = useContext(UserInfoContext);
  const dispatch = useAppDispatch();

  const handleProfileMenuItem = (item: NavClassTypes) => {
    dispatch(setProfileBlock(item));
    isActiveToggler(false);
  };

  return (
    <div className="UserMenu">
      <div className="UserMenu__top">
        <div className="UserMenu__userimg">
          <img src={userInfo.img} alt="userimg" />
        </div>

        <div
          onClick={() => setMenuActive((boolean) => !boolean)}
          className={classNames('UserMenu__toggle', {
            'UserMenu__toggle--active': menuActive,
          })}
        >
          Me
        </div>
      </div>

      {menuActive && (
        <div className="UserMenu__bottom">
          <ul className="UserMenu__list">
            <Link
              to={LinkList.PROFILE}
              onClick={() => handleProfileMenuItem('account')}
            >
              <li className="UserMenu__link">
                <img src={icons.account_icon} alt="user" />
                Account
              </li>
            </Link>
            {PROFILE_NAVIGATION.map(({ id, name, icon, key }) => (
              <Link
                key={id}
                to={LinkList.PROFILE}
                onClick={() => handleProfileMenuItem(key)}
              >
                <li className="UserMenu__item">
                  <div>{icon}</div>
                  {name}
                </li>
              </Link>
            ))}
          </ul>

          <button className="UserMenu__logout" onClick={LogOut}>
            Log out
          </button>
        </div>
      )}
    </div>
  );
};
