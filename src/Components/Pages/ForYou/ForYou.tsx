import { ChangeEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  ForYouListItem,
  ProjectMetrics,
  Top3ElementsSlider,
} from 'src/Components/Global';
import { Submenu } from 'src/Components/Global/Submenu';
import { LoggedInLayout } from 'src/Components/layouts/LoggedInLayout';
import { projectsSelector } from 'src/state/reduxstate/projects/selectors';
import {
  fetchProjectById,
  fetchProjects,
} from 'src/state/reduxstate/projects/thunks';
import { useAppDispatch } from 'src/state/reduxstate/store';

import './ForYou.scss';
import { SubmenuListProps } from 'src/Components/Global/Submenu';
import { Star, Influencers } from '../../../Assets/icons/IconElements';
import { favoriteProjectsSelector } from 'src/state/reduxstate/user/selectors';
import { Typography } from '@mui/material';
import {
  ProjectFilterKeys,
  Statuses,
} from 'src/state/reduxstate/projects/types';
import { CategoryTags } from 'src/Components/Global/TrendsElements/types';
import { icons } from 'src/utils/icons';
import MainScreen from 'src/Components/Global/Graphic/mainScreen';
import {
  getFavInfluencers,
  getFavProjects,
} from 'src/state/reduxstate/user/thunks';
import {
  filterProjectsByName,
  filterProjectsLocaly,
} from 'src/utils/localFilters';

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
  const dispatch = useAppDispatch();
  const [filterValue, setFilterValue] = useState<CategoryTags | string>('1');
  const [offsetCount, setOffsetCount] = useState(0);
  const [projectsFilter, setProjectsFilter] = useState(ProjectFilterKeys.NONE);

  useEffect(() => {
    dispatch(getFavInfluencers());
    dispatch(getFavProjects());
    dispatch(
      fetchProjects({
        filter: projectsFilter,
        callBack: setProjectStatus,
        offset: offsetCount,
        filterValue: String(filterValue).toLocaleLowerCase(),
      })
    );
    dispatch(fetchProjectById(selectedProjectID));
    if (projectsFilter === ProjectFilterKeys.NAME) {
      const filtered = filterProjectsByName(favoriteProjects, filterValue);
      console.log(filtered);
    }
  }, [projectsFilter, offsetCount, dispatch, filterValue]);

  const projects = useSelector(projectsSelector);
  const favoriteProjects = useSelector(favoriteProjectsSelector);
  const [projectsStatus, setProjectStatus] = useState<Statuses>('idle');
  const [selectedProjectID, setSelectedProjectID] = useState(
    favoriteProjects[0].id || projects[0].id
  );

  console.log(selectedProjectID);

  const topTalkRateProject = filterProjectsLocaly(
    favoriteProjects,
    ProjectFilterKeys.TALK_RATE
  )?.slice(0, 1);
  const topPositiveProject = filterProjectsLocaly(
    favoriteProjects,
    ProjectFilterKeys.POSITIVE
  )?.slice(0, 1);

  const topBullProject = filterProjectsLocaly(
    favoriteProjects,
    ProjectFilterKeys.BULL
  )?.slice(0, 1);

  const handleNameInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.value.length >= 3) {
      setProjectsFilter(ProjectFilterKeys.NAME);
      setFilterValue(e.target.value);
    } else if (e.target.value.length === 0) {
      setProjectsFilter(ProjectFilterKeys.NONE);
      setFilterValue('1');
    }
  };

  return (
    <div className="For-you">
      <LoggedInLayout activeLink="For you">
        <Submenu pageTitleMob="For You" menuItems={forYouSubmenuList} />
        <div className="For-you__wrapper">
          <div className="For-you__wrapper__graph-wrapper">
            <div>{favoriteProjects.length > 0 && <ProjectMetrics />}</div>
            <div>
              <MainScreen projectId={selectedProjectID} />
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
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleNameInputChange(e)
                }
              />
            </div>
            {favoriteProjects.map((project, index) => (
              <ForYouListItem
                key={`${project.id + index}`}
                project={project}
                projectIDCallback={setSelectedProjectID}
                isInFavorites
              />
            ))}
            {projects.map((project, index) => (
              <ForYouListItem
                key={`${project.id + index}`}
                project={project}
                projectIDCallback={setSelectedProjectID}
              />
            ))}
          </div>
        </div>
        {favoriteProjects && favoriteProjects.length > 0 && (
          <Top3ElementsSlider
            isForYouProject
            topBull={(topBullProject && topBullProject) || favoriteProjects}
            topPositive={
              (topPositiveProject && topPositiveProject) || favoriteProjects
            }
            topTalkRate={
              (topTalkRateProject && topTalkRateProject) || favoriteProjects
            }
          />
        )}
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
