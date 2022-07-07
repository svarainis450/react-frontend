import { rootReducer } from './slice';

export type AppState = ReturnType<typeof rootReducer>;

///TODO: Add these to .env file, discuss it with team
export const api = 'https://api.potato.to';

//TODO: remove when the login and register logic is finished!!!!
export const demoToken =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2NTcxNzcyMDIsImV4cCI6MTY1NzUzNzIwMiwicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoiaWV2YUB0ZXN0Lmx0In0.rdb2DcuYjEm4wUpPYMuqzCQIIZYn5msPCp2DCEu8EQgU-9IWNlydURzMFqNRQVUHSQMWFXm02PDgh22NRN7BIRADH3u4FmdadvaucZhpmx29jjkHDD-tINHjuFvGD6ytneUWha0lVYP9nR9FVfbCG33JXaG0iQv__bg9f0IHtUnkCqDrHGEiNbI7v9TF38nOJq_OPFQpxgM-k4T9GtmeP94hZV20UKE4xfb4hqKSqZZnPBIfa3yAdXhYmimaAsHFVCzZwzs8P_gg6HuIJN1WZxSUwY7_6UGNOGSdQrfFeqV4NKtqW1RRGS0zqReVcnRy6HZ6JQZ0-XCzfqb4CicOIg';
