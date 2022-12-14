import { AppState } from '../types';

export const projectsDataSelector = (s: AppState) => s.projects.projects_data;
export const trendingProjectsSelector = (s: AppState) =>
  s.projects.trending_projects;
// export const projectPicksSelector = (s: AppState) => s.projects.project_picks;
export const projectFilterKeySelector = (s: AppState) =>
  s.projects.project_filter_key;
export const top3BullProjectsSelector = (s: AppState) => s.projects.top_3_bull;
export const top3BearProjectsSelector = (s: AppState) => s.projects.top_3_bear;
export const top3PositiveProjectsSelector = (s: AppState) =>
  s.projects.top_3_positive;
export const top3NegativeProjectsSelector = (s: AppState) =>
  s.projects.top_3_negative;
export const top3TalkRateProjectsSelector = (s: AppState) =>
  s.projects.top_3_talk_rate;
export const top3LowestTalkRateProjectsSelector = (s: AppState) =>
  s.projects.top_3_lowest_talk_rate;
export const projectsByInfluencersSelector = (s: AppState) =>
  s.projects.projects_by_influencers;
export const projectByIdSelector = (s: AppState) => s.projects.project_by_id;
export const totalSentimentSelector = (s: AppState) =>
  s.projects.total_sentiment;
