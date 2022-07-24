import {
  Billing,
  Notifications,
  Privacy,
  Terms,
} from 'src/Assets/icons/IconElements';
import { NavClassTypes } from 'src/state/reduxstate/user/types';

export interface SideMenuProps {
  isActive: boolean;
  isActiveToggler: (value: boolean) => void;
}

export const PROFILE_NAVIGATION: Array<{
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
