import { CategoryTags } from 'src/Components/Global/TrendsElements/types';

export interface Project {
  id: number;
  name: string;
  symbol: string;
  started: string;
  img: string;
  rateData: {
    talkRate: number;
    talkRateChanges: number;
    positiveRatio: number;
    bullRatio: number;
  };
  influencers: [];
  coinbaseUrl: string | null;
  tag: CategoryTags; //should be added to BE response
}

export interface TrendingProject {
  id: number;
  name: string;
  ticker: string;
  additional: string;
  tag: {
    name: CategoryTags;
    color: string;
  };
}

export type Statuses = 'idle' | 'pending' | 'success' | 'error';

export interface ProjectsState {
  projects: Project[];
  status: Statuses;
  trending_projects: TrendingProject[];
}
