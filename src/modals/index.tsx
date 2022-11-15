import React from 'react';
import { useSelector } from 'react-redux';
import { modalTypeSelector } from 'src/state/reduxstate/modals/selectors';

import { ModalTypes } from 'src/state/reduxstate/modals/types';
import { UpgradeToPro } from './UpgradeToPro/UpgradeToPro';
import { UpgradeToProPayments } from './UpgradeToProPayments/UpgradeToProPayments';

const modals: { [value in ModalTypes]: React.FC } = {
  [ModalTypes.UPGRADE_TO_PRO]: UpgradeToPro,
  [ModalTypes.UPGRADE_TO_PRO_PAYMENT]: UpgradeToProPayments,
};

export const Modals = () => {
  const modalType = useSelector(modalTypeSelector);

  if (!modalType) return null;

  const ModalBody: React.FC = modals[modalType];
  return <ModalBody />;
};
