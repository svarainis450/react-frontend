import { CategoryTags } from 'src/Components/Global/TrendsElements/types';
import { Project } from '../projects/types';

export interface InfluencersState {
  project_picks: Influencer[];
  trending_influencers: {
    trending_influencers: Influencer[];
    pages: number;
    page: number;
    skip: number;
  };
}

export interface Influencer {
  twitter_user: {
    id: number;
    twitter_username: string;
    twitter_displayname: string;
    is_active: false;
    name: string;
    surname: string;
    twitter_img_url: string;
    twitter_followers: number;
    twitter_is_verified: false;
    twitter_description: string;
    friends_count: number;
    statuses_count: number;
    favourites_count: number;
    listed_count: number;
    external_link: string;
    influence_score: number;
    bullseye_score: number;
    first_mover_reviewer_score: number;
  };
  followers: number;
  category: CategoryTags;
  post_count: number;
  channel: string;
  project: Project[];
  link_to_post: string;
}
