import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Dispatch, SetStateAction } from 'react';
import { NumberLiteralType } from 'typescript';
import { Statuses } from '../projects/types';
import { api } from '../types';
import {
  setFavoriteProjects,
  setSubscribedInfluencers,
  setUserData,
} from './slice';

const token = JSON.parse(String(localStorage.getItem('token')));

export const fetchUserData = createAsyncThunk(
  'user/GET_USER_DATA',
  async (_, { dispatch }) => {
    if (token) {
      try {
        const resp = await fetch(`${api}/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((res) => res.json());

        console.log(resp);

        dispatch(setUserData(resp));

        return resp;
      } catch (e) {
        console.log(e);
      }
    }
  }
);

export const getFavProjects = createAsyncThunk(
  'user/GET_FAV_PROJECTS',
  async (_, { dispatch }) => {
    if (token) {
      try {
        const resp = await fetch(`${api}/fav/project`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((res) => res.json());

        dispatch(setFavoriteProjects(resp));

        return resp;
      } catch (e) {
        console.log(e);
      }
    }
  }
);

interface FavInfluencersProjectsPayload {
  callBack: Dispatch<SetStateAction<Statuses>>;
  id: number;
  fav_type: 'project' | 'influencer';
}

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

export const getFavInfluencers = createAsyncThunk(
  'user/GET_FAV_INFLUENCERS',
  async (_, { dispatch }) => {
    if (token) {
      try {
        const resp = await fetch(`${api}/fav/influencer`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((res) => res.json());

        dispatch(setSubscribedInfluencers(resp));

        return resp;
      } catch (e) {
        console.log(e);
      }
    }
  }
);

export const deleteFromFavorites = createAsyncThunk(
  'user/DELETE_FAV_INFLUENCER_OR_PROJECT',
  async ({ id, callBack, fav_type }: FavInfluencersProjectsPayload) => {
    if (token) {
      callBack('pending');
      try {
        const resp = await fetch(`${api}/fav/${fav_type}/${id}`, {
          method: 'DELETE',
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
