import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchProjectsPick } from './thunks';
import { InfluencersDataType, InfluencersState } from './types';

const initialState: InfluencersState = {
  project_picks: [],
  trending_influencers: {
    skip: 0,
    trending_influencers: [],
    pages: 0,
    page: 1,
  },
  influencers_data: {
    meta: {
      skip: 0,
      take: 52,
      total: 0,
      page: 1,
      pages: 0,
    },
    influencers: [],
  },
};

const influencersSlice = createSlice({
  name: 'influencers',
  initialState,
  reducers: {
    setTrendingInfluencers: (
      state: {
        trending_influencers: InfluencersState['trending_influencers'];
      },
      action: PayloadAction<InfluencersState['trending_influencers']>
    ) => {
      state.trending_influencers = action.payload;
    },
    setInfluencersData: (
      state: { influencers_data: InfluencersState['influencers_data'] },
      action: PayloadAction<InfluencersDataType>
    ) => {
      state.influencers_data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchProjectsPick.fulfilled,
      (state, action: PayloadAction<InfluencersState['project_picks']>) => {
        state.project_picks = action.payload;
      }
    );
  },
});

export const { setInfluencersData, setTrendingInfluencers } =
  influencersSlice.actions;
export default influencersSlice;
