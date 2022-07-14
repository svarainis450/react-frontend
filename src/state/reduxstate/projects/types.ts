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
  symbol: string;
  started: string;
  img: string;
  rateData: RateData;
  influencers: [];
  coinbaseUrl: string | null;
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
  tag: {
    name: CategoryTags;
    color: string;
  };
  projects: TrendingProject[];
}

export interface ProjectsState {
  projects: Project[];
  status: Statuses;
  trending_projects: TrendingProject[];
  influencers_picks: [];
  project_picks: ProjectPicks[];
}
