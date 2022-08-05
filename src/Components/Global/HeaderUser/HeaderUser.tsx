import { useContext, useEffect, useState } from 'react';
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
import { icons } from 'src/utils/icons';
import { IndexAxis } from '../DiscoverElements/IndexAxis/IndexAxis';
import { useMediaQuery } from 'src/hooks';
import { InfoBlock } from '../InfoBlock/InfoBlock';
import { useSelector } from 'react-redux';
import { userDataSelector } from 'src/state/reduxstate/user/selectors';
import { useAppDispatch } from 'src/state/reduxstate/store';
import { fetchUserData } from 'src/state/reduxstate/user/thunks';

export const HeaderUser = ({ onMenuToggle, activeLink }: HeaderUserProps) => {
  const dispatch = useAppDispatch();
  const { userInfo, setUserInfo, isLoggedIn } = useContext(UserInfoContext);
  const [notificationsActive, setNotificationsActive] = useState(false);
  const { isTablet } = useMediaQuery();
  const userData = useSelector(userDataSelector);
  const marketRatio = userData.market;
  const [showMarketDesc, setShowMarketDesc] = useState(false);

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

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
        <NavigationList activeLink={activeLink} list={userNavList} />
      </div>

      {/* <div className="HeaderUser__notifications-wrapper"> */}
      {/* <button
          className="HeaderUser__notifications"
          onClick={() => setNotificationsActive((value) => !value)}
        >
          <img src={Bell} alt="logo" />
        </button> */}

      {/* {notificationsActive && <>Notif component</>} */}
      {/* </div> */}
      <div className="HeaderUser__market-tag-wrapper">
        {isTablet ? (
          <div
            className={`HeaderUser__market-tag-wrapper__market-tag ${
              marketRatio < 50 ? 'negative' : ''
            }`}
            onClick={() => setShowMarketDesc(true)}
          >
            {marketRatio}
          </div>
        ) : (
          <IndexAxis rating={marketRatio} type="overall" />
        )}
        {!isTablet && (
          <img
            className="HeaderUser__market-tag-wrapper__question"
            src={icons.question_mark}
            alt="What’s the overall social sentiment?"
            onMouseOver={() => setShowMarketDesc(true)}
            onClick={() => setShowMarketDesc(true)}
          />
        )}
        {showMarketDesc && (
          <div className="HeaderUser__market-tag-wrapper__market-info">
            <InfoBlock
              showInfoBlock={showMarketDesc}
              infoTitle="What’s the overall social sentiment?"
              infoDesc={
                <>
                  The social sentiment score indicates how users overall feel
                  about the market. Each day, we analyze sentiments and emotions
                  from different sources and crunch them into an exact number:{' '}
                  <strong>The overall social sentiment score.</strong>
                  <br />
                  <br />
                  We use an overall social sentiment as a starting point to
                  calculate indexes like Talk Rate and Bull v.s. Bear
                </>
              }
              onCloseClick={() => setShowMarketDesc(false)}
            />
          </div>
        )}
      </div>

      <Link to={LinkList.PROFILE} className="HeaderUser__profile desktop">
        <img src={userInfo.img || icons.no_profile_pic} alt="user img" />
      </Link>
    </div>
  );
};
