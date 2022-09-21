import { useState } from 'react';
import { Typography } from 'src/Components/Global/Typography';
import { Prices } from 'src/globalConstants/prices';

import './UpgradeSelection.scss';

type Selection = 'Monthly' | 'Yearly';

export const UpgradeSelection: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<Selection>('Yearly');
  const isMonthly = selectedPlan === 'Monthly';
  const discount = 25;

  return (
    <div className="upgrade-selection">
      <Typography className="upgrade-selection__title">
        Upgrade to Potato Pro
      </Typography>
      <div className="upgrade-selection__select-wrapper">
        <label
          className={`upgrade-selection__select-wrapper__selection ${
            isMonthly ? 'selected' : ''
          }`}
        >
          <input
            type="radio"
            checked={isMonthly}
            onChange={() => setSelectedPlan('Monthly')}
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
            onChange={() => setSelectedPlan('Yearly')}
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
