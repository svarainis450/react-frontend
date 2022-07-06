import { createAsyncThunk } from '@reduxjs/toolkit';
import { api, demoToken } from '../types';

//NOTE: token should come from the state after login or local storge if it will be saved here

export const fethchProjects = createAsyncThunk(
  'projects/GET_PROJECTS',
  async () => {
    try {
      const resp = await fetch(`${api}/projects`, {
        headers: {
          Authorization: `Bearer ${demoToken}`,
        },
      }).then((res) => res.json());
      return resp;
    } catch (e) {
      console.log(e);
    }
  }
);
