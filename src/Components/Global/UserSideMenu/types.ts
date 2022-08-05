export interface UserSideMenuProps {
  isActive: boolean;
  isActiveToggler: (value: boolean) => void;
  activeLink?: string;
}
