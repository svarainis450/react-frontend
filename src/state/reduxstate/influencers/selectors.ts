import { AppState } from '../types';

export const projectPicksSelector = (s: AppState) =>
  s.influencers.project_picks;
export const trendingInfluencersSelector = (s: AppState) =>
  s.influencers.trending_influencers;
export const influencersDataSelector = (s: AppState) =>
  s.influencers.influencers_data;
export const influencerByNameSelector = (s: AppState) =>
  s.influencers.influencer_by_name;
