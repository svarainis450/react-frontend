import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../slice';
import { api } from '../types';
import { setSecretKey } from './slice';

const token = JSON.parse(String(localStorage.getItem('token')));

export const createPaymentIntent = createAsyncThunk(
  'payments/CREATE_PAYMENT_INTENT',
  async (_, { dispatch }) => {
    if (token) {
      try {
        const resp = fetch(`${api}/payment/init`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          // TODO: add items
          body: JSON.stringify({
            paymentMethodType: 'card',
            currency: 'eur',
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            dispatch(setSecretKey(data.token));
          });
      } catch (e) {
        console.log(e);
      }
    }
  }
);

export const completePaymentPost = createAsyncThunk(
  'payments/COMPLETED_PAYMENT_EVENT',
  async (_, { dispatch, getState }) => {
    const { user } = getState() as RootState;
    if (token && user.user_data.id) {
      try {
        fetch(`${api}/order/${user.user_data.id}/completed`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          // TODO: add items
          body: JSON.stringify({
            item: 'bought something',
            paymentMethodType: 'card',
            currency: 'eur',
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
          });
      } catch (e) {
        console.log(e);
      }
    }
  }
);
