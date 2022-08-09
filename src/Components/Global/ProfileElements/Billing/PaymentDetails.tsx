import { useState } from 'react';
import { useSelector } from 'react-redux';
import { PaymentMethodTypes } from 'src/state/reduxstate/projects/types';
import { userDataSelector } from 'src/state/reduxstate/user/selectors';
import {
  Typography,
  TypographyVariant,
  TypographyWeight,
} from '../../Typography';

import './Billing.scss';
import { PAYMENT_DETAILS } from './constants';

interface PaymentDetailsProps {
  selectedPaymentMethod: PaymentMethodTypes;
}

export const PaymentDetails: React.FC<PaymentDetailsProps> = ({
  selectedPaymentMethod,
}) => {
  const userInfo = useSelector(userDataSelector);

  return (
    <div className="Billing__border-wrapper">
      <div className="flex">
        <div className="Billing__border-wrapper__texts">
          <Typography className="Billing__border-wrapper__texts__title">
            Saved payment details
          </Typography>
          <Typography className="Billing__border-wrapper__texts__subtitle">
            Select default payment method
          </Typography>
        </div>
        <div className="Billing__border-wrapper__payment-details">
          {PAYMENT_DETAILS.map(({ id, icon, title, method }) => {
            const isSelected = method === selectedPaymentMethod;
            return (
              <div
                className={`Billing__border-wrapper__payment-details__payment-type ${
                  isSelected ? 'selected' : ''
                }`}
                key={id}
              >
                <div className="flex">
                  <div>
                    <img
                      src={icon}
                      alt={method}
                      className="Billing__border-wrapper__payment-details__payment-type__card-icon"
                    />
                  </div>
                  <div>
                    <Typography
                      variant={TypographyVariant.SUBHEADING}
                      weight={TypographyWeight.MEDIUM}
                    >
                      {title}{' '}
                      {method === PaymentMethodTypes.CARDS && `Ending in 2024`}
                    </Typography>
                    <Typography
                      variant={TypographyVariant.SUBHEADING}
                      weight={TypographyWeight.MEDIUM}
                    >
                      Expiry 12/2024
                    </Typography>
                    <div className="Billing__border-wrapper__payment-details__payment-type__default">
                      <Typography>Set as default</Typography>
                      <button className="Billing__border-wrapper__payment-details__payment-type__default__remove-btn">
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
                <input checked={isSelected} type="radio" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
