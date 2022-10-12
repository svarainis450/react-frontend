import React from 'react';

import { ModalWrapper } from 'src/Components';
import { Button } from 'src/Components/Global/Button';
import { Typography } from 'src/Components/Global/Typography';
import { setModalType } from 'src/state/reduxstate/modals/slice';
import { ModalTypes } from 'src/state/reduxstate/modals/types';
import { setPaymentStatus } from 'src/state/reduxstate/payments/slice';
import { useAppDispatch } from 'src/state/reduxstate/store';
import { icons } from 'src/utils/icons';
import './UpgradeToPro.scss';

const PRO_FEATURES = [
  'Follow an unlimited amount of crypto experts',
  'Follow an unlimited amount of projects',
  'NFT floor price and volume analysis',
  'Crypto price and volume analysis',
  'Unlimited search',
];

export const UpgradeToPro: React.FC = () => {
  const dispatch = useAppDispatch();

  const closeModal = () => {
    dispatch(setModalType(null));
  };

  const handleUpgradeToPro = () => {
    dispatch(setPaymentStatus('idle'));
    dispatch(setModalType(ModalTypes.UPGRADE_TO_PRO_PAYMENT));
  };

  return (
    <ModalWrapper overlayBackground="rgba(255,255,255,0.80)">
      <div className="upgrade-modal">
        <img
          className="close-modal"
          src={icons.closeXBlack}
          alt="close modal"
          onClick={closeModal}
        />
        <img src={icons.premium_modal} alt="Premium feature" />
        <Typography className="title">This is a premium feature</Typography>
        <Typography className="subtitle">
          Upgrade to <strong>Potato Pro</strong> now and save{' '}
          <strong>-25%</strong>
        </Typography>
        <Button onClick={handleUpgradeToPro}>Upgrade to Pro</Button>
        <Typography className="pricing">
          $15 per month. Cancel anytime.
        </Typography>
        <ul>
          {PRO_FEATURES.map((item, index) => (
            <li key={index}>
              <img src={icons.circle_check_green} alt="checkmark" />
              <Typography>{item}</Typography>
            </li>
          ))}
        </ul>
      </div>
    </ModalWrapper>
  );
};
