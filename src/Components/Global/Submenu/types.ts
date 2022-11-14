export interface SubmenuListProps {
  title: string;
  url: string;
  icon: string | JSX.Element;
}

export interface SubmenuProps {
  menuItems: Array<SubmenuListProps>;
  className?: string;
  children?: React.ReactNode;
  pageTitleMob?: string;
}
