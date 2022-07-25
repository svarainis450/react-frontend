import { AppState } from '../types';

export const projectsSelector = (s: AppState) => s.projects.projects;
export const influencersSelector = (s: AppState) => s.projects.influencers;
export const trendingProjectsSelector = (s: AppState) =>
  s.projects.trending_projects;
export const projectPicksSelector = (s: AppState) => s.projects.project_picks;
export const projectFilterKeySelector = (s: AppState) =>
  s.projects.project_filter_key;
