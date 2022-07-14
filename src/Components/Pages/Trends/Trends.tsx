import { useEffect } from 'react';

import {
  CardWrapper,
  Top3ElementsSlider,
  TrendingCategory,
} from 'src/Components/Global';
import { LoggedInLayout } from 'src/Components/layouts/LoggedInLayout';
import { Submenu } from 'src/Components/Global/Submenu';
import { submenuList } from './constants';

import './trends.scss';
import { useAppDispatch } from 'src/state/reduxstate/store';
import { fetchTrendingProjects } from 'src/state/reduxstate/projects/thunks';
import {
  projectsSelector,
  trendingProjectsSelector,
} from 'src/state/reduxstate/projects/selectors';
import { useSelector } from 'react-redux';

export const Trends: React.FC = () => {
  const dispatch = useAppDispatch();
  const trendingProjects = useSelector(trendingProjectsSelector);
  const projects = useSelector(projectsSelector);

  useEffect(() => {
    dispatch(fetchTrendingProjects());
  }, [dispatch]);

  return (
    <div className="Trends">
      <LoggedInLayout>
        <Submenu menuItems={submenuList} />
        <div className="wrapper two-columns">
          <CardWrapper title="Trending Category" subtitle="Today">
            <TrendingCategory trendingProjects={trendingProjects} />
          </CardWrapper>
          <CardWrapper
            title="Project picks by popularity among influencers and their followers"
            subtitle="Today"
          >
            influencers
          </CardWrapper>
        </div>
        <Top3ElementsSlider projects={projects} />
        {/* <div className="wrapper one-column">
          <CardWrapper
            title="List of influencers and their picks"
            subtitle="Today"
          >
            influencers picks
          </CardWrapper>
        </div> */}
      </LoggedInLayout>
    </div>
  );
};
