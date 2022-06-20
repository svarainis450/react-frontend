import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import { NavigationToggler } from './NavigationToggler';
import { NavigationList } from 'src/Components/Global/NavigationList';
import { userNavList } from 'src/Components/Global/NavigationList/const';
import { LinkList } from '../../../types/links';

import { HeaderUserProps } from './types';

import Logo from '../../../Assets/images/logo.svg';
import Bell from '../../../Assets/icons/bell.svg';
import { UserInfoContext } from 'src/state/UserInfoContextProvider';

import './HeaderUser.scss';

export const HeaderUser = ({ onMenuToggle }: HeaderUserProps) => {
  const {userInfo, setUserInfo, isLoggedIn} = useContext(UserInfoContext);
  const [notificationsActive, setNotificationsActive] = useState(false);

  return (
    <div className="HeaderUser">
      <Link to="/">
        <img src={Logo} alt="logo" className="desktop" />
      </Link>

      <div className="HeaderUser__toggler">
        <NavigationToggler onMenuToggle={onMenuToggle} />
      </div>

      <Link to="/" className="HeaderUser__mobile-logo mobile">
        <img src={Logo} alt="logo" />
      </Link>

      <div className="desktop">
        <NavigationList list={userNavList} />
      </div>

      <div className="HeaderUser__notifications-wrapper">
        <button className="HeaderUser__notifications" onClick={() => setNotificationsActive((value) => !value)}>
          <img src={Bell} alt="logo" />
        </button>

        {notificationsActive && (<>Notif component</>)}
      </div>

      <Link to={LinkList.PROFILE} className="HeaderUser__profile desktop">
        <img src={userInfo.img} alt="user img" />
      </Link> 
    </div>
  );
};
