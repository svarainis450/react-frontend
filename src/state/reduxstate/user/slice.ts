import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InfluencerData } from '../influencers/types';
import { Project } from '../projects/types';
import { NavClassTypes, SelectedPlan, UserDataType, UserState } from './types';

const initialState: UserState = {
  profile_block: 'notifications',
  favorite_projects: [],
  subscribed_influencers: [],
  user_token: null,
  user_data: {
    email: '',
    first_name: '',
    last_name: '',
    img_url: undefined,
    id: 123,
    paypal_id: null,
    stripe_id: null,
    subscription_expires_at: null,
    password: '',
    billing_history: [],
  },
  selected_plan: undefined,
  reset_token: undefined,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserToken: (
      state: { user_token: string | null },
      action: PayloadAction<string>
    ) => {
      state.user_token = action.payload;
    },
    setResetToken: (
      state: { reset_token: string | undefined },
      action: PayloadAction<string>
    ) => {
      state.reset_token = action.payload;
    },
    setProfileBlock: (
      state: { profile_block: NavClassTypes },
      action: PayloadAction<NavClassTypes>
    ) => {
      state.profile_block = action.payload;
    },
    setFavoriteProjects: (
      state: { favorite_projects: Project[] },
      action: PayloadAction<Project[]>
    ) => {
      state.favorite_projects = action.payload;
    },
    setSubscribedInfluencers: (
      state: { subscribed_influencers: InfluencerData[] },
      action: PayloadAction<InfluencerData[]>
    ) => {
      state.subscribed_influencers = action.payload;
    },
    setUserData: (
      state: { user_data: UserDataType },
      action: PayloadAction<UserDataType>
    ) => {
      state.user_data = action.payload;
    },
    setSelectedPlan: (
      state: { selected_plan?: SelectedPlan },
      action: PayloadAction<SelectedPlan>
    ) => {
      state.selected_plan = action.payload;
    },
  },
});

export const {
  setSelectedPlan,
  setProfileBlock,
  setFavoriteProjects,
  setSubscribedInfluencers,
  setUserToken,
  setUserData,
  setResetToken,
} = userSlice.actions;
export default userSlice;
