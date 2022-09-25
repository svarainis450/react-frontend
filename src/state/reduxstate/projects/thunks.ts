import { createAsyncThunk } from '@reduxjs/toolkit';
import { concat } from 'lodash';
import { Dispatch, SetStateAction } from 'react';
import { CategoryTags } from 'src/Components/Global/TrendsElements/types';

import { RootState } from '../slice';
import { apiv1 } from '../types';
import { getFavProjects } from '../user/thunks';
import { FavInfluencersProjectsPayload } from '../user/types';
import {
  set3LowestTalkRateProjects,
  setProjectById,
  setProjectsData,
  setTop3BearProjects,
  setTop3bullProjects,
  setTop3NegativeProjects,
  setTop3PositiveProjects,
  setTop3TalkRateProjects,
} from './slice';
import {
  Project,
  Statuses,
  SubmenuFilters,
  TrendsDateFilterType,
} from './types';

interface ProjectByIdPayload {
  id: number;
}

export const fetchProjectById = createAsyncThunk(
  'projects/GET_PROJECT_BY_ID',
  async ({ id }: ProjectByIdPayload, { dispatch }) => {
    if (token && id) {
      try {
        await fetch(`${apiv1}/projects-by-id/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((res) => res.json())
          .then((res) => {
            console.log(res);
            dispatch(setProjectById(res.data));
          });
      } catch (e) {
        console.log(e);
      }
    }
  }
);

interface ProjectsPayload {
  callBack?: Dispatch<SetStateAction<Statuses>>;
  filter?: string;
  skip?: number | null;
}

const token = JSON.parse(String(localStorage.getItem('token')));

export const fetchProjects = createAsyncThunk(
  'projects/GET_PROJECTS_DATA',
  async (
    { callBack, filter, skip }: ProjectsPayload,
    { dispatch, getState }
  ) => {
    const { user, projects } = getState() as RootState;
    const tokenFromState = user.user_token;

    const url = skip
      ? `${apiv1}/projects?take=8&skip=${skip}${filter || ''}`
      : `${apiv1}/projects?take=8${filter || ''}`;

    if (token || tokenFromState) {
      try {
        if (callBack) {
          callBack('pending');
        }

        const resp = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token || tokenFromState}`,
          },
        }).then((res) => res.json());

        if (skip && skip >= 8) {
          const expandedProjects = concat(
            projects.projects_data.projects,
            resp.data
          );

          const uniqueProjects = [
            ...(new Set(expandedProjects) as unknown as Project[]),
          ];

          dispatch(
            setProjectsData({
              projects: uniqueProjects,
              meta: resp.meta,
            })
          );
        } else {
          dispatch(
            setProjectsData({
              projects: resp.data,
              meta: resp.meta,
            })
          );
        }

        if (callBack) {
          callBack('success');
        }
      } catch (e) {
        if (callBack) {
          callBack('error');
        }
        console.log(e);
      }
    }
  }
);

interface TrendingProjectsPayload {
  callBack: Dispatch<SetStateAction<Statuses>>;
  dateFilter: SubmenuFilters;
  categoryFilter?: CategoryTags;
  tokenValue?: string;
}

export const fetchTrendingProjects = createAsyncThunk(
  'projects/GET_TRENDING_PROJECTS',
  async (
    {
      dateFilter,
      callBack,
      categoryFilter,
      tokenValue,
    }: TrendingProjectsPayload,
    { getState }
  ) => {
    const { user } = getState() as RootState;
    const tokenFromState = user.user_token;

    if ((tokenValue || tokenFromState) && dateFilter) {
      callBack('pending');

      const url = categoryFilter
        ? `${apiv1}/trends/trending-projects-${dateFilter}?category=${categoryFilter.toLocaleLowerCase()}&take=5`
        : `${apiv1}/trends/trending-projects-${dateFilter}?take=5`;

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

type FilterKey =
  | 'top-bull'
  | 'lowest-bull'
  | 'top-sentiment'
  | 'lowest-sentiment'
  | 'top-talk-rate'
  | 'lowest-talk-rate';

interface FetchTop3ProjectsPayload {
  filter: FilterKey;
  tokenValue: string;
  dateFilter: TrendsDateFilterType;
}

export const fetchTop3Projects = createAsyncThunk(
  'projects/GET_TOP3_PROJECTS',
  async (
    { filter, tokenValue, dateFilter }: FetchTop3ProjectsPayload,
    { dispatch, getState }
  ) => {
    const { user } = getState() as RootState;
    const tokenFromState = user.user_token;

    if (tokenValue || tokenFromState) {
      try {
        const resp = await fetch(
          `${apiv1}/trends/${filter}-${dateFilter}?take=3`,
          {
            headers: {
              Authorization: `Bearer ${tokenValue || tokenFromState}`,
            },
          }
        ).then((res) => res.json());

        if (filter === 'top-bull') {
          dispatch(setTop3bullProjects(resp.data));
        } else if (filter === 'top-sentiment') {
          dispatch(setTop3PositiveProjects(resp.data));
        } else if (filter === 'top-talk-rate') {
          dispatch(setTop3TalkRateProjects(resp.data));
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
    { filter, tokenValue, dateFilter }: FetchTop3ProjectsPayload,
    { dispatch, getState }
  ) => {
    const { user } = getState() as RootState;
    const tokenFromState = user.user_token;

    if (tokenValue || tokenFromState) {
      try {
        const resp = await fetch(
          `${apiv1}/trends/${filter}-${dateFilter}?take=3`,
          {
            headers: {
              Authorization: `Bearer ${tokenValue || tokenFromState}`,
            },
          }
        ).then((res) => res.json());

        if (filter === 'lowest-bull') {
          dispatch(setTop3BearProjects(resp.data));
        } else if (filter === 'lowest-sentiment') {
          dispatch(setTop3NegativeProjects(resp.data));
        } else if (filter === 'lowest-talk-rate') {
          dispatch(set3LowestTalkRateProjects(resp.data));
        } else {
          return;
        }
      } catch (e) {
        console.log(e);
      }
    }
  }
);

export interface TrendsProjectsByInfluencersPayload {
  tokenValue: string;
  dateFilter: TrendsDateFilterType;
}

export const fetchProjectsByInfluencers = createAsyncThunk(
  'projects/GET_PROJECTS_BY_INFLUENCERS',
  async ({ tokenValue, dateFilter }: TrendsProjectsByInfluencersPayload) => {
    if (tokenValue || token) {
      try {
        const resp = await fetch(
          `${apiv1}/trends/influencer-top-mentioned-projects-${dateFilter}?take=5`,
          {
            headers: {
              Authorization: `Bearer ${tokenValue || token}`,
            },
          }
        ).then((res) => res.json());

        const projectsByInfluencers = resp.data.map(
          (item: { place: number; project: Project }) => {
            return item.project;
          }
        );

        return projectsByInfluencers;
      } catch (e) {
        console.log(e);
      }
    }
  }
);

export const sendFavProject = createAsyncThunk(
  'projects/POST_FAV_PROJECT',
  async ({ id, callBack }: FavInfluencersProjectsPayload, { dispatch }) => {
    if (token) {
      try {
        callBack && callBack('pending');

        const data = {
          project_id: id,
        };

        const resp = await fetch(`${apiv1}/favorite-projects`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        }).then((res) => res.json());

        dispatch(getFavProjects({}));

        callBack && callBack('success');

        return resp;
      } catch (e) {
        callBack && callBack('error');
        console.log(e);
      }
    }
  }
);

export const fetchTotalSentiment = createAsyncThunk(
  'projects/GET_TOTAL_SENTIMENT',
  async (_, { getState }) => {
    const { user } = getState() as RootState;
    const token = user.user_token;
    try {
      const resp = await fetch(`${apiv1}/total-sentiment`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.json());

      return resp.data.sentiment;
    } catch (e) {
      console.log(e);
    }
  }
);
