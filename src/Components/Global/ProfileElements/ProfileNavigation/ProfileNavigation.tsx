import { useState } from 'react';
import {
  Billing,
  Notifications,
  Privacy,
  Terms,
} from 'src/Assets/icons/IconElements';
import { Typography, TypographyWeight } from '../../Typography';
import './ProfileNavigation.scss';

type NavClassTypes = 'notifications' | 'terms' | 'privacy' | 'billing';

const NAVIGATION = [
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
  const [selected, setSelected] = useState<NavClassTypes>('notifications');

  return (
    <div className="profile-navigation">
      <nav className="profile-navigation__nav">
        <div className="profile-navigation__nav__list">
          {NAVIGATION.map(({ id, name, icon, key }) => (
            <div
              onClick={() => setSelected(key as NavClassTypes)}
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
