import { rootReducer } from './slice';

export type AppState = ReturnType<typeof rootReducer>;

///TODO: Add these to .env file, discuss it with team
export const api = 'https://api.potato.to';

//TODO: remove when the login and register logic is finished!!!!
export const demoToken =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2NTg3NTg0MTgsImV4cCI6MTY1OTExODQxOCwicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoiaWV2YUB0ZXN0Lmx0In0.uPpICuxJ94PVu4pXsnenYAIf57kJzdsXtomK5ARr1KzRfC_hxHZtlgXX795OzVKsRgpVBHbJmAusMecV7rMfp-Wu-MZwBiVVhf8R8OKbMn3FkVh0OBfH5WjEVrpctoXzPRqfn8whe8-rBF-yW2-35ITPmiGkBzTjLrtljjYBgZs82iMNTHhZ861XdbJAXgTfK-bT6Dzuwg6Rg7CphHI8sQguFapacmQlBuHBw1qxhDpjyeXQX14xTGQ8aF8_TCkuxU6CuUlDKibPcwujPkVFLOhRwQTeFLmAi_R1echRd5CFC6b_x4X_uTzwilSPDL5BheG7ZCPHePpHaS86lZD_7g';

export const apiv1 = 'https://api.potato.to/api/v1';
