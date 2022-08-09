import { useState } from 'react';
import {
  Typography,
  TypographyVariant,
  TypographyWeight,
} from 'src/Components/Global/Typography';
import './BillingHistory.scss';

const TABLE_TITLES = ['', 'Plan', 'Amount', 'Date', 'Status', 'Invoice'];

const BILLING_DATA = [
  {
    id: 1,
    title: 'Potato Starter monthly',
    price: 12,
    date: 'Dec 1, 2022',
    status: 'Paid',
  },
  {
    id: 2,
    title: 'Potato Starter monthly',
    price: 12,
    date: 'Dec 1, 2022',
    status: 'Paid',
  },
  {
    id: 3,
    title: 'Potato Starter monthly',
    price: 12,
    date: 'Dec 1, 2022',
    status: 'Paid',
  },
];

export const BillingHistory: React.FC = () => {
  const [selectedInvoice, setSelectedInvoice] = useState<null | number>(null);

  return (
    <div className="Billing-history">
      <Typography
        variant={TypographyVariant.DEFAULT}
        weight={TypographyWeight.BOLD}
      >
        Billing history
      </Typography>
      <div className="Billing-history__table headlines">
        {TABLE_TITLES.map((item, index) => (
          <Typography key={index} weight={TypographyWeight.BOLD}>
            {item}
          </Typography>
        ))}
      </div>
      {BILLING_DATA.map(({ id, status, date, title, price }) => {
        const isSelected = selectedInvoice === id;
        return (
          <div
            key={id}
            className={`Billing-history__table ${isSelected ? 'selected' : ''}`}
          >
            <div
              className="Billing-history__table__radio-wrapper"
              onClick={() => setSelectedInvoice(id)}
            >
              <label>
                <div
                  className={`Billing-history__table__radio-wrapper__circle ${
                    isSelected ? 'selected' : ''
                  }`}
                />
                <input
                  className="Billing-history__table__radio-wrapper__radio-input"
                  checked={isSelected}
                  type="radio"
                />
              </label>
            </div>
            <div>
              <Typography>{title}</Typography>
            </div>
            <div>
              <Typography>${price}</Typography>
            </div>
            <div>
              <Typography>{date}</Typography>
            </div>
            <div>
              <Typography>{status}</Typography>
            </div>
            <button
              className={`Billing-history__table__download-btn ${
                isSelected ? 'selected' : ''
              }`}
            >
              Download
            </button>
          </div>
        );
      })}
    </div>
  );
};
