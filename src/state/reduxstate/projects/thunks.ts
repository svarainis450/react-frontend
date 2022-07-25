import { createAsyncThunk } from '@reduxjs/toolkit';
import { api, demoToken } from '../types';
import { InfluencerFilterKeys, ProjectFilterKeys } from './types';

//NOTE: token should come from the state after login or local storge if it will be saved here

export const fetchProjects = createAsyncThunk(
  'projects/GET_PROJECTS',
  async (filterKey?: ProjectFilterKeys) => {
    try {
      const resp = await fetch(`${api}/projects?limit=50&offset=30`, {
        headers: {
          Authorization: `Bearer ${demoToken}`,
        },
      }).then((res) => res.json());
      return resp.result;
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
      return resp.result;
    } catch (e) {
      console.log(e);
    }
  }
);

//TODO: add the variable for /${today}
export const fetchProjectsPick = createAsyncThunk(
  'projects/GET_PROJECT_PICKS',
  async () => {
    try {
      const resp = await fetch(`${api}/influencers/today?limit=10&offset=0`, {
        headers: {
          Authorization: `Bearer ${demoToken}`,
        },
      }).then((res) => res.json());
      return resp.result;
    } catch (e) {
      console.log(e);
    }
  }
);

export const fetchInfluencers = createAsyncThunk(
  'projects/GET_INFLUENCERS',
  async (filterKey?: InfluencerFilterKeys) => {
    try {
      const resp = await fetch(`${api}/influencers?limit=10&offset=0`, {
        headers: {
          Authorization: `Bearer ${demoToken}`,
        },
      }).then((res) => res.json());
      return resp.result;
    } catch (e) {
      console.log(e);
    }
  }
);
