import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  fetchTrendingProjects,
  fetchProjects,
  fetchProjectsPick,
  fetchInfluencers,
} from './thunks';
import { ProjectFilterKeys, ProjectsState, Statuses } from './types';

const initialState: ProjectsState = {
  projects: [] as ProjectsState['projects'],
  project_filter_key: null,
  trending_projects: [] as ProjectsState['trending_projects'],
  status: 'idle' as Statuses,
  influencers_picks: [],
  project_picks: [] as ProjectsState['project_picks'],
  influencers: [] as ProjectsState['project_picks'],
};

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
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
  },
});

export const { setStatus, setProjectsFilterKey } = projectsSlice.actions;
export default projectsSlice;
