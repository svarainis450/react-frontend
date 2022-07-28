import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NavClassTypes, UserState } from './types';

const initialState: UserState = {
  profile_block: 'notifications',
  favorite_projects: [],
  subscribed_influencers: [],
  user_token: null,
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
    setProfileBlock: (
      state: { profile_block: NavClassTypes },
      action: PayloadAction<NavClassTypes>
    ) => {
      state.profile_block = action.payload;
    },
    setFavoriteProjects: (
      state: { favorite_projects: number[] },
      action: PayloadAction<number | number[]>
    ) => {
      if (
        !Array.isArray(action.payload) &&
        !state.favorite_projects.includes(action.payload)
      ) {
        state.favorite_projects.push(action.payload);
      } else if (Array.isArray(action.payload)) {
        state.favorite_projects = action.payload;
      } else {
        return;
      }
    },
    setSubscribedInfluencers: (
      state: { subscribed_influencers: number[] },
      action: PayloadAction<number | number[]>
    ) => {
      if (
        !Array.isArray(action.payload) &&
        !state.subscribed_influencers.includes(action.payload)
      ) {
        state.subscribed_influencers.push(action.payload);
      } else if (Array.isArray(action.payload)) {
        state.subscribed_influencers = action.payload;
      } else {
        return;
      }
    },
  },
});

export const {
  setProfileBlock,
  setFavoriteProjects,
  setSubscribedInfluencers,
  setUserToken,
} = userSlice.actions;
export default userSlice;
