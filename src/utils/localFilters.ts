import {
  Project,
  ProjectFilterKeys,
} from 'src/state/reduxstate/projects/types';

export const filterProjectsLocaly = (
  projects: Project[],
  filter: ProjectFilterKeys
) => {
  if (projects && filter === ProjectFilterKeys.TALK_RATE) {
    const filteredProjects = projects
      .slice()
      .sort((a, b) => b.rateData.talkRate - a.rateData.talkRate);
    return filteredProjects;
  } else if (projects && filter === ProjectFilterKeys.POSITIVE) {
    const filteredProjects = projects
      .slice()
      .sort((a, b) => b.rateData.positiveRatio - a.rateData.positiveRatio);
    return filteredProjects;
  } else if (projects && filter === ProjectFilterKeys.BULL) {
    const filteredProjects = projects
      .slice()
      .sort((a, b) => b.rateData.bullRatio - a.rateData.bullRatio);
    return filteredProjects;
  }
};

export const filterProjectsByName = (
  projects: Project[],
  inputValue: string
) => {
  projects.filter((project) => project.name.includes(inputValue));
};
