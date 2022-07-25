import { useContext } from 'react';
import { UserInfoContext } from 'src/state/UserInfoContextProvider';
import { icons } from 'src/utils/icons';
import { Typography } from '../../Typography';

import './Billing.scss';

export const EmailInfo: React.FC = () => {
  const { userInfo } = useContext(UserInfoContext);

  return (
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
          {/* TODO: billing. check if email value comes as expected */}
          <Typography className="Billing__border-wrapper__texts__subtitle">
            {userInfo.email || 'email@email.com'}
          </Typography>
          <Typography className="Billing__border-wrapper__texts__title other">
            Send to other account email
          </Typography>
          <form className="Billing__border-wrapper__texts__input-wrapper">
            <img
              src={icons.envelope}
              alt="email input"
              className="Billing__border-wrapper__texts__input-wrapper__envelope"
            />
            {/* TODO: add submit, when email submit visuals appears */}
            <input
              value={userInfo.email || 'email@email.com'}
              className="Billing__border-wrapper__texts__input-wrapper__input"
            />
          </form>
        </div>
      </div>
    </div>
  );
};
