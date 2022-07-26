import { AppState } from '../types';

export const profileBlockSelector = (s: AppState) => s.user.profile_block;
export const favoriteProjectsSelector = (s: AppState) =>
  s.user.favorite_projects;
export const subscribedInfluencersSelector = (s: AppState) =>
  s.user.subscribed_influencers;
