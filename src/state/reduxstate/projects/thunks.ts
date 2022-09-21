import { createAsyncThunk } from '@reduxjs/toolkit';
import { concat } from 'lodash';
import { Dispatch, SetStateAction } from 'react';
import { CategoryTags } from 'src/Components/Global/TrendsElements/types';
import { useNavigateHook } from 'src/hooks';
import { LinkList } from 'src/types';
import { RootState } from '../slice';
import { api, apiv1 } from '../types';
import { FavInfluencersProjectsPayload } from '../user/types';
import {
  set3LowestTalkRateProjects,
  setInfluencers,
  setInfluencersPages,
  setProjectById,
  setProjectsData,
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
  TrendsDateFilterType,
} from './types';

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

interface ProjectsPayload {
  callBack?: Dispatch<SetStateAction<Statuses>>;
  filter?: ProjectFilterKeys;
  skip?: number | null;
  filterValue?: CategoryTags | number | string;
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

    // const url =
    //   filter.length > 0
    //     ? `${apiv1}/projects/today?filters[${filter}]=${filterValue}&limit=52&offset=${offset}`
    //     : `${apiv1}/projects/today?limit=52&offset=${offset}`;

    const filterValue = filter ? `&orderBy=${filter}` : '';
    const url = skip
      ? `${apiv1}/projects?take=8${filterValue}&skip=${skip}`
      : `${apiv1}/projects?take=8`;

    if (token || tokenFromState) {
      try {
        callBack && callBack('pending');

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
              ...projects.projects_data,
              projects: uniqueProjects,
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
        callBack && callBack('success');
      } catch (e) {
        callBack && callBack('error');

        console.log(e);
      }
    }
  }
);

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
  async ({ id, callBack }: FavInfluencersProjectsPayload) => {
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

        callBack && callBack('success');

        return resp;
      } catch (e) {
        callBack && callBack('error');
        console.log(e);
      }
    }
  }
);
