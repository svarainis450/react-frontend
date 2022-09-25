import React from 'react';
import { useSelector } from 'react-redux';
import { modalTypeSelector } from 'src/state/reduxstate/modals/selectors';

import { ModalTypes } from 'src/state/reduxstate/modals/types';
import { UpgradeToPro } from './UpgradeToPro/UpgradeToPro';

const modals: { [value in ModalTypes]: React.FC } = {
  [ModalTypes.UPGRADE_TO_PRO]: UpgradeToPro,
};

export const Modals = () => {
  const modalType = useSelector(modalTypeSelector);

  if (!modalType) return null;

  const ModalBody: React.FC = modals[modalType];
  return <ModalBody />;
};
