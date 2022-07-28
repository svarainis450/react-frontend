import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  fetchTrendingProjects,
  fetchProjects,
  fetchProjectsPick,
  fetchInfluencers,
  fetchProjectsByInfluencers,
} from './thunks';
import { Project, ProjectFilterKeys, ProjectsState, Statuses } from './types';

const initialState: ProjectsState = {
  projects: [] as ProjectsState['projects'],
  project_filter_key: null,
  trending_projects: [] as ProjectsState['trending_projects'],
  status: 'idle' as Statuses,
  influencers_picks: [],
  project_picks: [] as ProjectsState['project_picks'],
  influencers: [] as ProjectsState['influencers'],
  top_3_bull: [],
  top_3_positive: [],
  top_3_talk_rate: [],
  projects_by_influencers: [],
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
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchProjects.fulfilled,
      (state, action: PayloadAction<ProjectsState['projects']>) => {
        state.projects = action.payload;
        state.status = 'success';
      }
    );
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
      fetchInfluencers.fulfilled,
      (state, action: PayloadAction<ProjectsState['influencers']>) => {
        state.influencers = action.payload;
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
  },
});

export const {
  setStatus,
  setProjectsFilterKey,
  setTop3PositiveProjects,
  setTop3bullProjects,
  setTop3TalkRateProjects,
} = projectsSlice.actions;
export default projectsSlice;
