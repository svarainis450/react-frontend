import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ModalState } from './types';

const initialState: ModalState = {
  type: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setModalType: (state, action: PayloadAction<ModalState['type']>) => {
      state.type = action.payload;
    },
  },
});

export default modalSlice;
