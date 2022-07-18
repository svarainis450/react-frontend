import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InfluencerData } from 'src/Components/Global';
import {
  fetchTrendingProjects,
  fetchProjects,
  fetchProjectsPick,
} from './thunks';
import { ProjectsState, Statuses } from './types';

const initialState: ProjectsState = {
  projects: [] as ProjectsState['projects'],
  trending_projects: [] as ProjectsState['trending_projects'],
  status: 'idle' as Statuses,
  influencers_picks: [],
  project_picks: [] as ProjectsState['project_picks'],
  filtered_influencers_picks: [] as ProjectsState['filtered_influencers_picks'],
};

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setFilteredInflPicks: (
      state: { filtered_influencers_picks: InfluencerData[] },
      action: PayloadAction<InfluencerData[]>
    ) => {
      state.filtered_influencers_picks = action.payload;
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
  },
});

export const { setStatus, setFilteredInflPicks } = projectsSlice.actions;
export default projectsSlice;
