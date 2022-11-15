import { Dispatch, SetStateAction } from 'react';
import {
  StripeProductKeys,
  SubsPriceIdStripe,
} from 'src/globalConstants/prices';
import { InfluencerData } from '../influencers/types';
import { Project, Statuses } from '../projects/types';

export interface UserState {
  profile_block: NavClassTypes;
  favorite_projects: Project[];
  subscribed_influencers: InfluencerData[];
  user_token: string | null;
  user_data: UserDataType;
  selected_plan?: SelectedPlan;
  reset_token: string | undefined;
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
  billing_history: BillingHistory[];
}

export interface BillingHistory {
  plan: string;
  billing_type: BillingType;
  price: number;
  billing_date: string;
}

export type BillingType = 'monthly' | 'yearly';

export interface UserUpdateType {
  email?: string;
  first_name?: string;
  last_name?: string;
  img_url?: string;
  password?: string;
  type?: PlanType;
  subscription_expires_at?: string | null;
  invoice_email?: string;
}
export interface FavInfluencersProjectsPayload {
  callBack?: Dispatch<SetStateAction<Statuses>>;
  id: number;
  fav_type?: 'project' | 'influencer';
}

export interface SelectedPlan {
  key: string;
  price?: number;
  final_price: number;
  stripe_product: StripeProductKeys;
  stripe_price_id: SubsPriceIdStripe | string;
  subscription_period?: number;
  title?: string;
  isFeatured?: boolean,
  togglePayment?: boolean,
  downsell?: {
    final_price: number;
    price: number;
    product_stripe?: StripeProductKeys;
    stripe_price_id?: SubsPriceIdStripe | string;
  }
}

export type PlanType = 'Potato Starter' | 'Potato Pro' | string;
