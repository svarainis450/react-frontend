import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PaymentsState } from './types';

const initialState: PaymentsState = {
  secret_key: '',
};

const paymentsSlice = createSlice({
  name: 'payments',
  initialState,
  reducers: {
    setSecretKey: (
      state: { secret_key: string },
      action: PayloadAction<string>
    ) => {
      state.secret_key = action.payload;
    },
  },
});

export const { setSecretKey } = paymentsSlice.actions;
export default paymentsSlice;
