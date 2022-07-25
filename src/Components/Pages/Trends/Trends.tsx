import { useEffect } from 'react';

import {
  CardWrapper,
  InfluencersTable,
  ProjectPicksTable,
  Top3ElementsSlider,
  TrendingCategory,
} from 'src/Components/Global';
import { LoggedInLayout } from 'src/Components/layouts/LoggedInLayout';
import { Submenu } from 'src/Components/Global/Submenu';
import { submenuList } from './constants';

import './trends.scss';
import { useAppDispatch } from 'src/state/reduxstate/store';
import {
  fetchProjectsPick,
  fetchTrendingProjects,
} from 'src/state/reduxstate/projects/thunks';
import {
  projectPicksSelector,
  trendingProjectsSelector,
} from 'src/state/reduxstate/projects/selectors';
import { useSelector } from 'react-redux';
import { icons } from 'src/utils/icons';
import { CategoryTags } from 'src/Components/Global/TrendsElements/types';
import { Project } from 'src/state/reduxstate/projects/types';

export const Trends: React.FC = () => {
  const dispatch = useAppDispatch();
  const trendingProjects = useSelector(trendingProjectsSelector);
  const projectPicks = useSelector(projectPicksSelector);
  console.log(trendingProjects);

  useEffect(() => {
    dispatch(fetchTrendingProjects());
    dispatch(fetchProjectsPick());
  }, [dispatch]);

  const demoTop3: Project[] = [
    {
      id: 1,
      img: icons.coin_base,
      name: 'Bitcoin (BTC)',
      tag: CategoryTags.coins,
      rateData: {
        talkRate: 67,
        positiveRatio: 66,
        bullRatio: 33,
        talkRateChanges: 12,
      },
    },
    {
      id: 2,
      img: icons.coin_base,
      name: 'Dogecoin (DOGE)',
      tag: CategoryTags.coins,
      rateData: {
        talkRate: 67,
        positiveRatio: 66,
        bullRatio: 33,
        talkRateChanges: 12,
      },
    },
    {
      id: 3,
      img: icons.coin_base,
      name: 'Dogecoin (DOGE)',
      tag: CategoryTags.coins,
      rateData: {
        talkRate: 67,
        positiveRatio: 66,
        bullRatio: 33,
        talkRateChanges: 12,
      },
    },
  ];

  const influencersDemo = [
    {
      id: 1,
      name: 'Vitalik Buterin',
      tagName: '@VitalikButerin',
      img: icons.coin_base,
      followers: 540,
      bullseyeIndex: 23,
      category: CategoryTags.coins,
      postCount: 3,
      channel: 'Twitter',
      projectName: 'Etherium',
      projectImg: icons.coin_base,
      linkToPost: 'asdasd',
    },
    {
      id: 2,
      name: 'Vitalik Buterin',
      tagName: '@VitalikButerin',
      img: icons.coin_base,
      followers: 120,
      bullseyeIndex: 84,
      category: CategoryTags.NFT,
      postCount: 3,
      channel: 'Twitter',
      projectName: 'Etherium',
      projectImg: icons.coin_base,
      linkToPost: 'asdasd',
    },
    {
      id: 3,
      name: 'Vitalik Buterin',
      tagName: '@VitalikButerin',
      img: icons.coin_base,
      followers: 140,
      bullseyeIndex: 90,
      category: CategoryTags.meta,
      postCount: 3,
      channel: 'Twitter',
      projectName: 'Etherium',
      projectImg: icons.coin_base,
      linkToPost: 'asdasd',
    },
    {
      id: 4,
      name: 'Vitalik Buterin',
      tagName: '@VitalikButerin',
      img: icons.coin_base,
      followers: 240,
      bullseyeIndex: 84,
      category: CategoryTags.meta,
      postCount: 3,
      channel: 'Twitter',
      projectName: 'Etherium',
      projectImg: icons.coin_base,
      linkToPost: 'asdasd',
    },
    {
      id: 4,
      name: 'Vitalik Buterin',
      tagName: '@VitalikButerin',
      img: icons.coin_base,
      followers: 840,
      bullseyeIndex: 77,
      category: CategoryTags.defi,
      postCount: 3,
      channel: 'Twitter',
      projectName: 'Etherium',
      projectImg: icons.coin_base,
      linkToPost: 'asdasd',
    },
  ];

  return (
    <div className="Trends">
      <LoggedInLayout>
        <Submenu menuItems={submenuList} />
        <section className="wrapper two-columns">
          <CardWrapper title="Trending Category" subtitle="Today">
            <TrendingCategory trendingProjects={trendingProjects.slice(0, 5)} />
          </CardWrapper>
          <CardWrapper
            title="Project picks by most followed crypto experts"
            subtitle="Today"
          >
            <ProjectPicksTable pickedProjects={projectPicks} />
          </CardWrapper>
        </section>
        <Top3ElementsSlider projects={demoTop3} />
        <section className="wrapper one-column">
          <CardWrapper
            title="List of influencers and their picks"
            subtitle="Today"
          >
            <InfluencersTable influencersData={influencersDemo} />
          </CardWrapper>
        </section>
      </LoggedInLayout>
    </div>
  );
};
