import { rootReducer } from './slice';

export type AppState = ReturnType<typeof rootReducer>;

///TODO: Add these to .env file, discuss it with team
export const api = 'https://api.potato.to';

export const apiv1 =
  process.env.REACT_APP_ENV === 'development'
    ? 'http://188.166.2.245/api/v1'
    : 'https://api.potato.to/api/v1';

export const apiv2 = 'https://api.potato.to/api/v1';
