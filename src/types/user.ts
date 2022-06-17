import { Plan } from "../Components/Global/PaymentOptions/constants";

export interface UserBasicInfo {
  name: string,
  email: string
}

export interface PaymentCardInfo {
  number: number;
  expDate: string;
  cvv: number;
  name: string;
}

export interface User extends UserBasicInfo {
  orderId: number,
  paymentCard: Partial<PaymentCardInfo>,
  selectedPlan?: Plan
};