import { Dispatch, SetStateAction } from 'react';
import { InfluencerData } from '../influencers/types';
import { Project, Statuses } from '../projects/types';

export interface UserState {
  profile_block: NavClassTypes;
  favorite_projects: Project[];
  subscribed_influencers: InfluencerData[];
  user_token: string | null;
  user_data: UserDataType;
  selected_plan?: SelectedPlan;
}

export type NavClassTypes =
  | 'reports'
  | 'notifications'
  | 'terms'
  | 'privacy'
  | 'billing'
  | 'account';

export interface UserDataType extends UserUpdateType {
  id?: number;
  paypal_id: string | null;
  stripe_id: string | null;
  subscription_expires_at: string | null;
  type?: string;
}

export interface UserUpdateType {
  email?: string;
  first_name?: string;
  last_name?: string;
  img_url?: string;
  password?: string;
}
export interface FavInfluencersProjectsPayload {
  callBack?: Dispatch<SetStateAction<Statuses>>;
  id: number;
  fav_type?: 'project' | 'influencer';
}

export interface SelectedPlan {
  monthly_price: number;
  begin_price: number;
  billing_type: 'monthly' | 'yearly';
  plan: 'Potato Starter' | 'Potato Pro';
}
