import { Dispatch, SetStateAction } from 'react';
import { SubmenuFilters } from 'src/state/reduxstate/projects/types';

export interface SubmenuListProps {
  title: string;
  icon: string | JSX.Element;
  callBackKey: SubmenuFilters;
}

export interface SubmenuProps {
  menuItems: Array<SubmenuListProps>;
  className?: string;
  children?: React.ReactNode;
  callBack: Dispatch<SetStateAction<SubmenuFilters>>;
}
