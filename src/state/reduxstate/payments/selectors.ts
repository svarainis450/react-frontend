import { AppState } from '../types';

export const secretKeySelector = (s: AppState) => s.payments.secret_key;
