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
  selectedPaymentMethod: PaymentMethodTypes | null;
}

export const PaymentDetails: React.FC<PaymentDetailsProps> = ({
  selectedPaymentMethod,
}) => {
  const userInfo = useSelector(userDataSelector);
  const [showCryptoInfo, setShowCryptoInfo] = useState(false);

  const handleCryptoInfoBlockShow = () => {
    if (selectedPaymentMethod === PaymentMethodTypes.CRYPTO) {
      setShowCryptoInfo(true);
    }
  };

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
          {showCryptoInfo && (
            <div className="crypto-info-block">
              <Typography>
                This payment provider doesn't support automatic recurring
                payments, so your service will not renew. Payments are charged
                in USD. Payment provider fees may apply. You will be redirected
                to CoinGate to complete your purchase securely. It may take up
                to 24 hours to process your payment. You will get an email
                notification as soon as the service is active.
              </Typography>
            </div>
          )}
          {PAYMENT_DETAILS.map(({ id, icon, title, method }) => {
            const isSelected = method === selectedPaymentMethod;
            return (
              <div
                className={`Billing__border-wrapper__payment-details__payment-type ${
                  isSelected ? 'selected' : ''
                }`}
                key={id}
                onMouseOver={() => handleCryptoInfoBlockShow()}
                onMouseLeave={() => setShowCryptoInfo(false)}
              >
                <div className="flex info-wrapper">
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
