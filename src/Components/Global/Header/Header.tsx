import { Link } from 'react-router-dom';

import { NavigationToggler } from './NavigationToggler';
import { NavigationList } from 'src/Components/Global/NavigationList';
import { simpleNavList } from 'src/Components/Global/NavigationList/const';
import { LinkList } from '../../../types/links';

import { HeaderProps } from './types';
import { Button } from '../Button';

import Logo from '../../../Assets/images/logo.svg';
import './Header.scss';
import { isLoggedIn } from 'src/Common/utils/isLoggedIn';

export const Header = ({ onMenuToggle }: HeaderProps) => {
  return (
    <div className="Header">
      <Link to="/">
        <img src={Logo} alt="logo" className="desktop" />
      </Link>

      <div className="Header__toggler">
        <NavigationToggler onMenuToggle={onMenuToggle} />
      </div>

      <Link
        to={isLoggedIn() ? LinkList.TRENDS : '/'}
        className="Header__mobile-logo mobile"
      >
        <img src={Logo} alt="logo" />
      </Link>

      <div className="desktop">
        <NavigationList list={simpleNavList} />
      </div>

      <div className="Header__button-wrapper">
        <Link to={LinkList.Login}>
          <Button className="Header__button--login" buttonType="transparent">
            Log In
          </Button>
        </Link>

        <Link to={LinkList.Pricing}>
          <Button className="Header__button--signup desktop">Sign up</Button>
        </Link>

        {/* <Link to={LinkList.WAITLIST}>
          <Button className="Header__button--signup desktop">Join waitlist</Button>
        </Link>  */}
      </div>
    </div>
  );
};
