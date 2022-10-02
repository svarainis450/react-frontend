import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';

import { ModalWrapper } from 'src/Components';
import { Button } from 'src/Components/Global/Button';
import { UpgradeSelection } from 'src/Components/Global/ProfileElements/Billing/UpgradeSelection/UpgradeSelection';
import { Typography } from 'src/Components/Global/Typography';
import { SubscriptionOptions } from 'src/Components/layouts/SubscriptionOptions';
import CheckoutForm from 'src/Components/Payments/StripeCheckout';
import { setModalType } from 'src/state/reduxstate/modals/slice';
import { useAppDispatch } from 'src/state/reduxstate/store';
import { setSelectedPlan } from 'src/state/reduxstate/user/slice';
import { SelectedPlan } from 'src/state/reduxstate/user/types';
import { icons } from 'src/utils/icons';
import './UpgradeToProPayments.scss';

const secretKey = process.env.REACT_APP_STRIPE_SECRET_KEY;

const stripePromise = secretKey && loadStripe(secretKey);

export const UpgradeToProPayments: React.FC = () => {
  const dispatch = useAppDispatch();

  const closeModal = () => {
    dispatch(setModalType(null));
  };

  const upgradePlan: SelectedPlan = {
    plan: 'Potato Pro',
    billing_type: 'monthly',
    begin_price: 15,
    monthly_price: 15,
  };

  const handleUpgradeToPro = () => {
    dispatch(setSelectedPlan(upgradePlan));
  };

  return (
    <ModalWrapper overlayBackground="rgba(255,255,255,0.80)">
      <div className="upgrade-modal-payments">
        <Typography className="title">Upgrade to Potato Pro</Typography>
        <UpgradeSelection hideTitle />
        <img
          className="close-modal"
          src={icons.closeXBlack}
          alt="close modal"
          onClick={closeModal}
        />
        <Typography className="title">Payment Details</Typography>
        <CheckoutForm />
        <div className="cards-wrapper">
          <img src={icons.cards_logos} alt="payment cards" />
        </div>
      </div>
    </ModalWrapper>
  );
};
