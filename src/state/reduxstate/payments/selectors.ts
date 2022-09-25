import { AppState } from '../types';

export const secretKeySelector = (s: AppState) => s.payments.secret_key;
export const paymentStatusSelector = (s: AppState) => s.payments.payment_status;
