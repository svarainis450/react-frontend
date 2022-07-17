import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ProjectCard } from 'src/Components/Global';
import { Submenu } from 'src/Components/Global/Submenu';
import { LoggedInLayout } from 'src/Components/layouts/LoggedInLayout';
import { projectsSelector } from 'src/state/reduxstate/projects/selectors';
import { fetchProjects } from 'src/state/reduxstate/projects/thunks';
import { useAppDispatch } from 'src/state/reduxstate/store';
import { submenuList } from './constants';

import './Discover.scss';

export const Discover: React.FC = () => {
  const projects = useSelector(projectsSelector);
  const dispatch = useAppDispatch();

  console.log(projects);
  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  return (
    <div className="Discover">
      <LoggedInLayout>
        <Submenu menuItems={submenuList} />
        <div className="Discover__wrapper">
          {projects.map(
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
