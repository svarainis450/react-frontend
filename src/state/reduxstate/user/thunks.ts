import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../types';
import { setUserData } from './slice';

const token = JSON.parse(String(localStorage.getItem('token')));

export const fetchUserData = createAsyncThunk(
  'user/GET_USER_DATA',
  async (_, { dispatch }) => {
    if (token) {
      try {
        const resp = await fetch(`${api}/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((res) => res.json());

        console.log(resp);

        dispatch(setUserData(resp));

        return resp;
      } catch (e) {
        console.log(e);
      }
    }
  }
);
