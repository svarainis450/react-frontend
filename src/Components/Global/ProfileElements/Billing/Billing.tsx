import { useContext } from 'react';
import { UserInfoContext } from 'src/state/UserInfoContextProvider';
import { icons } from 'src/utils/icons';
import {
  Typography,
  TypographyVariant,
  TypographyWeight,
} from '../../Typography';

import './Billing.scss';

const PAYMENT_METHODS = [
  {
    id: 1,
    title: 'Paypal',
    icon: icons.paypal_logo,
  },
  {
    id: 2,
    title: 'Credit or debit card',
    icon: icons.cards_logos,
  },
];

export const Billing: React.FC = () => {
  const { userInfo } = useContext(UserInfoContext);

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
        {PAYMENT_METHODS.map(({ id, title, icon }) => (
          <div className="Billing__border-wrapper__method" key={id}>
            <div className="Billing__border-wrapper__method__info">
              <Typography weight={TypographyWeight.BOLD}>{title}</Typography>
              <img src={icon} alt={title} />
            </div>
            <img src={icons.arrow_right} alt="Arrow" />
          </div>
        ))}
      </div>
      <div className="Billing__border-wrapper">
        <div className="flex">
          <div className="Billing__border-wrapper__texts">
            <Typography className="Billing__border-wrapper__texts__title">
              Contact email
            </Typography>
            <Typography className="Billing__border-wrapper__texts__subtitle">
              Where should invoices be sent?
            </Typography>
          </div>
          <div className="Billing__border-wrapper__texts">
            <Typography className="Billing__border-wrapper__texts__title">
              Send to my account email
            </Typography>
            <Typography className="Billing__border-wrapper__texts__subtitle">
              {userInfo.email || 'email@email.com'}
            </Typography>
            <Typography className="Billing__border-wrapper__texts__title">
              Send to other account email
            </Typography>
            <Typography className="Billing__border-wrapper__texts__subtitle">
              {userInfo.email || 'email@email.com'}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};
