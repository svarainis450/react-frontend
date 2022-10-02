import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { ModalWrapper } from 'src/Components';
import { UpgradeSelection } from 'src/Components/Global/ProfileElements/Billing/UpgradeSelection/UpgradeSelection';
import { Typography } from 'src/Components/Global/Typography';
import CheckoutForm from 'src/Components/Payments/StripeCheckout';
import {
  StripeProductKeys,
  SubsPriceIdStripe,
} from 'src/globalConstants/prices';
import { setModalType } from 'src/state/reduxstate/modals/slice';
import { paymentStatusSelector } from 'src/state/reduxstate/payments/selectors';
import { useAppDispatch } from 'src/state/reduxstate/store';
import { selectedPlanSelector } from 'src/state/reduxstate/user/selectors';
import { setSelectedPlan } from 'src/state/reduxstate/user/slice';
import { BillingType, SelectedPlan } from 'src/state/reduxstate/user/types';
import { icons } from 'src/utils/icons';
import './UpgradeToProPayments.scss';

export const UpgradeToProPayments: React.FC = () => {
  const dispatch = useAppDispatch();
  const [billingType, setBillingType] = useState<BillingType>('yearly');
  const selectedPlan = useSelector(selectedPlanSelector);
  const paymentStatus = useSelector(paymentStatusSelector);
  const isDevelopmentEnv = process.env.NODE_ENV === 'development';

  const price: { [key in BillingType]: SubsPriceIdStripe } = {
    monthly: isDevelopmentEnv
      ? SubsPriceIdStripe.PRO_MONTHLY_DEV
      : SubsPriceIdStripe.PRO_MONTHLY_PROD,
    yearly: isDevelopmentEnv
      ? SubsPriceIdStripe.PRO_YEARLY_DEV
      : SubsPriceIdStripe.PRO_YEARLY_PROD,
  };

  const closeModal = () => {
    dispatch(setModalType(null));
  };

  const upgradePlan: SelectedPlan = {
    plan: 'Potato Pro',
    billing_type: billingType,
    begin_price: 15,
    monthly_price: 15,
    stripe_product: isDevelopmentEnv
      ? StripeProductKeys.POTATO_PRO_DEV
      : StripeProductKeys.POTATO_PRO_DEV,
    stripe_price_id: price[billingType],
  };

  useEffect(() => {
    dispatch(setSelectedPlan(upgradePlan));
    if (paymentStatus === 'succeeded') {
      dispatch(setModalType(null));
    }
  }, [billingType, paymentStatus]);

  return (
    <ModalWrapper overlayBackground="rgba(255,255,255,0.80)">
      <div className="upgrade-modal-payments">
        <Typography className="title">Upgrade to Potato Pro</Typography>
        <UpgradeSelection selectedBillingCallback={setBillingType} hideTitle />
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
