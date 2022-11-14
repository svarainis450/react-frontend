import { AppState } from '../types';

export const hasAcceptedDownsellSelector = (s: AppState) =>
  s.payments.has_accepted_downsell;

//TODO: check and remove old selectors and slices
export const secretKeySelector = (s: AppState) => s.payments.secret_key;
export const paymentStatusSelector = (s: AppState) => s.payments.payment_status;
