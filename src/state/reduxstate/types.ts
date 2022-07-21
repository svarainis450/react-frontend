import { rootReducer } from './slice';

export type AppState = ReturnType<typeof rootReducer>;

///TODO: Add these to .env file, discuss it with team
export const api = 'https://api.potato.to';

//TODO: remove when the login and register logic is finished!!!!
export const demoToken =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2NTgzOTE4MDgsImV4cCI6MTY1ODc1MTgwOCwicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoiaWV2YUB0ZXN0Lmx0In0.ZA9FXiHwHi_tLT_Cp6X_z1mazo2byggPZa6MWShzAnTurhP1F93EuojRphIdToqdQU476bTycf60dPaXBlRBZhBUbef5mTzZTEIjoilef_uMVM9cgvMB2h1qnM2QT3Y0BE8HsaEimG2tkCJCxQvwnYmYcElGZqFxRPZygdVIfZhYlFnPCcZ5B8odQsmJxidLf1qc27LrN9Fkpva98eO3y1XOaukarR3Jr-F4Y5gvm4_eEU6cY_ZYFSCRn8wfXWpVWLJcMmdI_c8QNce9qmjAyBOEpsNkXibLT4GkkL8mDL8RrZ2oammwnJJhf60Zx4kiMcv8uuLdhxPkAnAGNDET_A';
