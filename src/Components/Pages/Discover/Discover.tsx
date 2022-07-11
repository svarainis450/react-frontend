import { useSelector } from 'react-redux';
import { ProjectCard } from 'src/Components/Global';
import { Submenu } from 'src/Components/Global/Submenu';
import { LoggedInLayout } from 'src/Components/layouts/LoggedInLayout';
import { projectsSelector } from 'src/state/reduxstate/projects/selectors';
import { submenuList } from './constants';

import './Discover.scss';

export const Discover: React.FC = () => {
  const projects = useSelector(projectsSelector);

  console.log(projects);

  return (
    <div className="Discover">
      <LoggedInLayout>
        <Submenu menuItems={submenuList} />
        <div className="Discover__wrapper">
          <ProjectCard />
        </div>
      </LoggedInLayout>
    </div>
  );
};
