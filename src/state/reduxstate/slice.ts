import { AnyAction, CombinedState, combineReducers } from '@reduxjs/toolkit';
import influencersSlice from './influencers/slice';
import { InfluencersState } from './influencers/types';
import modalSlice from './modals/slice';
import { ModalState } from './modals/types';
import paymentsSlice from './payments/slice';
import { PaymentsState } from './payments/types';
import projectsSlice from './projects/slice';

import { ProjectsState } from './projects/types';
import userSlice from './user/slice';
import { UserState } from './user/types';

export interface RootState {
  projects: ProjectsState;
  influencers: InfluencersState;
  user: UserState;
  payments: PaymentsState;
  modals: ModalState;
}

const combinedReducer = combineReducers<CombinedState<RootState>>({
  projects: projectsSlice.reducer,
  user: userSlice.reducer,
  payments: paymentsSlice.reducer,
  influencers: influencersSlice.reducer,
  modals: modalSlice.reducer,
});

export const rootReducer = (state: RootState | undefined, action: AnyAction) =>
  combinedReducer(state, action);
