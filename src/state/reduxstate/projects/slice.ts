import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  fetchTrendingProjects,
  fetchProjects,
  fetchProjectsPick,
  fetchProjectsByInfluencers,
  fetchMostFollowedInfluencers,
} from './thunks';
import {
  Influencer,
  Project,
  ProjectFilterKeys,
  ProjectsState,
  Statuses,
} from './types';

const initialState: ProjectsState = {
  projects: [] as ProjectsState['projects'],
  project_filter_key: null,
  project_by_id: null as unknown as Project,
  trending_projects: [] as ProjectsState['trending_projects'],
  status: 'idle' as Statuses,
  influencers_picks: [],
  project_picks: [] as ProjectsState['project_picks'],
  influencers: [] as ProjectsState['influencers'],
  top_3_bull: [],
  top_3_positive: [],
  top_3_talk_rate: [],
  projects_by_influencers: [],
  most_followed_influencers: [],
  influencers_pages_data: { page: 0, pages: 0 },
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
    setTop3PositiveProjects: (
      state: {
        top_3_positive: ProjectsState['top_3_positive'];
      },
      action: PayloadAction<ProjectsState['top_3_positive']>
    ) => {
      state.top_3_positive = action.payload;
    },
    setTop3bullProjects: (
      state: {
        top_3_bull: ProjectsState['top_3_bull'];
      },
      action: PayloadAction<ProjectsState['top_3_bull']>
    ) => {
      state.top_3_bull = action.payload;
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
    setProjects: (
      state: { projects: ProjectsState['projects'] },
      action: PayloadAction<Project[]>
    ) => {
      state.projects = action.payload;
    },
    setInfluencers: (
      state: { influencers: ProjectsState['influencers'] },
      action: PayloadAction<Influencer[]>
    ) => {
      state.influencers = action.payload;
    },
    setInfluencersPages: (
      state: {
        influencers_pages_data: ProjectsState['influencers_pages_data'];
      },
      action: PayloadAction<{ page: number; pages: number }>
    ) => {
      state.influencers_pages_data = action.payload;
    },
    setProjectById: (
      state: { project_by_id: ProjectsState['project_by_id'] },
      action: PayloadAction<Project>
    ) => {
      state.project_by_id = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProjects.rejected, (state) => {
      state.status = 'error';
    });
    builder.addCase(
      fetchTrendingProjects.fulfilled,
      (state, action: PayloadAction<ProjectsState['trending_projects']>) => {
        state.trending_projects = action.payload;
      }
    );
    builder.addCase(
      fetchProjectsPick.fulfilled,
      (state, action: PayloadAction<ProjectsState['project_picks']>) => {
        state.project_picks = action.payload;
      }
    );
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
      fetchMostFollowedInfluencers.fulfilled,
      (
        state,
        action: PayloadAction<ProjectsState['most_followed_influencers']>
      ) => {
        state.most_followed_influencers = action.payload;
      }
    );
  },
});

export const {
  setStatus,
  setProjectsFilterKey,
  setTop3PositiveProjects,
  setTop3bullProjects,
  setTop3TalkRateProjects,
  setProjects,
  setProjectById,
  setInfluencers,
  setInfluencersPages,
} = projectsSlice.actions;
export default projectsSlice;
