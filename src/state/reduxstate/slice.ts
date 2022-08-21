import { AnyAction, CombinedState, combineReducers } from '@reduxjs/toolkit';
import paymentsSlice from './payments/slice';
import { PaymentsState } from './payments/types';
import projectsSlice from './projects/slice';

import { ProjectsState } from './projects/types';
import userSlice from './user/slice';
import { UserState } from './user/types';

export interface RootState {
  projects: ProjectsState;
  user: UserState;
  payments: PaymentsState;
}

const combinedReducer = combineReducers<CombinedState<RootState>>({
  projects: projectsSlice.reducer,
  user: userSlice.reducer,
  payments: paymentsSlice.reducer,
});

export const rootReducer = (state: RootState | undefined, action: AnyAction) =>
  combinedReducer(state, action);
