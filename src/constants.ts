import { StripeProductKeys } from "./globalConstants/prices";
import { SelectedPlan } from "./state/reduxstate/user/types";

export const isDevelopment = process.env.REACT_APP_ENV === 'development';

export const QUIZ_CHECKOUT_PRODUCTS: Record<3 | 6 | 12, SelectedPlan> = {
  3: {
    key: "3-month-plan",
    title: "3 month plan",
    final_price: 60,
    price: 75,
    subscription_period: 3,
    stripe_price_id: isDevelopment ? 'price_1LyDARLPHXTxUZlW9LLj9MJl' :  'price_1LyDfTLPHXTxUZlWAzPWfJlL', // $60 every 3 months
    stripe_product: isDevelopment? StripeProductKeys.POTATO_PLAN_DEV : StripeProductKeys.POTATO_PLAN_PROD,
  },
  6: {
    key: "6-month-plan",
    title: "6 month plan",
    final_price: 108,
    price: 138,
    subscription_period: 6,
    stripe_price_id: isDevelopment ? 'price_1LyDARLPHXTxUZlWdup6pFny' : 'price_1LyDfTLPHXTxUZlW794RGCqi', // $108 every 6 months
    stripe_product: isDevelopment? StripeProductKeys.POTATO_PLAN_DEV : StripeProductKeys.POTATO_PLAN_PROD,
  },
  12: {
    key: "12-month-plan",
    title: "12 month plan",
    final_price: 180,
    price: 240,
    subscription_period: 12,
    isFeatured: true,
    stripe_price_id: isDevelopment ? 'price_1LyDARLPHXTxUZlW0qCwSSFZ' : 'price_1LyDfTLPHXTxUZlWDrWrEC2o', //$180 year
    stripe_product: isDevelopment? StripeProductKeys.POTATO_PLAN_DEV : StripeProductKeys.POTATO_PLAN_PROD,
  },
};

export const QUIZ_CHECKOUT_3_PRODUCTS: Record<3 | 6 | 12, SelectedPlan> = {
  3: {
    key: "3-month-plan",
    title: "3 month plan",
    final_price: 33,
    price: 71.99,
    subscription_period: 3,
    stripe_price_id: isDevelopment ? 'price_1LyDGRLPHXTxUZlWXR2ePKor' : 'price_1LyDfTLPHXTxUZlW3z1miNpN', // $33 every 3 months
    stripe_product: isDevelopment? StripeProductKeys.POTATO_PLAN_DEV : StripeProductKeys.POTATO_PLAN_PROD,
  },
  6: {
    key: "6-month-plan",
    title: "6 month plan",
    final_price: 45.96,
    price: 132,
    subscription_period: 6,
    stripe_price_id: isDevelopment ? 'price_1LyDHALPHXTxUZlWkyRvVJvK' : 'price_1LyDfTLPHXTxUZlWAccHFvsB', // $45.96 every 6 months
    stripe_product: isDevelopment? StripeProductKeys.POTATO_PLAN_DEV : StripeProductKeys.POTATO_PLAN_PROD,
  },
  12: {
    key: "12-month-plan",
    title: "12 month plan",
    final_price: 66,
    price: 264,
    subscription_period: 12,
    isFeatured: true,
    stripe_price_id: isDevelopment ? 'price_1LyDIOLPHXTxUZlWRfU0njqG' : 'price_1LyDfTLPHXTxUZlW5fNTHCDb', // $66 every year
    stripe_product: isDevelopment? StripeProductKeys.POTATO_PLAN_DEV : StripeProductKeys.POTATO_PLAN_PROD,
  },
};

export const QUIZ_CHECKOUT_4_PRODUCTS: Record<3 | 6 | 12, SelectedPlan> = {
  3: {
    key: "3-month-plan",
    title: "3 month plan",
    final_price: 33,
    price: 71.99,
    subscription_period: 3,
    // @TODO: to change
    stripe_price_id: isDevelopment ? 'price_1LyDGRLPHXTxUZlWXR2ePKor' : 'price_1LyDfTLPHXTxUZlW3z1miNpN', // $33 every 3 months 
    stripe_product: isDevelopment? StripeProductKeys.POTATO_PLAN_DEV : StripeProductKeys.POTATO_PLAN_PROD,
  },
  6: {
    key: "6-month-plan",
    title: "6 month plan",
    final_price: 45.6,
    price: 142.99,
    subscription_period: 6,
    stripe_price_id: isDevelopment ? 'price_1LyDJqLPHXTxUZlWlGVOje6J' : 'price_1LyDfTLPHXTxUZlWSvrTWf4O', // $45.60 every 6 month
    stripe_product: isDevelopment? StripeProductKeys.POTATO_PLAN_DEV : StripeProductKeys.POTATO_PLAN_PROD,
  },
  12: {
    key: "12-month-plan",
    title: "12 month plan",
    final_price: 67.2,
    price: 287.99,
    subscription_period: 12,
    isFeatured: true,
    stripe_price_id: isDevelopment ? 'price_1LyDKRLPHXTxUZlWol6YNTT7' : 'price_1LyDfTLPHXTxUZlW300F34AQ', // $67.20 every year
    stripe_product: isDevelopment? StripeProductKeys.POTATO_PLAN_DEV : StripeProductKeys.POTATO_PLAN_PROD,
  },
};