import { rootReducer } from './slice';

export type AppState = ReturnType<typeof rootReducer>;

///TODO: Add these to .env file, discuss it with team
export const api = 'https://api.potato.to';

//TODO: remove when the login and register logic is finished!!!!
export const demoToken =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2NTY3ODAyNDgsImV4cCI6MTY1NzE0MDI0OCwicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoiaWV2YUB0ZXN0Lmx0In0.ts6s40LdIoA0M1BKkHIF4fMTdZ3UurYZmS3tLJoMshR9QL74nHK23mgOftHUTcle8ngzCdcfKPjw9FZCDXRWPOK9JQokEbUU1KnuhqFyWVNT041EHIoDeLc9swJqvFmmZnSwCyWAszrokggydr_1rttsyg12KN5taROebJrZbnBSn0Kw4ckfm2bte5XoClTRfuCE95bLd9Dar0bxWbdIwO5N1s_E3GGvmEARpqf0CJ2pqaGXIiKQb8YDoj56N5TT4GdqeggAEBRsffqrS-oZNAPovnYGTbqRcMG1XbH4z3nfP-P2TCLZtgScCPFNyiLE7joVV6XRkdWhkZO_2YvYWQ';
