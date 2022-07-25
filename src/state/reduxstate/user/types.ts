export type NavClassTypes =
  | 'notifications'
  | 'terms'
  | 'privacy'
  | 'billing'
  | 'account';

export interface UserState {
  profile_block: NavClassTypes;
  favorite_projects: number[];
}
