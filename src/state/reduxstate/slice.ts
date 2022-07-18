import { AnyAction, CombinedState, combineReducers } from '@reduxjs/toolkit';
import projectsSlice from './projects/slice';

import { ProjectsState } from './projects/types';
import userSlice from './user/slice';
import { UserState } from './user/types';

export interface RootState {
  projects: ProjectsState;
  user: UserState;
}

const combinedReducer = combineReducers<CombinedState<RootState>>({
  projects: projectsSlice.reducer,
  user: userSlice.reducer,
});

export const rootReducer = (state: RootState | undefined, action: AnyAction) =>
  combinedReducer(state, action);
