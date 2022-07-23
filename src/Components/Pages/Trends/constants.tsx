import { LastWeek, Today, Upcomming } from 'src/Assets/icons/IconElements';
import { SubmenuListProps } from 'src/Components/Global/Submenu';

import { InfoBlockTypes } from 'src/Components/Global/TrendsElements/types';

export const submenuList: Array<SubmenuListProps> = [
  {
    title: 'Today',
    url: '/trends',
    icon: <Today />,
  },
  {
    title: 'Last Week',
    url: '/dashboard',
    icon: <LastWeek />,
  },
  {
    title: 'Upcoming',
    url: '/dashboard',
    icon: <Upcomming />,
  },
];

export const infoBlocks = {
  [InfoBlockTypes.rate]: {
    title: 'What’s Talk Rate Project?',
    desc: 'Talk Rate is our internal metric to summarize and define which projects are most often discussed among crypto experts and the community. It’s an easy-to-understand metric that changes dynamically every 5 minutes.',
  },
  [InfoBlockTypes.positive]: {
    title: 'What’s Positive Project?',
    desc: 'Positive v.s. Negative Index shows how people collectively value the project - whether they are more positive or negative about the growth of the project.',
  },
  [InfoBlockTypes.bullish]: {
    title: 'What’s Bullish Project?',
    desc: 'Bull v.s. Bear Index spots whether the project is Bullish, meaning is on the rise, or Bearish, meaning it is declining in value.',
  },
};
