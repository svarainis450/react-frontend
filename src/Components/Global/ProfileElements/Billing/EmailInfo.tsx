import { ChangeEvent, FormEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'src/Common/utils/LogOut';
import { useAppDispatch } from 'src/state/reduxstate/store';
import { userDataSelector } from 'src/state/reduxstate/user/selectors';
import { loginUser, updateUserInfo } from 'src/state/reduxstate/user/thunks';
import { LinkList } from 'src/types';
import { icons } from 'src/utils/icons';
import { Typography } from '../../Typography';

import './Billing.scss';

export const EmailInfo: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector(userDataSelector);
  const [contactEmail, setContactEmail] = useState(userInfo.email);
  const [arrowIcon, setArrowIcon] = useState(icons.input_arrow);

  const hanldeInputSubmit = (e?: FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    document.getElementById('inputForm')?.blur();
    if (contactEmail) {
      dispatch(updateUserInfo({ invoice_email: contactEmail }));
      setArrowIcon(icons.blue_checkmark);
    }
  };

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
            {userInfo.invoice_email || 'email@email.com'}
          </Typography>
          <Typography className="Billing__border-wrapper__texts__title other">
            Send to other account email
          </Typography>
          <form
            onSubmit={(e: FormEvent<HTMLFormElement>) => hanldeInputSubmit(e)}
            className="Billing__border-wrapper__texts__input-wrapper"
          >
            <img
              src={icons.envelope}
              alt="email input"
              className="Billing__border-wrapper__texts__input-wrapper__envelope"
            />

            {/* TODO: add submit, when email submit visuals appears */}
            <input
              id="inputForm"
              className="Billing__border-wrapper__texts__input-wrapper__input"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setContactEmail(e.target.value)
              }
              type="email"
              placeholder="write your email"
              onFocus={() => setArrowIcon(icons.input_arrow)}
            />

            <img
              onClick={() => hanldeInputSubmit()}
              onMouseOver={() => setArrowIcon(icons.input_arrow_filled)}
              onMouseLeave={() => setArrowIcon(icons.input_arrow)}
              src={arrowIcon}
              alt="Active input"
              className="Billing__border-wrapper__texts__input-wrapper__input-arrow"
            />
          </form>
        </div>
      </div>
    </div>
  );
};
