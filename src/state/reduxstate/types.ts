import { rootReducer } from './slice';

export type AppState = ReturnType<typeof rootReducer>;

///TODO: Add these to .env file, discuss it with team
export const api = 'https://api.potato.to';

//TODO: remove when the login and register logic is finished!!!!
export const demoToken =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2NTc5ODg2MTEsImV4cCI6MTY1ODM0ODYxMSwicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoiaWV2YUB0ZXN0Lmx0In0.Eo8MWnfb7GyMP-cghdyf3o1jZih7lLzf8KTp6MpF2B0ix2CRgoQTtKjhJUB2woG6iHDVcoozKQF5k7RAe5jH7BE1UcajfFMPOCYqJzoXivoNbq03i1nkSyqtyzCEAVUDt_zDMdkvo6bdtL8KbBq8g_SPzgLvtcUpgho7YIksO3NH97L1hK2orh0s_frVv3mfCdsk1g0nG3AnVfqJMQJRtAkR1Ny_PbJBM5RmHHATNLzixcyNqMRn6WSt4k_KzVNEZQ7a2K0H-oGJhJBgytFf_rbRLqvoXrenVHHeBfibM29M4LOvPj4CEGR8PR7_6hE12cU4Bnf0-H7VPzdfDwrDxw';
