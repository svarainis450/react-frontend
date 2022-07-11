import { createAsyncThunk } from '@reduxjs/toolkit';
import { api, demoToken } from '../types';

//NOTE: token should come from the state after login or local storge if it will be saved here

export const fethchProjects = createAsyncThunk(
  'projects/GET_PROJECTS',
  async () => {
    try {
      const resp = await fetch(`${api}/projects`, {
        headers: {
          accept: 'images/png',
          Authorization: `Bearer ${demoToken}`,
        },
      }).then((res) => res.json());
      console.log(resp);
      return resp;
    } catch (e) {
      console.log(e);
    }
  }
);

export const fetchTrendingProjects = createAsyncThunk(
  'projects/GET_TRENDING_PROJECTS',
  async () => {
    try {
      const resp = await fetch(`${api}/projects/trending`, {
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
