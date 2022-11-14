import { SelectedPlan } from 'src/state/reduxstate/user/types';

export interface UserBasicInfo {
  name?: string;
  email: string;
  password: string;
}

export interface PaymentCardInfo {
  number: number;
  expDate: string;
  cvv: number;
  name: string;
}

export interface User extends UserBasicInfo {
  orderId: number;
  paymentCard: Partial<PaymentCardInfo>;
  selectedPlan?: SelectedPlan;
  hasDownsell: boolean;
  funnel: number
  quizAnswers: Record<string, string>
}
