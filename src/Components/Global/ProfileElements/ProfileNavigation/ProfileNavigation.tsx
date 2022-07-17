import { useState } from 'react';
import {
  Billing,
  Notifications,
  Privacy,
  Terms,
} from 'src/Assets/icons/IconElements';
import { useAppDispatch } from 'src/state/reduxstate/store';
import { setProfileBlock } from 'src/state/reduxstate/user/slice';
import { NavClassTypes } from 'src/state/reduxstate/user/types';
import { Typography, TypographyWeight } from '../../Typography';
import './ProfileNavigation.scss';

const NAVIGATION: Array<{
  id: number;
  name: string;
  icon: JSX.Element;
  key: NavClassTypes;
}> = [
  {
    id: 1,
    name: 'Notifications',
    icon: <Notifications />,
    key: 'notifications',
  },
  {
    id: 2,
    name: 'Terms & Conditions',
    icon: <Terms />,
    key: 'terms',
  },
  {
    id: 3,
    name: 'Privacy Policy',
    icon: <Privacy />,
    key: 'privacy',
  },
  {
    id: 4,
    name: 'Billing',
    icon: <Billing />,
    key: 'billing',
  },
];

export const ProfileNavigation: React.FC = () => {
  const dispatch = useAppDispatch();
  const [selected, setSelected] = useState<NavClassTypes>('notifications');

  const handleNavSelection = (key: NavClassTypes) => {
    setSelected(key);
    dispatch(setProfileBlock(key));
  };

  return (
    <div className="profile-navigation">
      <nav className="profile-navigation__nav">
        <div className="profile-navigation__nav__list">
          {NAVIGATION.map(({ id, name, icon, key }) => (
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
        <div className="profile-navigation__nav__list__element selected">
          <Typography weight={TypographyWeight.BOLD700}>Log out</Typography>
        </div>
      </nav>
      <div className="profile-navigation__progress-bar">
        <div
          className={`profile-navigation__progress-bar__progress ${selected}`}
        />
      </div>
    </div>
  );
};
