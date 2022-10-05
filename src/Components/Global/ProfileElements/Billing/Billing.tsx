import { useState } from 'react';
import { useSelector } from 'react-redux';
import { PaymentMethodTypes } from 'src/state/reduxstate/projects/types';
import { userDataSelector } from 'src/state/reduxstate/user/selectors';
import { Typography, TypographyWeight } from '../../Typography';

import './Billing.scss';
import { BillingHistory } from './BillingHistory/BillingHistory';
import { PAYMENT_METHODS } from './constants';
import { EmailInfo } from './EmailInfo';
import { PaymentDetails } from './PaymentDetails';
import { PaymentMethod } from './PaymentMethod';
import { UpgradeSelection } from './UpgradeSelection/UpgradeSelection';

export const Billing: React.FC = () => {
  const userData = useSelector(userDataSelector);
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
      {userData.type === 'Potato Starter' && <UpgradeSelection />}
      <div className="Billing__section-titles">
        <Typography className="Billing__section-titles__title">
          Payment method
        </Typography>
        <Typography className="grey-text" weight={TypographyWeight.THIN}>
          Update your billing details and address
        </Typography>
      </div>
      {/* <div className="Billing__border-wrapper">
        <div className="Billing__border-wrapper__texts">
          <Typography className="Billing__border-wrapper__texts__title">
            Choose a Payment Method
          </Typography>
        </div>
        {PAYMENT_METHODS.map(({ id, title, icon, method }, index) => (
          <div key={index}>
            <PaymentMethod
              id={id}
              title={title}
              icon={icon}
              method={method}
              isSelected={method === selectedMethod}
              onClick={() => handleMethodSelection(method)}
            />
          </div>
        ))}
      </div> */}
      <EmailInfo />
      {/* <PaymentDetails selectedPaymentMethod={selectedMethod} />
      <BillingHistory /> */}
    </div>
  );
};
