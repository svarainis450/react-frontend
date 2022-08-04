import { createAsyncThunk } from '@reduxjs/toolkit';
import { concat } from 'lodash';
import { Dispatch, SetStateAction } from 'react';
import { CategoryTags } from 'src/Components/Global/TrendsElements/types';
import { RootState } from '../slice';
import { api } from '../types';
import {
  setInfluencers,
  setProjects,
  setTop3bullProjects,
  setTop3PositiveProjects,
  setTop3TalkRateProjects,
} from './slice';
import {
  Influencer,
  InfluencerFilterKeys,
  Project,
  ProjectFilterKeys,
  Statuses,
  SubmenuFilters,
} from './types';

interface ProjectsPayload {
  callBack: Dispatch<SetStateAction<Statuses>>;
  filter: ProjectFilterKeys;
  offset: number;
  filterValue?: CategoryTags | number | string;
}

const token = JSON.parse(String(localStorage.getItem('token')));

export const fetchProjects = createAsyncThunk(
  'projects/GET_PROJECTS',
  async (
    { callBack, filter, offset, filterValue = 1 }: ProjectsPayload,
    { dispatch, getState }
  ) => {
    const setFilterValue =
      filter === ProjectFilterKeys.CATEGORY
        ? String(filterValue).toLowerCase()
        : 1;

    const url =
      filter.length > 0
        ? `${api}/projects/today?filters[${filter}]=${setFilterValue}&limit=50&offset=${offset}`
        : `${api}/projects/today?limit=50&offset=${offset}`;

    if (token) {
      try {
        callBack('pending');
        const resp = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((res) => res.json());

        const { projects } = getState() as RootState;

        if (offset >= 50) {
          const expandedProjects = concat(projects.projects, resp.result);
          const uniqueProjects = [
            ...(new Set(expandedProjects) as unknown as Project[]),
          ];
          dispatch(setProjects(uniqueProjects));
        } else {
          dispatch(setProjects(resp.result));
        }
        callBack('success');
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
  async ({ filter, callBack }: TrendingProjectsPayload) => {
    if (token && filter) {
      callBack('pending');

      try {
        const resp = await fetch(`${api}/projects/trending/${filter}?limit=5`, {
          headers: {
            Authorization: `Bearer ${token}`,
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
    if (token) {
      try {
        const resp = await fetch(`${api}/influencers/today?limit=10`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((res) => res.json());
        return resp.result;
      } catch (e) {
        console.log(e);
      }
    }
  }
);

interface InfluencersPayload {
  callBack: Dispatch<SetStateAction<Statuses>>;
  filter: InfluencerFilterKeys;
  limit?: number;
  offset: number;
}

export const fetchInfluencers = createAsyncThunk(
  'projects/GET_INFLUENCERS',
  async (
    { callBack, filter, limit = 50, offset }: InfluencersPayload,
    { dispatch, getState }
  ) => {
    const filterType = String(filter).toLowerCase();
    const url = filter
      ? `${api}/influencers/today?filter[${filterType}]=1&limit=${limit}&offset=${offset}`
      : `${api}/influencers/today?limit=${limit}&offset=${offset}`;

    callBack('pending');
    if (token) {
      try {
        const resp = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((res) => res.json());

        const { projects } = getState() as RootState;

        if (offset >= 50) {
          const expandedInfluencers = concat(projects.influencers, resp.result);
          const uniqueInfluencers = [
            ...(new Set(expandedInfluencers) as unknown as Influencer[]),
          ];
          dispatch(setInfluencers(uniqueInfluencers));
        } else {
          dispatch(setInfluencers(resp.result));
        }
        callBack('success');
      } catch (e) {
        callBack('error');
        console.log(e);
      }
    }
  }
);

type FilterKey = 'talk_rate' | 'positive' | 'bull';

export const fetchTop3Projects = createAsyncThunk(
  'projects/GET_TOP3_PROJECTS',
  async (filter: FilterKey, { dispatch }) => {
    if (token) {
      try {
        const resp = await fetch(
          `${api}/projects/today?filters[${filter}]=1&limit=3`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
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
    if (token) {
      try {
        const resp = await fetch(
          `${api}/projects?filters[top]=influencer&limit=5`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        ).then((res) => res.json());
        return resp.result;
      } catch (e) {
        console.log(e);
      }
    }
  }
);
