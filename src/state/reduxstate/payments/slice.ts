import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Statuses } from '../projects/types';
import { PaymentsState } from './types';

const initialState: PaymentsState = {
  secret_key: '',
  payment_status: 'idle',
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
    setPaymentStatus: (
      state: { payment_status: Statuses },
      action: PayloadAction<Statuses>
    ) => {
      state.payment_status = action.payload;
    },
  },
});

export const { setSecretKey, setPaymentStatus } = paymentsSlice.actions;
export default paymentsSlice;
