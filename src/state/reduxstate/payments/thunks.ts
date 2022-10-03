import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../slice';
import { api, apiv1 } from '../types';
import { setSecretKey } from './slice';

const token = JSON.parse(String(localStorage.getItem('token')));

interface PaymentPayload {
  name: string;
  item_description: string;
  phone: string;
  price: string;
  customer_description: string;
}

export const createPaymentIntent = createAsyncThunk(
  'payments/CREATE_PAYMENT_INTENT',
  async (data: PaymentPayload, { dispatch }) => {
    if (token) {
      try {
        const resp = fetch(`${apiv1}/stripe`, {
          method: 'POST',
          headers: {
            e: 'application/json',
            Authorization: `Bearer ${token}`,
          },
          // TODO: add items
          body: JSON.stringify(data),
        })
          .then((res) => res.json())
          .then((data) => {
            dispatch(setSecretKey(data.client_secret));
          });
      } catch (e) {
        console.log(e);
      }
    }
  }
);

//OLD
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
        }).then((res) => res.json());
      } catch (e) {
        console.log(e);
      }
    }
  }
);
