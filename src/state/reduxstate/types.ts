import { rootReducer } from './slice';

export type AppState = ReturnType<typeof rootReducer>;

///TODO: Add these to .env file, discuss it with team
export const api = 'https://api.potato.to';

//TODO: remove when the login and register logic is finished!!!!
export const demoToken =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2NTc1NTg4NzUsImV4cCI6MTY1NzkxODg3NSwicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoiaWV2YUB0ZXN0Lmx0In0.P8gBu6UpDUWMNQce4noXZXiTIhEANEphHbkTTLLFHf3g_7VQEEoAdQAz598gG8iZu-I0tIC-dvcvrNQ41kURXYLhf9dawgcEtDt8Wj5RpjfRNHk3WmQFK-u3f5Im1ZtaSKH13E9S-v-dBMXNGRmd7xzDoe_ayPnEEpL0Zy4L-0sBpLVb9T5_FzvomVT6YTisHuYseD8nxsyHSKsSCRWfqFYwx4tUdGSIEThSAgTfN3m_rJmg0R7qrSYxP8jPetnIPDGPwmgoGu701L1jMIWvu36D1pbPkFDXPaGh-KLIImWy426i2oIi_-xxBp_DVkl8wWswfC7aWK79mjpCQqv5zg';
