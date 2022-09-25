import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  projectByIdSelector,
  projectsDataSelector,
} from 'src/state/reduxstate/projects/selectors';
import { favoriteProjectsSelector } from 'src/state/reduxstate/user/selectors';

export const useForYouPageData = () => {
  const projectByIdState = useSelector(projectByIdSelector);
  const favoriteProjects = useSelector(favoriteProjectsSelector);
  const { projects } = useSelector(projectsDataSelector);

  console.log(projectByIdState);

  useEffect(() => {}, [projectByIdState, favoriteProjects, projects]);

  if (projectByIdState) {
    const projectById = [projectByIdState];
    return projectById;
  } else if (favoriteProjects && favoriteProjects.length > 0) {
    return favoriteProjects;
  } else if (projects && projects.length > 0) {
    return projects;
  }
};
