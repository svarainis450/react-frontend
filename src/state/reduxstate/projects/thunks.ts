import { createAsyncThunk } from '@reduxjs/toolkit';
import { Dispatch, SetStateAction } from 'react';
import { RootState } from '../slice';
import { api, demoToken } from '../types';
import { UserState } from '../user/types';
import {
  setTop3bullProjects,
  setTop3PositiveProjects,
  setTop3TalkRateProjects,
} from './slice';
import {
  InfluencerFilterKeys,
  ProjectFilterKeys,
  Statuses,
  SubmenuFilters,
} from './types';

interface ProjectsPayload {
  callBack: Dispatch<SetStateAction<Statuses>>;
  filter: ProjectFilterKeys;
  pagination: number;
}

export const fetchProjects = createAsyncThunk(
  'projects/GET_PROJECTS',
  async ({ callBack, filter, pagination }: ProjectsPayload, { getState }) => {
    const { user } = getState() as RootState;
    const url = filter
      ? `${api}/projects/today?filters[${filter}]=1&limit=50&offset=30`
      : `${api}/projects/today?limit=50&offset=0`;

    console.log(url);
    if (user.user_token) {
      try {
        callBack('pending');
        const resp = await fetch(url, {
          headers: {
            Authorization: `Bearer ${user.user_token}`,
          },
        }).then((res) => res.json());
        callBack('success');
        return resp.result;
      } catch (e) {
        console.log(e);
        callBack('error');
      }
    }
  }
);

interface TrendingProjectsPayload {
  callBack: Dispatch<SetStateAction<Statuses>>;
  filter: SubmenuFilters;
}

export const fetchTrendingProjects = createAsyncThunk(
  'projects/GET_TRENDING_PROJECTS',
  async ({ filter, callBack }: TrendingProjectsPayload, { getState }) => {
    const { user } = getState() as RootState;

    console.log(user.user_token);
    if (user.user_token && filter) {
      callBack('pending');

      try {
        const resp = await fetch(`${api}/projects/trending/today?limit=5`, {
          headers: {
            Authorization: `Bearer ${user.user_token}`,
          },
        }).then((res) => res.json());
        callBack('success');
        return resp.result;
      } catch (e) {
        console.log(e);
        callBack('error');
      }
    }
  }
);

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

type FilterKey = 'talk_rate' | 'positive' | 'bull';

export const fetchTop3Projects = createAsyncThunk(
  'projects/GET_TOP3_PROJECTS',
  async (filter: FilterKey, { getState, dispatch }) => {
    const { user } = getState() as RootState;
    if (user.user_token) {
      try {
        const resp = await fetch(
          `${api}/projects/today?filters[${filter}]=1&limit=3`,
          {
            headers: {
              Authorization: `Bearer ${user.user_token}`,
            },
          }
        ).then((res) => res.json());

        if (filter === 'bull') {
          dispatch(setTop3bullProjects(resp.result));
        } else if (filter === 'positive') {
          dispatch(setTop3PositiveProjects(resp.result));
        } else if (filter === 'talk_rate') {
          dispatch(setTop3TalkRateProjects(resp.result));
        } else {
          return;
        }
      } catch (e) {
        console.log(e);
      }
    }
  }
);

export const fetchProjectsByInfluencers = createAsyncThunk(
  'projects/GET_PROJECTS_BY_INFLUENCERS',
  async () => {
    try {
      const resp = await fetch(
        `${api}/projects?filters[top]=influencer&limit=5`,
        {
          headers: {
            Authorization: `Bearer ${demoToken}`,
          },
        }
      ).then((res) => res.json());
      return resp.result;
    } catch (e) {
      console.log(e);
    }
  }
);
