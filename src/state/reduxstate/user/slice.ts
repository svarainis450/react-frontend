import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NavClassTypes, UserState } from './types';

const initialState: UserState = {
  profile_block: 'notifications',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setProfileBlock: (
      state: { profile_block: NavClassTypes },
      action: PayloadAction<NavClassTypes>
    ) => {
      state.profile_block = action.payload;
    },
  },
});

export const { setProfileBlock } = userSlice.actions;
export default userSlice;
