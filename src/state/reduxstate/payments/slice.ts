import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Statuses } from '../projects/types';
import { PaymentsState } from './types';

const initialState: PaymentsState = {
  secret_key: '',
  payment_status: 'idle',
  has_accepted_downsell: false,
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
    setHasAcceptedDownsell: (
      state: { has_accepted_downsell: boolean },
      action: PayloadAction<boolean>
    ) => {
      state.has_accepted_downsell = action.payload;
    },
    setPaymentStatus: (
      state: { payment_status: Statuses },
      action: PayloadAction<Statuses>
    ) => {
      state.payment_status = action.payload;
    },
  },
});

export const { setSecretKey, setPaymentStatus, setHasAcceptedDownsell } =
  paymentsSlice.actions;
export default paymentsSlice;
