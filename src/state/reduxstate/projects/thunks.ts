import { createAsyncThunk } from '@reduxjs/toolkit';
import { concat } from 'lodash';
import { Dispatch, SetStateAction } from 'react';
import { CategoryTags } from 'src/Components/Global/TrendsElements/types';
import { useNavigateHook } from 'src/hooks';
import { LinkList } from 'src/types';
import { RootState } from '../slice';
import { api, apiv1 } from '../types';
import {
  set3LowestTalkRateProjects,
  setInfluencers,
  setInfluencersCount,
  setInfluencersPages,
  setProjectById,
  setProjects,
  setProjectsCount,
  setTop3BearProjects,
  setTop3bullProjects,
  setTop3NegativeProjects,
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
    const { user } = getState() as RootState;
    const tokenFromState = user.user_token;

    const url =
      filter.length > 0
        ? `${api}/projects/today?filters[${filter}]=${filterValue}&limit=52&offset=${offset}`
        : `${api}/projects/today?limit=52&offset=${offset}`;

    if (token || tokenFromState) {
      try {
        callBack('pending');
        const resp = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token || tokenFromState}`,
          },
        }).then((res) => res.json());

        const { projects } = getState() as RootState;
        dispatch(setProjectsCount(resp.count));

        if (offset >= 52) {
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
        callBack('error');

        console.log(e);
      }
    }
  }
);

interface ProjectByIdPayload {
  id: number;
  projectIDCallback?: Dispatch<SetStateAction<Project>>;
  navigateToForYou?: boolean;
}

export const fetchProjectById = createAsyncThunk(
  'projects/GET_PROJECT_BY_ID',
  async (
    { id, projectIDCallback, navigateToForYou }: ProjectByIdPayload,
    { dispatch }
  ) => {
    if (token && id) {
      try {
        const resp = await fetch(`${api}/project/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((res) => res.json())
          .then((res) => dispatch(setProjectById(res)));

        if (navigateToForYou && resp) {
          useNavigateHook(LinkList.FORYOU);
        }

        // if (projectIDCallback) {
        //   projectIDCallback(resp as Project);
        // }
      } catch (e) {
        console.log(e);
      }
    }
  }
);

export const fetchProjectsPick = createAsyncThunk(
  'projects/GET_PROJECT_PICKS',
  async (tokenValue: string) => {
    if (tokenValue) {
      try {
        const resp = await fetch(`${api}/influencers/today?limit=10`, {
          headers: {
            Authorization: `Bearer ${tokenValue}`,
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
  filterValue?: string | CategoryTags;
  tokenValue?: string;
}

export const fetchInfluencers = createAsyncThunk(
  'projects/GET_INFLUENCERS',
  async (
    {
      callBack,
      filter,
      limit = 52,
      offset,
      filterValue = '1',
      tokenValue,
    }: InfluencersPayload,
    { dispatch, getState }
  ) => {
    const filterType = String(filter).toLowerCase();
    const filterValuePure = filterValue.toLocaleLowerCase();
    const url = filter
      ? `${api}/influencers/today?filter[${filterType}]=${filterValuePure}&limit=${limit}&offset=${offset}`
      : `${api}/influencers/today?limit=${limit}&offset=${offset}`;

    callBack('pending');
    if (tokenValue || token) {
      try {
        const resp = await fetch(url, {
          headers: {
            Authorization: `Bearer ${tokenValue || token}`,
          },
        }).then((res) => res.json());

        const { projects } = getState() as RootState;

        dispatch(setInfluencersCount(resp.count));

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
        console.log(resp);

        dispatch(
          setInfluencersPages({
            page: resp.page,
            pages: resp.pages,
          })
        );
      } catch (e) {
        callBack('error');
        console.log(e);
      }
    }
  }
);

type FilterKey =
  | 'talk_rate'
  | 'positive'
  | 'bull'
  | 'bear'
  | 'lowest'
  | 'negative';

interface FetchTop3ProjectsPayload {
  filter: FilterKey;
  tokenValue: string;
}

export const fetchTop3Projects = createAsyncThunk(
  'projects/GET_TOP3_PROJECTS',
  async (
    { filter, tokenValue }: FetchTop3ProjectsPayload,
    { dispatch, getState }
  ) => {
    const { user } = getState() as RootState;
    const tokenFromState = user.user_token;

    if (tokenValue || tokenFromState) {
      try {
        const resp = await fetch(
          `${api}/projects/today?filters[${filter}]=1&limit=3`,
          {
            headers: {
              Authorization: `Bearer ${tokenValue || tokenFromState}`,
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

export const fetchTop3LowestProjects = createAsyncThunk(
  'projects/GET_TOP3_PROJECTS',
  async (
    { filter, tokenValue }: FetchTop3ProjectsPayload,
    { dispatch, getState }
  ) => {
    const { user } = getState() as RootState;
    const tokenFromState = user.user_token;

    if (tokenValue || tokenFromState) {
      try {
        const resp = await fetch(
          `${api}/projects/today?filters[${filter}]=1&limit=3`,
          {
            headers: {
              Authorization: `Bearer ${tokenValue || tokenFromState}`,
            },
          }
        ).then((res) => res.json());

        if (filter === 'bear') {
          dispatch(setTop3BearProjects(resp.result));
        } else if (filter === 'negative') {
          dispatch(setTop3NegativeProjects(resp.result));
        } else if (filter === 'lowest') {
          dispatch(set3LowestTalkRateProjects(resp.result));
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
  async (tokenValue: string) => {
    if (tokenValue || token) {
      try {
        const resp = await fetch(
          `${api}/projects?filters[top]=influencer&limit=5`,
          {
            headers: {
              Authorization: `Bearer ${tokenValue || token}`,
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

export const fetchMostFollowedInfluencers = createAsyncThunk(
  'projects/GET_MOST_FOLLOWED_INFLUENCERS',
  async () => {
    if (token) {
      try {
        const resp = await fetch(
          `${api}/projects?filters[followers]=1&limit=10`,
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

//NEW API

interface TrendingProjectsPayload {
  callBack: Dispatch<SetStateAction<Statuses>>;
  filter: SubmenuFilters;
  categoryFilter?: CategoryTags;
  tokenValue?: string;
}

export const fetchTrendingProjects = createAsyncThunk(
  'projects/GET_TRENDING_PROJECTS',
  async (
    { filter, callBack, categoryFilter, tokenValue }: TrendingProjectsPayload,
    { getState }
  ) => {
    const { user } = getState() as RootState;
    const tokenFromState = user.user_token;

    if ((tokenValue || tokenFromState) && filter) {
      callBack('pending');

      const url = categoryFilter
        ? `${apiv1}/trends/trending-projects-${filter}?category=${categoryFilter.toLocaleLowerCase()}&take=5`
        : `${apiv1}/trends/trending-projects-${filter}?take=5`;

      try {
        const resp = await fetch(url, {
          headers: {
            Authorization: `Bearer ${tokenValue || tokenFromState}`,
          },
        }).then((res) => res.json());
        callBack('success');

        console.log(resp);
        return resp.data;
      } catch (e) {
        console.log(e);
        callBack('error');
      }
    } else {
      callBack('error');
    }
  }
);
