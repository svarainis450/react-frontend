
import { Link } from 'react-router-dom';

import { LinkList } from '../../../types/links';

import './FooterUser.scss';

export const FooterUser = () => {
  return (
    <div className="desktop FooterUser">
      <div className="FooterUser__wrapper">
        <p className='FooterUser__credentials'>
          © Potato.to   |  All Rights Reserved
        </p>

        <ul className='FooterUser__linklist'>
          <li className='FooterUser__link'>
            <Link to={LinkList.TRENDS}>
              Trends
            </Link>
          </li>

          <li className='FooterUser__link'>
            <Link to={LinkList.DISCOVER}>
              Discover
            </Link>
          </li>
          
          <li className='FooterUser__link'>
            <Link to={LinkList.FORYOU}>
              For you
            </Link>
          </li>

          <li className='FooterUser__link'>
            <Link to={LinkList.PROFILE}>
              Profile
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};