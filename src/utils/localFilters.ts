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
      .sort((a, b) => b.talk_rate_score - a.talk_rate_score);
    return filteredProjects;
  } else if (projects && filter === ProjectFilterKeys.POSITIVE) {
    const filteredProjects = projects
      .slice()
      .sort((a, b) => b.sentiment_score - a.sentiment_score);
    return filteredProjects;
  } else if (projects && filter === ProjectFilterKeys.BULL) {
    const filteredProjects = projects
      .slice()
      .sort((a, b) => b.bull_bear_score - a.bull_bear_score);
    return filteredProjects;
  }
};

export const filterProjectsByName = (
  projects: Project[],
  inputValue: string
) => {
  projects.filter((project) => project.name.includes(inputValue));
};
