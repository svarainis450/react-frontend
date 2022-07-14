import { useEffect } from 'react';

import {
  CardWrapper,
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
  projectsSelector,
  trendingProjectsSelector,
} from 'src/state/reduxstate/projects/selectors';
import { useSelector } from 'react-redux';

export const Trends: React.FC = () => {
  const dispatch = useAppDispatch();
  const trendingProjects = useSelector(trendingProjectsSelector);
  const projectPicks = useSelector(projectPicksSelector);
  const projects = useSelector(projectsSelector);

  useEffect(() => {
    dispatch(fetchTrendingProjects());
    dispatch(fetchProjectsPick());
  }, [dispatch]);

  return (
    <div className="Trends">
      <LoggedInLayout>
        <Submenu menuItems={submenuList} />
        <section className="wrapper two-columns">
          <CardWrapper title="Trending Category" subtitle="Today">
            <TrendingCategory trendingProjects={trendingProjects} />
          </CardWrapper>
          <CardWrapper
            title="Project picks by most followed crypto experts"
            subtitle="Today"
          >
            <ProjectPicksTable pickedProjects={projectPicks} />
          </CardWrapper>
        </section>
        <Top3ElementsSlider projects={projects} />
        <section className="wrapper one-column">
          <CardWrapper
            title="List of influencers and their picks"
            subtitle="Today"
          >
            influencers picks
          </CardWrapper>
        </section>
      </LoggedInLayout>
    </div>
  );
};
