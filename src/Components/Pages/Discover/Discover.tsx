import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { LoadError, ProjectCard, ProjectFilters } from 'src/Components/Global';
import { Submenu } from 'src/Components/Global/Submenu';
import { LoggedInLayout } from 'src/Components/layouts/LoggedInLayout';
import {
  projectFilterKeySelector,
  projectsSelector,
} from 'src/state/reduxstate/projects/selectors';
import { fetchProjects } from 'src/state/reduxstate/projects/thunks';
import { useAppDispatch } from 'src/state/reduxstate/store';

import './Discover.scss';
import { SubmenuListProps } from 'src/Components/Global/Submenu';
import { Star, Influencers, Funds } from '../../../Assets/icons/IconElements';

export const submenuList: SubmenuListProps[] = [
  {
    title: 'Projects',
    url: '/discover',
    icon: <Star />,
  },
  {
    title: 'Influencers',
    url: '/influencers',
    icon: <Influencers />,
  },
  {
    title: 'Funds',
    url: '/funds',
    icon: <Funds />,
  },
];

export const Discover: React.FC = () => {
  const projects = useSelector(projectsSelector);
  const projectFilterKey = useSelector(projectFilterKeySelector);
  const dispatch = useAppDispatch();

  console.log(projects);
  useEffect(() => {
    dispatch(fetchProjects(projectFilterKey || undefined));
  }, [dispatch, projectFilterKey]);

  return (
    <div className="Discover">
      <LoggedInLayout>
        <Submenu menuItems={submenuList} />
        <ProjectFilters />
        <div className="Discover__wrapper">
          {projects ? (
            projects.map(
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
            )
          ) : (
            <LoadError />
          )}
        </div>
      </LoggedInLayout>
    </div>
  );
};
