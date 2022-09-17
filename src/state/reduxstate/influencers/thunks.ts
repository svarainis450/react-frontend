import { createAsyncThunk } from '@reduxjs/toolkit';
import { concat } from 'lodash';
import { Dispatch, SetStateAction } from 'react';
import { CategoryTags } from 'src/Components/Global/TrendsElements/types';
import { TrendsProjectsByInfluencersPayload } from '../projects/thunks';
import { Project } from '../projects/types';
import { RootState } from '../slice';
import { api, apiv1 } from '../types';
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
          `${apiv1}/trends/trending-twitter-user-project-${dateFilter}?take=10`,
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

// interface InfluencersPayload {
//   callBack: Dispatch<SetStateAction<Statuses>>;
//   filter: InfluencerFilterKeys;
//   limit?: number;
//   offset: number;
//   filterValue?: string | CategoryTags;
//   tokenValue?: string;
// }

// export const fetchInfluencers = createAsyncThunk(
//   'projects/GET_INFLUENCERS',
//   async (
//     {
//       callBack,
//       filter,
//       limit = 52,
//       offset,
//       filterValue = '1',
//       tokenValue,
//     }: InfluencersPayload,
//     { dispatch, getState }
//   ) => {
//     const filterType = String(filter).toLowerCase();
//     const filterValuePure = filterValue.toLocaleLowerCase();
//     const url = filter
//       ? `${api}/influencers/today?filter[${filterType}]=${filterValuePure}&limit=${limit}&offset=${offset}`
//       : `${api}/influencers/today?limit=${limit}&offset=${offset}`;

//     callBack('pending');
//     if (tokenValue || token) {
//       try {
//         const resp = await fetch(url, {
//           headers: {
//             Authorization: `Bearer ${tokenValue || token}`,
//           },
//         }).then((res) => res.json());

//         const { projects } = getState() as RootState;

//         dispatch(setInfluencersCount(resp.count));

//         if (offset >= 50) {
//           const expandedInfluencers = concat(projects.influencers, resp.result);
//           const uniqueInfluencers = [
//             ...(new Set(expandedInfluencers) as unknown as Influencer[]),
//           ];
//           dispatch(setInfluencers(uniqueInfluencers));
//         } else {
//           dispatch(setInfluencers(resp.result));
//         }

//         callBack('success');
//         console.log(resp);

//         dispatch(
//           setInfluencersPages({
//             page: resp.page,
//             pages: resp.pages,
//           })
//         );
//       } catch (e) {
//         callBack('error');
//         console.log(e);
//       }
//     }
//   }
// );

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
