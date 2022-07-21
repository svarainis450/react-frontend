import { Project } from '../projects/types';

export type NavClassTypes = 'notifications' | 'terms' | 'privacy' | 'billing';

export interface UserState {
  profile_block: NavClassTypes;
  favorite_projects: number[];
}
