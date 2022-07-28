import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Loader,
  LoadError,
  ProjectCard,
  ProjectFilters,
} from 'src/Components/Global';
import { Submenu } from 'src/Components/Global/Submenu';
import { LoggedInLayout } from 'src/Components/layouts/LoggedInLayout';
import { projectsSelector } from 'src/state/reduxstate/projects/selectors';
import { fetchProjects } from 'src/state/reduxstate/projects/thunks';
import { useAppDispatch } from 'src/state/reduxstate/store';

import './Discover.scss';
import { SubmenuListProps } from 'src/Components/Global/Submenu';
import { Star, Influencers, Funds } from '../../../Assets/icons/IconElements';
import {
  ProjectFilterKeys,
  Statuses,
} from 'src/state/reduxstate/projects/types';

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
  const dispatch = useAppDispatch();

  const projects = useSelector(projectsSelector);
  const [projectsFilter, setProjectsFilter] = useState(ProjectFilterKeys.NONE);
  const [projectsStatus, setProjectStatus] = useState<Statuses>('idle');

  console.log(projects);

  useEffect(() => {
    dispatch(
      fetchProjects({
        filter: projectsFilter,
        callBack: setProjectStatus,
        pagination: 50,
      })
    );
  }, [projectsFilter]);

  return (
    <div className="Discover">
      <LoggedInLayout>
        <Submenu menuItems={submenuList} />
        <ProjectFilters callBack={setProjectsFilter} />
        <div className="Discover__wrapper">
          {projectsStatus === 'success' &&
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
            )}
          {projectsStatus === 'pending' && <Loader />}
          {projectsStatus === 'error' && <LoadError />}
        </div>
      </LoggedInLayout>
    </div>
  );
};
