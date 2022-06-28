export interface SubmenuListProps {
  title: string;
  url: string;
  icon: string;
}

export interface SubmenuProps {
  menuItems: Array<SubmenuListProps>;
  className?: string;
}