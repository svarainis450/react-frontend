import { Dispatch, SetStateAction } from 'react';
import { Influencer, Project, Statuses } from '../projects/types';

export type NavClassTypes =
  | 'reports'
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
  favorite_projects: Project[];
  subscribed_influencers: Influencer[];
  user_token: string | null;
  user_data: UserDataType;
}

export interface FavInfluencersProjectsPayload {
  callBack: Dispatch<SetStateAction<Statuses>>;
  id: number;
  fav_type: 'project' | 'influencer';
}
