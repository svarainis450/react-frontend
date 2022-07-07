import { AnyAction, CombinedState, combineReducers } from '@reduxjs/toolkit';
import projectsSlice from './projects/slice';

import { ProjectsState } from './projects/types';

export interface RootState {
  projects: ProjectsState;
  //users: for auth should be used in redux as well
}

const combinedReducer = combineReducers<CombinedState<RootState>>({
  projects: projectsSlice.reducer,
});

export const rootReducer = (state: RootState | undefined, action: AnyAction) =>
  combinedReducer(state, action);
