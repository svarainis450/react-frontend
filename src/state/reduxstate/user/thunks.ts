import { createAsyncThunk } from '@reduxjs/toolkit';
import { Dispatch, SetStateAction } from 'react';
import { useNavigateHook } from 'src/hooks';
import { LinkList } from 'src/types';
import { fetchProjectById } from '../projects/thunks';
import { Influencer, Project, Statuses } from '../projects/types';
import { RootState } from '../slice';
import { api, apiv1 } from '../types';
import {
  setFavoriteProjects,
  setSubscribedInfluencers,
  setUserData,
} from './slice';
import { FavInfluencersProjectsPayload, UserDataType } from './types';

const token = JSON.parse(String(localStorage.getItem('token')));

//USER INFO

export const fetchUserData = createAsyncThunk(
  'user/GET_USER_DATA',
  async (tokenValue: string, { dispatch }) => {
    if (tokenValue) {
      try {
        const resp = await fetch(`${api}/me`, {
          headers: {
            Authorization: `Bearer ${tokenValue || token}`,
          },
        }).then((res) => res.json());

        dispatch(setUserData(resp));

        return resp;
      } catch (e) {
        console.log(e);
      }
    }
  }
);

export const updateUserInfo = createAsyncThunk(
  'user/UPDATE_USER_DATA',
  async (data: Omit<UserDataType, 'market'>) => {
    if (token) {
      try {
        const resp = await fetch(`${api}/me`, {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        }).then((res) => res.json());

        return resp;
      } catch (e) {
        console.log(e);
      }
    }
  }
);

//FAVORITE PROJECTS AND INFLUENCERS MANAGEMENT

interface GetFavProjectsPayload {
  favCallBack?: Dispatch<SetStateAction<Statuses>>;
  tokenValue?: string;
}

export const getFavProjects = createAsyncThunk(
  'user/GET_FAV_PROJECTS',
  async (
    { tokenValue, favCallBack }: GetFavProjectsPayload,
    { dispatch, getState }
  ) => {
    const { user } = getState() as RootState;
    const tokenFromState = user.user_token;
    if (favCallBack) {
      favCallBack('pending');
    }

    if (tokenFromState || tokenValue) {
      try {
        const resp = await fetch(`${apiv1}/users`, {
          headers: {
            Authorization: `Bearer ${tokenFromState || tokenValue}`,
          },
        }).then((res) => res.json());

        console.log(resp);

        dispatch(setFavoriteProjects(resp.favorite_projects));

        if (favCallBack) {
          favCallBack('success');
        }

        return resp;
      } catch (e) {
        console.log(e);
        if (favCallBack) {
          favCallBack('error');
        }
      }
    }
  }
);

export const getFavInfluencers = createAsyncThunk(
  'user/GET_FAV_INFLUENCERS',
  async (_, { dispatch }) => {
    if (token) {
      try {
        const resp = await fetch(`${apiv1}/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((res) => res.json());

        console.log(resp.favorite_twitter_user);

        // const uniqueSubscribedInfl = [
        //   ...(new Set(resp.fav) as unknown as Influencer[]),
        // ];
        // dispatch(setSubscribedInfluencers(uniqueSubscribedInfl));
      } catch (e) {
        console.log(e);
      }
    }
  }
);

export const sendFavProjectOrInfluencer = createAsyncThunk(
  'user/POST_FAV_PROJECT_OR_INFLUENCER',
  async ({ id, callBack, fav_type }: FavInfluencersProjectsPayload) => {
    if (token) {
      try {
        callBack('pending');

        const resp = await fetch(`${api}/fav/${fav_type}/${id}`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((res) => res.json());
        callBack('success');
        return resp;
      } catch (e) {
        callBack('error');
        console.log(e);
      }
    }
  }
);

export const deleteFromFavorites = createAsyncThunk(
  'user/DELETE_FAV_INFLUENCER_OR_PROJECT',
  async (
    { id, callBack, fav_type }: FavInfluencersProjectsPayload,
    { dispatch }
  ) => {
    if (token) {
      callBack('pending');
      try {
        await fetch(`${api}/fav/${fav_type}/${id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((res) => res.json());

        if (fav_type === 'influencer') {
          dispatch(getFavInfluencers());
        } else if (fav_type === 'project') {
          dispatch(getFavProjects(token));
        }

        callBack('success');
      } catch (e) {
        callBack('error');
        console.log(e);
      }
    }
  }
);
