import { AppState } from '../types';

export const profileBlockSelector = (s: AppState) => s.user.profile_block;
