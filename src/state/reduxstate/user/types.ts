import { Dispatch, SetStateAction } from 'react';
import { InfluencerData } from '../influencers/types';
import { Project, Statuses } from '../projects/types';

export interface UserState {
  profile_block: NavClassTypes;
  favorite_projects: Project[];
  subscribed_influencers: InfluencerData[];
  user_token: string | null;
  user_data: UserDataType;
}

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
  market: number; //market sentiment rate
  img?: string;
  password?: string;
  id?: number;
  subscription?: {
    type: 'pro' | 'starter';
    billingMethod: 'yearly' | 'monthly';
  };

  paymentMethod?: [
    {
      id: number;
      paymentMethod: 'Card' | 'Paypal' | 'Crypto';
      expirationDate: string;
    }
  ];
}
export interface FavInfluencersProjectsPayload {
  callBack?: Dispatch<SetStateAction<Statuses>>;
  id: number;
  fav_type?: 'project' | 'influencer';
}
