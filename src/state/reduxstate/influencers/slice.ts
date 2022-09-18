import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchProjectsPick } from './thunks';
import { Influencer, InfluencersState } from './types';

const initialState: InfluencersState = {
  project_picks: [],
  trending_influencers: {
    skip: 0,
    trending_influencers: [],
    pages: 0,
    page: 1,
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
    //   set3LowestTalkRateProjects: (
    //     state: {
    //       top_3_lowest_talk_rate: InfluencersState['top_3_lowest_talk_rate'];
    //     },
    //     action: PayloadAction<InfluencersState['top_3_lowest_talk_rate']>
    //   ) => {
    //     state.top_3_lowest_talk_rate = action.payload;
    //   },
    //   setTop3PositiveProjects: (
    //     state: {
    //       top_3_positive: InfluencersState['top_3_positive'];
    //     },
    //     action: PayloadAction<InfluencersState['top_3_positive']>
    //   ) => {
    //     state.top_3_positive = action.payload;
    //   },
    //   setTop3NegativeProjects: (
    //     state: {
    //       top_3_negative: InfluencersState['top_3_negative'];
    //     },
    //     action: PayloadAction<InfluencersState['top_3_negative']>
    //   ) => {
    //     state.top_3_negative = action.payload;
    //   },
    //   setTop3bullProjects: (
    //     state: {
    //       top_3_bull: InfluencersState['top_3_bull'];
    //     },
    //     action: PayloadAction<InfluencersState['top_3_bull']>
    //   ) => {
    //     state.top_3_bull = action.payload;
    //   },
    //   setTop3BearProjects: (
    //     state: {
    //       top_3_bear: InfluencersState['top_3_bear'];
    //     },
    //     action: PayloadAction<InfluencersState['top_3_bear']>
    //   ) => {
    //     state.top_3_bear = action.payload;
    //   },
    //   setProjectsFilterKey: (
    //     state: {
    //       project_filter_key: ProjectFilterKeys | null;
    //     },
    //     action: PayloadAction<ProjectFilterKeys>
    //   ) => {
    //     state.project_filter_key = action.payload;
    //   },
    //   setStatus: (
    //     state: { status: Statuses },
    //     action: PayloadAction<Statuses>
    //   ) => {
    //     state.status = action.payload;
    //   },
    //   setProjects: (
    //     state: { projects: InfluencersState['projects'] },
    //     action: PayloadAction<Project[]>
    //   ) => {
    //     state.projects = action.payload;
    //   },
    //   setProjectsCount: (
    //     state: { projects_count: InfluencersState['projects_count'] },
    //     action: PayloadAction<number>
    //   ) => {
    //     state.projects_count = action.payload;
    //   },
    //   setInfluencers: (
    //     state: { influencers: InfluencersState['influencers'] },
    //     action: PayloadAction<Influencer[]>
    //   ) => {
    //     state.influencers = action.payload;
    //   },
    //   setInfluencersCount: (
    //     state: { influencers_count: InfluencersState['influencers_count'] },
    //     action: PayloadAction<number>
    //   ) => {
    //     state.influencers_count = action.payload;
    //   },
    //   setInfluencersPages: (
    //     state: {
    //       influencers_pages_data: InfluencersState['influencers_pages_data'];
    //     },
    //     action: PayloadAction<{ page: number; pages: number }>
    //   ) => {
    //     state.influencers_pages_data = action.payload;
    //   },
    //   setProjectById: (
    //     state: { project_by_id: InfluencersState['project_by_id'] },
    //     action: PayloadAction<Project>
    //   ) => {
    //     state.project_by_id = action.payload;
    //   },
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

export const {
  setTrendingInfluencers,
  // setStatus,
  // setProjectsFilterKey,
  // setTop3PositiveProjects,
  // setTop3bullProjects,
  // setTop3TalkRateProjects,
  // setTop3BearProjects,
  // setTop3NegativeProjects,
  // set3LowestTalkRateProjects,
  // setProjects,
  // setProjectById,
  // setInfluencers,
  // setInfluencersCount,
  // setInfluencersPages,
  // setProjectsCount,
} = influencersSlice.actions;
export default influencersSlice;
