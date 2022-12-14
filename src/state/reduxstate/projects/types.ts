import { CategoryTags } from 'src/Components/Global/TrendsElements/types';

export interface ProjectsState {
  trending_projects: TrendingProject[];
  top_3_bull: TopOrLowestProject[];
  top_3_talk_rate: TopOrLowestProject[];
  top_3_positive: TopOrLowestProject[];
  top_3_lowest_talk_rate: TopOrLowestProject[];
  top_3_negative: TopOrLowestProject[];
  top_3_bear: TopOrLowestProject[];
  projects_by_influencers: Project[];
  projects_data: ProjectsDataType;
  total_sentiment: number;

  // project_picks: Project[];

  //OLD API

  project_filter_key: ProjectFilterKeys | null;
  project_by_id: Project;
  status: Statuses;
}
export interface RateData {
  talkRate: number;
  talkRateChanges: number;
  positiveRatio: number;
  bullRatio: number;
}

export interface ProjectsDataType {
  projects: Project[];
  meta?: {
    skip: number;
    page: number;
    pages: number;
    total: number;
    take: number;
  };
}

export interface Project {
  id: number;
  coinbase_url: string;
  nft_address: string;
  first_historical_data: string;
  img_url: string;
  max_scraped_tweet_id: number;
  name: string;
  symbol?: string;
  price: string;
  type: CategoryTags;
  opensea_project_url: string;
  talk_rate_score: number;
  sentiment_score: number;
  bull_bear_score: number;
  talk_rate_daily_change: number;
  full_volume: null;
  project_twitter_user_card: ProjectInfluencer[];
  base_currency: string;
  chart_price: {
    date: string;
    three_hour_price: string;
    one_day_price: string;
    one_week_price: string;
    one_month_price: string;
    three_months_price: string;
    all_price: string;
  };
  chart_sentiment: {
    date: string;
    three_hour_sentiment: string;
    one_day_sentiment: string;
    one_week_sentiment: string;
    one_month_sentiment: string;
    three_months_sentiment: string;
    all_sentiment: string;
  };
  chart_talk_rate: {
    date: string;
    three_hour_talk_rate: string;
    one_day_talk_rate: string;
    one_week_talk_rate: string;
    one_month_talk_rate: string;
    three_months_talk_rate: string;
    all_talk_rate: string;
  };
  chart_volume: {
    date: string;
    three_hour_volume: string;
    one_day_volume: string;
    one_week_volume: string;
    one_month_volume: string;
    three_months_volume: string;
    all_volume: string;
  };

  ///TODO: remove OLD TYPES

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

export interface ProjectInfluencer {
  order: 1;
  sentiment: 'NEGATIVE' | 'POSITIVE';
  twitter_user_twitter_followers: string;
  tweet: {
    id: string;
    created_at: string;
    cleaned_content: string;
    like_count: number;
    reply_count: number;
    retweet_count: number;
    quote_count: number;
    conversation_id: string;
    project_names: string;
    twitter_user_id: string;
    scraped_at: null | number;
    is_advertisement: string;
    sentiment: 'NEGATIVE' | 'POSITIVE' | 'NEUTRAL';
    mentioned_users: string;
    retweeted_tweet: null | number;
    quoted_tweet: null | number;
    in_reply_to_tweet_id: string;
    in_reply_to_user: string;
    hashtags: null | number;
    cashtags: null | number;
  };
  twitter_user: {
    twitter_img_url: string;
    twitter_username: string;
    twitter_displayname: string;
    external_link: string;
  };
}

export interface TrendingProject {
  project_id: number;
  place: number;
  category: CategoryTags;
  project_name: string;
  project_symbol: string;
  mentions_num: number;
  project_img_url: string;
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

export type Statuses =
  | 'idle'
  | 'pending'
  | 'success'
  | 'error'
  | 'succeeded'
  | 'loading'
  | 'unauthorized';

export interface ProjectPicks {
  project_id: number;
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
  id: number;
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
  POSITIVE = 'positiveNe',
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
  FOLLOWERS = 'twitter_followers',
  MOST_ACTIVE = 'active',
  BULLSEYE = 'bullseye_score',
  FIRST_MOVER = 'first_mover_reviewer_score', //ASC
  REVIEWER = 'first_mover_reviewer_score', //DESC
  CATEGORY = 'category',
  INFLUENCE_RATE = 'influence_score',
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

export interface TopOrLowestProject {
  project_id: number;
  category: CategoryTags;
  place: number;
  project_name: string;
  project_symbol: string;
  sentiment?: number;
  talk_rate?: number;
  bull?: number;
  img_url: string;
}

export type TrendsDateFilterType = 'daily' | 'weekly';
