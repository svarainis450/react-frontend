import { Dispatch, SetStateAction, useState } from 'react';
import { Typography } from 'src/Components/Global/Typography';
import { Prices } from 'src/globalConstants/prices';
import { BillingType } from 'src/state/reduxstate/user/types';

import './UpgradeSelection.scss';

interface UpgradeSelectionProps {
  hideTitle?: boolean;
  onClick?: () => void;
  selectedBillingCallback?: Dispatch<SetStateAction<BillingType>>;
}

export const UpgradeSelection: React.FC<UpgradeSelectionProps> = ({
  hideTitle = false,
  selectedBillingCallback,
  onClick,
}) => {
  const [selectedPlan, setSelectedPlan] = useState<BillingType>('yearly');
  const isMonthly = selectedPlan === 'monthly';
  const discount = 25;

  return (
    <div className="upgrade-selection">
      {!hideTitle && (
        <Typography className="upgrade-selection__title">
          Upgrade to Potato Pro
        </Typography>
      )}
      <div className="upgrade-selection__select-wrapper">
        <label
          onClick={onClick}
          className={`upgrade-selection__select-wrapper__selection ${
            isMonthly ? 'selected' : ''
          }`}
        >
          <input
            type="radio"
            checked={isMonthly}
            onChange={() => {
              setSelectedPlan('monthly');
              selectedBillingCallback && selectedBillingCallback('monthly');
            }}
            readOnly
          />
          <div
            className={`upgrade-selection__select-wrapper__selection__circle ${
              isMonthly ? 'selected' : ''
            }`}
          />
          <Typography>Bill monthly</Typography>
          <Typography className="upgrade-selection__select-wrapper__selection__price">
            ${Prices.MONTHLY}/month
          </Typography>
        </label>
        <label
          onClick={onClick}
          className={`upgrade-selection__select-wrapper__selection ${
            !isMonthly ? 'selected' : ''
          }`}
        >
          <div className="upgrade-selection__select-wrapper__selection__discount">
            <Typography>-{discount}%</Typography>
          </div>
          <div
            className={`upgrade-selection__select-wrapper__selection__circle ${
              !isMonthly ? 'selected' : ''
            }`}
          />
          <input
            type="radio"
            checked={!isMonthly}
            onChange={() => {
              setSelectedPlan('yearly');
              selectedBillingCallback && selectedBillingCallback('yearly');
            }}
            readOnly
          />

          <Typography>Bill yearly</Typography>
          <Typography className="upgrade-selection__select-wrapper__selection__price">
            ${Prices.YEARLY}/month
          </Typography>
        </label>
      </div>
    </div>
  );
};
