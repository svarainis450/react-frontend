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
  tag: CategoryTags; //should be added to BE response
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
  rateData: {
    bullseyeIndex: number;
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
}

export enum InfluencerFilterKeys {
  TOP_EXPERT = 'top_expert',
  FOLLOWERS = 'followers',
  MOST_ACTIVE = 'active',
  BULLSEYE = 'bullseye',
  FIRST_MOVER = 'first_mover',
  REVIEWER = 'reviewer',
  RATE = 'rate',
}

export enum PaymentMethodTypes {
  PAYPAL = 'paypal',
  CARDS = 'card',
}
