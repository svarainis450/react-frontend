import { useState } from 'react';
import { PaymentMethodTypes } from 'src/state/reduxstate/projects/types';
import { icons } from 'src/utils/icons';
import {
  Typography,
  TypographyVariant,
  TypographyWeight,
} from '../../Typography';

import './Billing.scss';
import { EmailInfo } from './EmailInfo';
import { PaymentMethod } from './PaymentMethod';

const PAYMENT_METHODS = [
  {
    id: 1,
    title: 'Paypal',
    icon: icons.paypal_logo,
    method: PaymentMethodTypes.PAYPAL,
  },
  {
    id: 2,
    title: 'Credit or debit card',
    icon: icons.cards_logos,
    method: PaymentMethodTypes.CARDS,
  },
];

export const Billing: React.FC = () => {
  const [selectedMethod, setSelectedMethod] =
    useState<PaymentMethodTypes | null>(null);

  const handleMethodSelection = (method: PaymentMethodTypes) => {
    if (selectedMethod === method) {
      setSelectedMethod(null);
    } else {
      setSelectedMethod(method);
    }
  };

  return (
    <div className="Billing">
      <div>
        <Typography
          variant={TypographyVariant.HEADING_SMALL}
          weight={TypographyWeight.BOLD}
        >
          Payment method
        </Typography>
        <Typography weight={TypographyWeight.THIN}>
          Update your billing details and address
        </Typography>
      </div>
      <div className="Billing__border-wrapper">
        <div className="Billing__border-wrapper__texts">
          <Typography className="Billing__border-wrapper__texts__title">
            Choose a Payment Method
          </Typography>
        </div>
        {PAYMENT_METHODS.map(({ id, title, icon, method }) => (
          <PaymentMethod
            key={id}
            id={id}
            title={title}
            icon={icon}
            method={method}
            isSelected={method === selectedMethod}
            onClick={() => handleMethodSelection(method)}
          />
        ))}
      </div>
      <EmailInfo />
    </div>
  );
};
