import { CategoryTags } from 'src/Components/Global/TrendsElements/types';

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
  }; //should be added to BE response
}

export interface TrendingProject {
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
}

export interface ProjectsState {
  projects: Project[];
  project_filter_key: ProjectFilterKeys | null;
  status: Statuses;
  trending_projects: TrendingProject[];
  influencers: Influencer[];
  influencers_picks: [];
  project_picks: ProjectPicks[];
  top_3_bull: Project[];
  top_3_talk_rate: Project[];
  top_3_positive: Project[];
  projects_by_influencers: Project[];
  most_followed_influencers: Influencer[];
  influencers_pages_data: {
    page: number;
    pages: number;
  };
}

export const tags = [
  CategoryTags.coins,
  CategoryTags.NFT,
  CategoryTags.DAO,
  CategoryTags.meta,
  CategoryTags.defi,
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

export type SubmenuFilters = 'today' | 'last-week' | 'upcomming';
