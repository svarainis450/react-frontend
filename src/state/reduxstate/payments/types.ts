import { Statuses } from '../projects/types';

export interface PaymentsState {
  secret_key: string;
  payment_status: Statuses;
  has_accepted_downsell: boolean;
}
