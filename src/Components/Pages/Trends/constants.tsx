import { LastWeek, Today, Upcomming } from 'src/Assets/icons/IconElements';

import { InfoBlockTypes } from 'src/Components/Global/TrendsElements/types';
import { SubmenuListProps } from './Submenu';

export const submenuList: Array<SubmenuListProps> = [
  {
    title: 'Today',
    icon: <Today />,
    callBackKey: 'daily',
  },
  {
    title: 'Last Week',
    icon: <LastWeek />,
    callBackKey: 'weekly',
  },
  // {
  //   title: 'Upcoming',
  //   icon: <Upcomming />,
  //   callBackKey: 'upcomming',
  // },
];

export const infoBlocks = {
  [InfoBlockTypes.rate]: {
    title: 'What’s Talk Rate Project?',
    desc: 'Talk Rate summarizes which projects are most often discussed among crypto experts and the community.',
  },
  [InfoBlockTypes.positive]: {
    title: 'What’s Positive Project?',
    desc: `Positive v.s. A negative Index shows whether people are more positive or negative about the project's growth.`,
  },
  [InfoBlockTypes.bullish]: {
    title: 'What’s Bullish Project?',
    desc: 'Bull v.s. Bear spots whether the project is Bullish, meaning is on the rise, or Bearish, meaning it is declining in value.',
  },
};
