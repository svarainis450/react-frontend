import { createAsyncThunk } from '@reduxjs/toolkit';
import { concat } from 'lodash';
import { Dispatch, SetStateAction } from 'react';
import { CategoryTags } from 'src/Components/Global/TrendsElements/types';
import { TrendsProjectsByInfluencersPayload } from '../projects/thunks';
import {
  InfluencerFilterKeys,
  Project,
  Statuses,
  TrendsDateFilterType,
} from '../projects/types';
import { RootState } from '../slice';
import { api, apiv1 } from '../types';
import { setInfluencersData, setTrendingInfluencers } from './slice';
import { InfluencerData } from './types';
// import {
//   setInfluencers,
//   setInfluencersCount,
//   setInfluencersPages,
//   setTop3bullProjects,
//   setTop3PositiveProjects,
//   setTop3TalkRateProjects,
// } from './slice';
// import { Influencer, SubmenuFilters } from './types';

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

        console.log(resp);

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
  callBack: Dispatch<SetStateAction<Statuses>>;
  filter: InfluencerFilterKeys;
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
      ? `${apiv1}/twitter-users?take=52&skip=${skip}${filterValue}`
      : `${apiv1}/twitter-users?take=52${filterValue}`;

    callBack('pending');
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

        callBack('success');

        // dispatch(
        //   setInfluencersPages({
        //     page: resp.page,
        //     pages: resp.pages,
        //   })
        // );
      } catch (e) {
        callBack('error');
        console.log(e);
      }
    }
  }
);

// export const fetchMostFollowedInfluencers = createAsyncThunk(
//   'projects/GET_MOST_FOLLOWED_INFLUENCERS',
//   async () => {
//     if (token) {
//       try {
//         const resp = await fetch(
//           `${api}/projects?filters[followers]=1&limit=10`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         ).then((res) => res.json());
//         return resp.result;
//       } catch (e) {
//         console.log(e);
//       }
//     }
//   }
// );

// //NEW API

// interface TrendingProjectsPayload {
//   callBack: Dispatch<SetStateAction<Statuses>>;
//   filter: SubmenuFilters;
//   categoryFilter?: CategoryTags;
//   tokenValue?: string;
// }

// export const fetchTrendingProjects = createAsyncThunk(
//   'projects/GET_TRENDING_PROJECTS',
//   async (
//     { filter, callBack, categoryFilter, tokenValue }: TrendingProjectsPayload,
//     { getState }
//   ) => {
//     const { user } = getState() as RootState;
//     const tokenFromState = user.user_token;

//     if ((tokenValue || tokenFromState) && filter) {
//       callBack('pending');

//       const url = categoryFilter
//         ? `${apiv1}/trends/trending-projects-${filter}?category=${categoryFilter.toLocaleLowerCase()}&take=5`
//         : `${apiv1}/trends/trending-projects-${filter}?take=5`;

//       try {
//         const resp = await fetch(url, {
//           headers: {
//             Authorization: `Bearer ${tokenValue || tokenFromState}`,
//           },
//         }).then((res) => res.json());
//         callBack('success');

//         console.log(resp);
//         return resp.data;
//       } catch (e) {
//         console.log(e);
//         callBack('error');
//       }
//     } else {
//       callBack('error');
//     }
//   }
// );

// type FilterKey =
//   | 'top-bull'
//   | 'lowest-bull'
//   | 'top-sentiment'
//   | 'lowest-sentiment'
//   | 'top-talk-rate'
//   | 'lowest-talk-rate';

// interface FetchTop3ProjectsPayload {
//   filter: FilterKey;
//   tokenValue: string;
//   dateFilter: 'daily' | 'weekly';
// }

// export const fetchTop3Projects = createAsyncThunk(
//   'projects/GET_TOP3_PROJECTS',
//   async (
//     { filter, tokenValue, dateFilter }: FetchTop3ProjectsPayload,
//     { dispatch, getState }
//   ) => {
//     const { user } = getState() as RootState;
//     const tokenFromState = user.user_token;

//     if (tokenValue || tokenFromState) {
//       try {
//         const resp = await fetch(
//           `${apiv1}/trends/${filter}-${dateFilter}?take=3`,
//           {
//             headers: {
//               Authorization: `Bearer ${tokenValue || tokenFromState}`,
//             },
//           }
//         ).then((res) => res.json());

//         console.log(resp);

//         if (filter === 'top-bull') {
//           dispatch(setTop3bullProjects(resp.data));
//         } else if (filter === 'top-sentiment') {
//           dispatch(setTop3PositiveProjects(resp.data));
//         } else if (filter === 'top-talk-rate') {
//           dispatch(setTop3TalkRateProjects(resp.data));
//         } else {
//           return;
//         }
//       } catch (e) {
//         console.log(e);
//       }
//     }
//   }
// );
