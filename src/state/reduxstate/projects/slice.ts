import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fethchProjects } from './thunks';
import { ProjectsState, Statuses } from './types';

const initialState: ProjectsState = {
  projects: [] as ProjectsState['projects'],
  trending_projects: [] as ProjectsState['trending_projects'],
  status: 'idle',
};

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<Statuses>) => {
      state.status = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fethchProjects.fulfilled,
      (state, action: PayloadAction<ProjectsState['projects']>) => {
        state.projects = action.payload;
        state.status = 'success';
      }
    );
    builder.addCase(fethchProjects.rejected, (state) => {
      state.status = 'error';
    });
  },
});

export const {} = projectsSlice.actions;
export default projectsSlice;
