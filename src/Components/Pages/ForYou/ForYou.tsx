import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  ForYouListItem,
  ProjectCard,
  ProjectFilters,
  ProjectMetrics,
  Top3ElementsSlider,
} from 'src/Components/Global';
import { Submenu } from 'src/Components/Global/Submenu';
import { LoggedInLayout } from 'src/Components/layouts/LoggedInLayout';
import {
  projectFilterKeySelector,
  projectsSelector,
} from 'src/state/reduxstate/projects/selectors';
import { fetchProjects } from 'src/state/reduxstate/projects/thunks';
import { useAppDispatch } from 'src/state/reduxstate/store';

import './ForYou.scss';
import { SubmenuListProps } from 'src/Components/Global/Submenu';
import {
  Star,
  Influencers,
  Suggestion,
} from '../../../Assets/icons/IconElements';
import { favoriteProjectsSelector } from 'src/state/reduxstate/user/selectors';
import { Typography } from '@mui/material';
import {
  Project,
  ProjectFilterKeys,
  Statuses,
} from 'src/state/reduxstate/projects/types';
import { isArray } from 'lodash';
import { images } from 'src/utils/images';
import { CategoryTags } from 'src/Components/Global/TrendsElements/types';
import { icons } from 'src/utils/icons';
import MainScreen from 'src/Components/Global/Graphic/mainScreen';

export const forYouSubmenuList: SubmenuListProps[] = [
  {
    title: 'Your Projects',
    url: '/foryou',
    icon: <Star />,
  },
  {
    title: 'Your Influencers',
    url: '/your-influencers',
    icon: <Influencers />,
  },
  // {
  //   title: 'Suggestions',
  //   url: '/suggestions',
  //   icon: <Suggestion />,
  // },
];

export const ForYou: React.FC = () => {
  const projects = useSelector(projectsSelector);
  const dispatch = useAppDispatch();
  const favoriteProjects = useSelector(favoriteProjectsSelector);

  // const subscribedProjects = projects.filter((project) => {
  //   return favoriteProjects.some((item) => item === project.id);
  // });

  const topBullProject = projects && [projects[0]];

  console.log(favoriteProjects);

  const demoProject: Project = {
    id: 22,
    name: 'Dofecoin (DOGE)',
    img: images.bitkoin,
    rateData: {
      talkRate: 67,
      talkRateChanges: 2,
      positiveRatio: 56,
      bullRatio: 30,
    },
    influencers: [],
    coinbaseUrl: '',
    openSeaUrl: null,
    tag: {
      name: CategoryTags.coins,
      color: '',
    },
  };

  return (
    <div className="For-you">
      <LoggedInLayout activeLink="For you">
        <Submenu pageTitleMob="For You" menuItems={forYouSubmenuList} />
        <div className="For-you__wrapper">
          <div className="For-you__wrapper__graph-wrapper">
            <div>
              <ProjectMetrics project={demoProject} />
            </div>
            <div>
              <MainScreen />
            </div>
          </div>
          <div className="For-you__wrapper__projects-list">
            <div className="title-wrapper">
              <Typography className="list-title">
                List of projects you follow
              </Typography>
              <img src={icons.question_mark_grey} alt="question mark" />
            </div>
            <div className="input-wrapper">
              <img
                className="input-wrapper__magnifier"
                src={icons.search_magnifier}
                alt="Filter by name"
              />
              <input
                className="input-wrapper__input"
                type="text"
                placeholder="Filter by name..."
                // onChange={(e: ChangeEvent<HTMLInputElement>) =>
                //   handleNameInputChange(e)
                // }
              />
            </div>
            <ForYouListItem project={demoProject} />
          </div>
        </div>
        {favoriteProjects && favoriteProjects.length > 0 && (
          <Top3ElementsSlider
            isForYouProject
            topBull={topBullProject}
            topPositive={topBullProject}
            topTalkRate={topBullProject}
          />
        )}
        {/* <ProjectFilters /> */}
        {!favoriteProjects ||
          (!Array.isArray(favoriteProjects) && (
            <div className="empty-dashboard">
              <Typography>
                Welcome to your dashboard of interest. To add your favorite
                projects to this page, you need to click on the star icon on the
                Discover subpage.
              </Typography>
            </div>
          ))}
      </LoggedInLayout>
    </div>
  );
};
