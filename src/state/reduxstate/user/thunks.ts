import { createAsyncThunk } from '@reduxjs/toolkit';
import { Dispatch, SetStateAction } from 'react';
import { InfluencerData } from '../influencers/types';
import { Statuses } from '../projects/types';
import { RootState } from '../slice';
import { api, apiv1 } from '../types';
import {
  setFavoriteProjects,
  setResetToken,
  setSubscribedInfluencers,
  setUserData,
  setUserToken,
} from './slice';
import {
  FavInfluencersProjectsPayload,
  PlanType,
  UserUpdateType,
} from './types';

const token = JSON.parse(String(localStorage.getItem('token')));

//USER INFO

export const fetchUserData = createAsyncThunk(
  'user/GET_USER_DATA',
  async (_, { dispatch, getState }) => {
    const { user } = getState() as RootState;
    const token = user.user_token;

    if (token) {
      try {
        const resp = await fetch(`${apiv1}/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
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

export const fetchStripeUser = createAsyncThunk(
  'user/GET_STRIPE_USER',
  async (_, { dispatch, getState }) => {
    const { user } = getState() as RootState;
    const token = user.user_token;

    if (token) {
      try {
        const resp = await fetch(`${apiv1}/stripe/customer-retrieve`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((res) => res.json());

        // console.log(resp);

        return resp;
      } catch (e) {
        console.log(e);
      }
    }
  }
);

export const updateUserInfo = createAsyncThunk(
  'user/UPDATE_USER_DATA',
  async (data: Partial<UserUpdateType>, { dispatch, getState }) => {
    const { user } = getState() as RootState;
    const userToken = user.user_token;

    if (userToken) {
      try {
        const resp = await fetch(`${apiv1}/users`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userToken}`,
          },
          body: JSON.stringify(data),
        }).then((res) => res.json());
        dispatch(fetchUserData());

        return resp;
      } catch (e) {
        console.log(e);
      }
    }
  }
);

interface UpdateSendGridDataPayload {
  email: string;
  products: PlanType;
}

export const updateSendGridData = createAsyncThunk(
  'user/UPDATE_SENDGRID',
  async ({ email, products }: UpdateSendGridDataPayload) => {
    const data = {
      email,
      products,
    };

    try {
      const resp = await fetch(`${apiv1}/sendgrid-payment-success`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }).then((res) => res.json());

      return resp;
    } catch (e) {
      console.log(e);
    }
  }
);

interface PayloadGeneratePassw {
  email: string;
  generatePasswStatus: Dispatch<SetStateAction<Statuses>>;
  errorMsgCallBack: Dispatch<SetStateAction<string>>;
}

export const generatePasswResetToken = createAsyncThunk(
  'user/GENERATE_PASS_RESET_TOKEN',
  async (
    { email, generatePasswStatus, errorMsgCallBack }: PayloadGeneratePassw,
    { dispatch }
  ) => {
    const data = {
      email,
    };

    generatePasswStatus('pending');

    try {
      const resp = await fetch(`${apiv1}/generate-users-password-reset-token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }).then((res) => res.json());

      if (resp.error) {
        generatePasswStatus('error');

        if (resp.error.status === 404) {
          errorMsgCallBack('Email not found');
        }
      } else {
        generatePasswStatus('success');
      }
      dispatch(setResetToken(resp.token));

      return resp;
    } catch (e) {
      generatePasswStatus('error');
      console.log(e);
    }
  }
);

interface RedeemPayload {
  email: string;
  token: string;
  password: string;
  redeemCalback: Dispatch<SetStateAction<Statuses>>;
}

export const redeemPasswResetToken = createAsyncThunk(
  'user/REDEEM_PASS_RESET_TOKEN',
  async ({ email, token, password, redeemCalback }: RedeemPayload) => {
    const data = {
      email,
      token,
      password,
    };

    try {
      const resp = await fetch(`${apiv1}/redeem-users-password-reset-token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }).then((res) => res.json());

      console.log(resp);

      if (resp.error) {
        redeemCalback('error');
      } else {
        redeemCalback('success');
      }

      return resp;
    } catch (e) {
      redeemCalback('error');
      console.log(e);
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

        const uniqueSubscribedInfl = [
          ...(new Set(
            resp.favorite_twitter_user
          ) as unknown as InfluencerData[]),
        ];
        dispatch(setSubscribedInfluencers(uniqueSubscribedInfl));
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
        callBack && callBack('pending');

        const resp = await fetch(`${api}/fav/${fav_type}/${id}`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
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

export const deleteFavProject = createAsyncThunk(
  'user/DELETE_FAV_PROJECT',
  async ({ id, callBack }: FavInfluencersProjectsPayload, { dispatch }) => {
    if (token && id) {
      callBack && callBack('pending');

      const body = {
        project_id: id,
      };
      try {
        await fetch(`${apiv1}/favorite-projects`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        }).then((res) => res.json());

        dispatch(getFavProjects({ tokenValue: token }));

        callBack && callBack('success');
      } catch (e) {
        callBack && callBack('error');
        console.log(e);
      }
    }
  }
);

export const deleteFavInfluencer = createAsyncThunk(
  'user/DELETE_FAV_INFLUENCER',
  async ({ id, callBack }: FavInfluencersProjectsPayload, { dispatch }) => {
    if (token && id) {
      callBack && callBack('pending');

      const body = {
        twitter_user_id: Number(id),
      };
      try {
        await fetch(`${apiv1}/favorite-twitter-users`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        }).then((res) => res.json());

        dispatch(getFavInfluencers());

        callBack && callBack('success');
      } catch (e) {
        callBack && callBack('error');
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
      callBack && callBack('pending');
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

        callBack && callBack('success');
      } catch (e) {
        callBack && callBack('error');
        console.log(e);
      }
    }
  }
);

interface LoginPayload {
  email: string;
  password: string;
  callBack?: Dispatch<SetStateAction<Statuses>>;
  errMessageCallBack?: Dispatch<SetStateAction<string>>;
}

export const loginUser = createAsyncThunk(
  'users/USER_LOGIN',
  async (
    { email, password, errMessageCallBack, callBack }: LoginPayload,
    { dispatch }
  ) => {
    try {
      callBack && callBack('loading');

      const data = {
        email: email,
        password: password,
      };

      const resp = await fetch(`${apiv1}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }).then((res) => res.json());

      dispatch(setUserToken(resp.access_token));

      callBack && callBack('success');

      return resp;
    } catch (e) {
      callBack && callBack('error');
      console.log(e);
    }
  }
);
