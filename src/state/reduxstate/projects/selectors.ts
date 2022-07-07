import { AppState } from '../types';

export const projectsSelector = (s: AppState) => s.projects.projects;
export const trendingProjectsSelector = (s: AppState) =>
  s.projects.trending_projects;
