import { SubmenuListProps } from "src/Components/Global/Submenu";

import today from "src/Assets/icons/book.svg";
import lastWeek from "src/Assets/icons/book.svg";
import upcoming from "src/Assets/icons/book.svg";

export const submenuList : Array<SubmenuListProps> = [
  {
    title: 'Today',
    url: '/trends',
    icon: today
  },
  {
    title: 'Last Week',
    url: '/dashboard',
    icon: lastWeek
  },
  {
    title: 'Upcoming',
    url: '/dashboard',
    icon: upcoming
  },
]