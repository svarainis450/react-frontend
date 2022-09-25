import { AppState } from '../types';

export const profileBlockSelector = (s: AppState) => s.user.profile_block;
export const favoriteProjectsSelector = (s: AppState) =>
  s.user.favorite_projects;
export const subscribedInfluencersSelector = (s: AppState) =>
  s.user.subscribed_influencers;
export const userTokenSelector = (s: AppState) => s.user.user_token;
export const userDataSelector = (s: AppState) => s.user.user_data;
export const selectedPlanSelector = (s: AppState) => s.user.selected_plan;
