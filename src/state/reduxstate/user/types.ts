export type NavClassTypes =
  | 'notifications'
  | 'terms'
  | 'privacy'
  | 'billing'
  | 'account';

export interface UserDataType {
  email: string;
  firstName: string;
  lastName: string;
  market: number;
  img?: any;
  password?: string;
}

export interface UserState {
  profile_block: NavClassTypes;
  favorite_projects: number[];
  subscribed_influencers: number[];
  user_token: string | null;
  user_data: UserDataType;
}
