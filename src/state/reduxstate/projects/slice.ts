import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  fetchTrendingProjects,
  fetchProjects,
  fetchProjectsByInfluencers,
  fetchTotalSentiment,
} from './thunks';
import {
  Project,
  ProjectFilterKeys,
  ProjectsDataType,
  ProjectsState,
  Statuses,
  TrendingProject,
} from './types';

const initialState: ProjectsState = {
  project_filter_key: null,
  project_by_id: null as unknown as Project,
  trending_projects: [] as ProjectsState['trending_projects'],
  status: 'idle' as Statuses,
  top_3_bull: [],
  top_3_positive: [],
  top_3_talk_rate: [],
  top_3_bear: [],
  top_3_lowest_talk_rate: [],
  top_3_negative: [],
  projects_by_influencers: [],
  projects_data: {
    meta: {
      skip: 0,
      take: 52,
      total: 0,
      page: 0,
      pages: 0,
    },
    projects: [],
  },
  total_sentiment: 50,
};

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setTop3TalkRateProjects: (
      state: {
        top_3_talk_rate: ProjectsState['top_3_talk_rate'];
      },
      action: PayloadAction<ProjectsState['top_3_talk_rate']>
    ) => {
      state.top_3_talk_rate = action.payload;
    },
    set3LowestTalkRateProjects: (
      state: {
        top_3_lowest_talk_rate: ProjectsState['top_3_lowest_talk_rate'];
      },
      action: PayloadAction<ProjectsState['top_3_lowest_talk_rate']>
    ) => {
      state.top_3_lowest_talk_rate = action.payload;
    },
    setTop3PositiveProjects: (
      state: {
        top_3_positive: ProjectsState['top_3_positive'];
      },
      action: PayloadAction<ProjectsState['top_3_positive']>
    ) => {
      state.top_3_positive = action.payload;
    },
    setTop3NegativeProjects: (
      state: {
        top_3_negative: ProjectsState['top_3_negative'];
      },
      action: PayloadAction<ProjectsState['top_3_negative']>
    ) => {
      state.top_3_negative = action.payload;
    },
    setTop3bullProjects: (
      state: {
        top_3_bull: ProjectsState['top_3_bull'];
      },
      action: PayloadAction<ProjectsState['top_3_bull']>
    ) => {
      state.top_3_bull = action.payload;
    },
    setTop3BearProjects: (
      state: {
        top_3_bear: ProjectsState['top_3_bear'];
      },
      action: PayloadAction<ProjectsState['top_3_bear']>
    ) => {
      state.top_3_bear = action.payload;
    },
    setProjectsFilterKey: (
      state: {
        project_filter_key: ProjectFilterKeys | null;
      },
      action: PayloadAction<ProjectFilterKeys>
    ) => {
      state.project_filter_key = action.payload;
    },
    setStatus: (
      state: { status: Statuses },
      action: PayloadAction<Statuses>
    ) => {
      state.status = action.payload;
    },
    setProjectsData: (
      state: { projects_data: ProjectsState['projects_data'] },
      action: PayloadAction<ProjectsDataType>
    ) => {
      state.projects_data = action.payload;
    },
    setProjectById: (
      state: { project_by_id: ProjectsState['project_by_id'] },
      action: PayloadAction<Project>
    ) => {
      state.project_by_id = action.payload;
    },
    setTrendingProjects: (
      state: { trending_projects: ProjectsState['trending_projects'] },
      action: PayloadAction<TrendingProject[]>
    ) => {
      state.trending_projects = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProjects.rejected, (state) => {
      state.status = 'error';
    });

    builder.addCase(
      fetchProjectsByInfluencers.fulfilled,
      (
        state,
        action: PayloadAction<ProjectsState['projects_by_influencers']>
      ) => {
        state.projects_by_influencers = action.payload;
      }
    );

    builder.addCase(
      fetchTotalSentiment.fulfilled,
      (state, action: PayloadAction<ProjectsState['total_sentiment']>) => {
        state.total_sentiment = action.payload;
      }
    );
  },
});

export const {
  setStatus,
  setProjectsData,
  setProjectsFilterKey,
  setTop3PositiveProjects,
  setTop3bullProjects,
  setTop3TalkRateProjects,
  setTop3BearProjects,
  setTop3NegativeProjects,
  set3LowestTalkRateProjects,
  setProjectById,
  setTrendingProjects,
} = projectsSlice.actions;
export default projectsSlice;
