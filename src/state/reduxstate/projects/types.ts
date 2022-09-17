import { CategoryTags } from 'src/Components/Global/TrendsElements/types';

export interface ProjectsState {
  trending_projects: TrendingProject[];

  //OLD API

  projects: Project[];
  project_filter_key: ProjectFilterKeys | null;
  project_by_id: Project;
  projects_count: number;
  status: Statuses;
  influencers: Influencer[];
  influencers_count: number;
  influencers_picks: [];
  project_picks: ProjectPicks[];
  top_3_bull: Project[];
  top_3_talk_rate: Project[];
  top_3_positive: Project[];
  top_3_lowest_talk_rate: Project[];
  top_3_negative: Project[];
  top_3_bear: Project[];
  projects_by_influencers: Project[];
  most_followed_influencers: Influencer[];
  influencers_pages_data: {
    page: number;
    pages: number;
  };
}
export interface RateData {
  talkRate: number;
  talkRateChanges: number;
  positiveRatio: number;
  bullRatio: number;
}

export interface Project {
  id: number;
  name: string;
  symbol?: string;
  started?: string;
  img: string;
  rateData: RateData;
  influencers?: [];
  coinbaseUrl?: string | null;
  openSeaUrl?: string | null;
  tag: {
    name: CategoryTags;
    color: string;
  };
  description?: string;
}

export interface TrendingProject {
  place: number;
  category: typeof CategoryTags;
  project_name: string;
  project_symbol: string;
  mentions_num: number;
  //TODO: REMOVE
  id: number;
  name: string;
  ticker: string;
  additional: string;
  img: string;
  tag: {
    name: CategoryTags;
    color: string;
  };
}

export type Statuses = 'idle' | 'pending' | 'success' | 'error';

export interface ProjectPicks {
  id: number;
  name: string;
  tagName: string;
  postCount: number;
  channel: string;
  img: string;
  tag: {
    name: CategoryTags;
    color: string;
  };
  projects?: TrendingProject[];
}

export interface Influencer extends ProjectPicks {
  flag?: 'expert' | null;
  bullseye: number;
  rateData: {
    reviewer: number;
  };
  followers: number;
  posts: number;
  focus: CategoryTags[];
  social?: {
    twitter: string;
  };
}

export const tags = [
  CategoryTags.coins,
  CategoryTags.nft,
  // CategoryTags.DAO,
  // CategoryTags.meta,
  // CategoryTags.defi,
];

export enum ProjectFilterKeys {
  TALK_RATE = 'talk_rate',
  POSITIVE = 'positive',
  NEGATIVE = 'negative',
  BULL = 'bull',
  BEAR = 'bear',
  NEWEST = 'newest',
  OLDEST = 'oldest',
  CATEGORY = 'category',
  NAME = 'name',
  NONE = '',
}

export enum InfluencerFilterKeys {
  TOP_EXPERT = 'top_expert',
  FOLLOWERS = 'followers',
  MOST_ACTIVE = 'active',
  BULLSEYE = 'bullseye',
  FIRST_MOVER = 'first_mover',
  REVIEWER = 'reviewer',
  CATEGORY = 'category',
  RATE = 'rate',
  NAME = 'name',
  NONE = '',
}

export enum PaymentMethodTypes {
  PAYPAL = 'paypal',
  CARDS = 'card',
  CRYPTO = 'crypto',
}

export enum PaymentDetailTypes {
  COINGATE = 'Coingate',
  PAYPAl = 'Paypal Account',
  VISA = 'Visa',
  MASTERCARD = 'Mastercard',
}

export type SubmenuFilters = 'daily' | 'weekly' | 'upcomming';
