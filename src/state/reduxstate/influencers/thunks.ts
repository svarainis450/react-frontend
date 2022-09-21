import { createAsyncThunk } from '@reduxjs/toolkit';
import { concat } from 'lodash';
import { Dispatch, SetStateAction } from 'react';
import { TrendsProjectsByInfluencersPayload } from '../projects/thunks';
import {
  InfluencerFilterKeys,
  Statuses,
  TrendsDateFilterType,
} from '../projects/types';
import { RootState } from '../slice';
import { apiv1 } from '../types';
import { FavInfluencersProjectsPayload } from '../user/types';
import { setInfluencersData, setTrendingInfluencers } from './slice';
import { InfluencerData } from './types';

const token = JSON.parse(String(localStorage.getItem('token')));

export const fetchProjectsPick = createAsyncThunk(
  'influencers/GET_PROJECT_PICKS',
  async ({ tokenValue, dateFilter }: TrendsProjectsByInfluencersPayload) => {
    if (tokenValue) {
      try {
        const resp = await fetch(
          `${apiv1}/trends/trending-twitter-user-project-${dateFilter}?take=10&order=ASC`,
          {
            headers: {
              Authorization: `Bearer ${tokenValue}`,
            },
          }
        ).then((res) => res.json());

        return resp.data;
      } catch (e) {
        console.log(e);
      }
    }
  }
);

export interface TrendingInfluencersPayload {
  tokenValue: string;
  dateFilter: TrendsDateFilterType;
  skip: number | null;
  take: number;
}

export const fetchTrendingInfluencers = createAsyncThunk(
  'influencers/GET_TRENDING_INFLUENCERS',
  async (
    { tokenValue, dateFilter, skip, take }: TrendingInfluencersPayload,
    { dispatch }
  ) => {
    const url = skip
      ? `${apiv1}/trends/trending-twitter-user-project-${dateFilter}?take=${take}&skip=${skip}`
      : `${apiv1}/trends/trending-twitter-user-project-${dateFilter}?take=10`;

    if (tokenValue) {
      try {
        const resp = await fetch(url, {
          headers: {
            Authorization: `Bearer ${tokenValue}`,
          },
        }).then((res) => res.json());

        dispatch(
          setTrendingInfluencers({
            pages: resp.meta.pages,
            skip: resp.meta.skip,
            page: resp.meta.page,
            trending_influencers: resp.data,
          })
        );

        return resp.data;
      } catch (e) {
        console.log(e);
      }
    }
  }
);

interface InfluencersPayload {
  tokenValue?: string;
  callBack?: Dispatch<SetStateAction<Statuses>>;
  filter?: InfluencerFilterKeys;
  skip: number | null;
}

export const fetchInfluencers = createAsyncThunk(
  'projects/GET_INFLUENCERS',
  async (
    { callBack, filter, skip, tokenValue }: InfluencersPayload,
    { dispatch, getState }
  ) => {
    const filterValue = filter ? `&orderBy=${filter}` : '';
    const url = skip
      ? `${apiv1}/twitter-users?take=8&skip=${skip}${filterValue}`
      : `${apiv1}/twitter-users?take=8${filterValue}`;

    callBack && callBack('pending');
    if (tokenValue || token) {
      try {
        const resp = await fetch(url, {
          headers: {
            Authorization: `Bearer ${tokenValue || token}`,
          },
        }).then((res) => res.json());

        const { influencers } = getState() as RootState;
        const influencersArray = influencers.influencers_data.influencers;

        console.log(resp);

        if (skip && skip >= 52) {
          const expandedInfluencers = concat(influencersArray, resp.data);
          const uniqueInfluencers = [
            ...(new Set(expandedInfluencers) as unknown as InfluencerData[]),
          ];
          dispatch(
            setInfluencersData({
              ...influencers.influencers_data,
              influencers: uniqueInfluencers,
            })
          );
        } else {
          dispatch(
            setInfluencersData({
              meta: resp.meta,
              influencers: resp.data,
            })
          );
        }

        callBack && callBack('success');

        // dispatch(
        //   setInfluencersPages({
        //     page: resp.page,
        //     pages: resp.pages,
        //   })
        // );
      } catch (e) {
        callBack && callBack('error');
        console.log(e);
      }
    }
  }
);

export const sendFavInfluencer = createAsyncThunk(
  'influencers/POST_FAV_INFLUENCER',
  async ({ id, callBack }: FavInfluencersProjectsPayload) => {
    if (token) {
      try {
        callBack && callBack('pending');

        const data = {
          project_id: id,
        };

        const resp = await fetch(`${apiv1}/favorite-twitter-users`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        }).then((res) => res.json());

        callBack && callBack('success');

        console.log(resp);

        return resp;
      } catch (e) {
        callBack && callBack('error');
        console.log(e);
      }
    }
  }
);
