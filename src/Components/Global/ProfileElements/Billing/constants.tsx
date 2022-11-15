import {
  PaymentDetailTypes,
  PaymentMethodTypes,
} from 'src/state/reduxstate/projects/types';
import { icons } from 'src/utils/icons';
import CryptoCurrencies from 'src/Assets/icons/payments/crypto_currencies.svg';
import CardsLogos from 'src/Assets/icons/payments/cards_logos.svg';

export const PAYMENT_METHODS = [
  {
    id: 1,
    title: 'Paypal',
    icon: icons.paypal_logo,
    method: PaymentMethodTypes.PAYPAL,
  },
  {
    id: 2,
    title: 'Credit or debit card',
    icon: CardsLogos,
    method: PaymentMethodTypes.CARDS,
  },
  {
    id: 3,
    title: 'Crypto Currencies',
    icon: CryptoCurrencies,
    method: PaymentMethodTypes.CRYPTO,
  },
];

export const PAYMENT_DETAILS = [
  // {
  //   id: 1,
  //   icon: icons.coingate,
  //   title: PaymentDetailTypes.COINGATE,
  //   method: PaymentMethodTypes.CRYPTO,
  // },
  // {
  //   id: 2,
  //   icon: icons.paypal_card,
  //   title: PaymentDetailTypes.PAYPAl,
  //   method: PaymentMethodTypes.PAYPAL,
  // },
  {
    id: 3,
    icon: icons.visa,
    title: PaymentDetailTypes.VISA,
    method: PaymentMethodTypes.CARDS,
  },
  {
    id: 4,
    icon: icons.mastercard,
    title: PaymentDetailTypes.MASTERCARD,
    method: PaymentMethodTypes.CARDS,
  },
];
