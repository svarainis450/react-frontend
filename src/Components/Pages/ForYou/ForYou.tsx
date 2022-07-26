import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ProjectCard, ProjectFilters } from 'src/Components/Global';
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
  {
    title: 'Suggestions',
    url: '/suggestions',
    icon: <Suggestion />,
  },
];

export const ForYou: React.FC = () => {
  const projects = useSelector(projectsSelector);
  const projectFilterKey = useSelector(projectFilterKeySelector);
  const dispatch = useAppDispatch();
  const favoriteProjects = useSelector(favoriteProjectsSelector);

  const subscribedProjects = projects.filter((project) => {
    return favoriteProjects.some((item) => {
      return item === project.id;
    });
  });

  useEffect(() => {
    dispatch(fetchProjects(projectFilterKey || undefined));
  }, [dispatch, projectFilterKey]);

  return (
    <div className="For-you">
      <LoggedInLayout>
        <Submenu menuItems={forYouSubmenuList} />
        <ProjectFilters />
        {subscribedProjects.length === 0 && (
          <div className="empty-dashboard">
            <Typography>
              Welcome to your dashboard of interest. To add your favorite
              projects to this page, you need to click on the star icon on the
              Discover subpage.
            </Typography>
          </div>
        )}
        <div className="For-you__wrapper">
          {subscribedProjects.length > 0 &&
            subscribedProjects.map(
              ({
                id,
                coinbaseUrl,
                tag,
                rateData,
                name,
                influencers,
                img,
                started,
              }) => (
                <ProjectCard
                  id={id}
                  key={id}
                  name={name}
                  img={img}
                  coinbaseUrl={coinbaseUrl}
                  influencers={influencers}
                  rateData={rateData}
                  tag={tag}
                  started={started}
                />
              )
            )}
        </div>
      </LoggedInLayout>
    </div>
  );
};
