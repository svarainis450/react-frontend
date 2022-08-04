import { AppState } from '../types';

export const projectsSelector = (s: AppState) => s.projects.projects;
export const influencersSelector = (s: AppState) => s.projects.influencers;
export const trendingProjectsSelector = (s: AppState) =>
  s.projects.trending_projects;
export const projectPicksSelector = (s: AppState) => s.projects.project_picks;
export const projectFilterKeySelector = (s: AppState) =>
  s.projects.project_filter_key;
export const top3BullProjectsSelector = (s: AppState) => s.projects.top_3_bull;
export const top3PositiveProjectsSelector = (s: AppState) =>
  s.projects.top_3_positive;
export const top3TalkRateProjectsSelector = (s: AppState) =>
  s.projects.top_3_talk_rate;
export const projectsByInfluencersSelector = (s: AppState) =>
  s.projects.projects_by_influencers;
export const mostFollowedInfluencersSelector = (s: AppState) =>
  s.projects.most_followed_influencers;
export const influencersPagesSelector = (s: AppState) =>
  s.projects.influencers_pages_data;
