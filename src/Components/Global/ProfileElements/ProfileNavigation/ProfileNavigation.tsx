import { useEffect, useState } from 'react';
import { useAppDispatch } from 'src/state/reduxstate/store';
import { setProfileBlock } from 'src/state/reduxstate/user/slice';
import { NavClassTypes } from 'src/state/reduxstate/user/types';
import { LogOut } from 'src/Common/utils/LogOut';
import { Typography, TypographyWeight } from '../../Typography';
import './ProfileNavigation.scss';
import { PROFILE_NAVIGATION } from '../../SideMenu/types';

export const ProfileNavigation: React.FC = () => {
  const dispatch = useAppDispatch();
  const [selected, setSelected] = useState<NavClassTypes>('reports');

  const handleNavSelection = (key: NavClassTypes) => {
    setSelected(key);
  };

  useEffect(() => {
    dispatch(setProfileBlock(selected));
  }, [dispatch, selected]);

  return (
    <>
      <div className="profile-navigation">
        <nav className="profile-navigation__nav">
          <div className="profile-navigation__nav__list">
            {PROFILE_NAVIGATION.map(({ id, name, icon, key }) => (
              <div
                onClick={() => handleNavSelection(key as NavClassTypes)}
                key={id}
                className={`profile-navigation__nav__list__element ${selected} ${
                  selected === key ? 'selected' : ''
                }`}
              >
                <>{icon}</>
                <Typography>{name}</Typography>
              </div>
            ))}
          </div>
          <button
            className="profile-navigation__nav__list__button selected"
            onClick={LogOut}
          >
            <Typography weight={TypographyWeight.MEDIUM}>Log out</Typography>
          </button>
        </nav>
        <div className="profile-navigation__progress-bar">
          <div
            className={`profile-navigation__progress-bar__progress ${selected}`}
          />
        </div>
      </div>
    </>
  );
};
