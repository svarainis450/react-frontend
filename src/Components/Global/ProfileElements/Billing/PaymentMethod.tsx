import CheckoutForm from 'src/Components/Payments/StripeCheckout';
import { PaymentMethodTypes } from 'src/state/reduxstate/projects/types';
import { icons } from 'src/utils/icons';
import { Typography, TypographyWeight } from '../../Typography';
import './Billing.scss';

interface PaymentMethodProps {
  id: number;
  title: string;
  icon: string;
  method: PaymentMethodTypes;
  onClick: (method: PaymentMethodTypes) => void;
  isSelected: boolean;
}

export const PaymentMethod: React.FC<PaymentMethodProps> = ({
  id,
  title,
  icon,
  method,
  onClick,
  isSelected,
}) => (
  <div className="Billing__border-wrapper__method">
    <div className="Billing__border-wrapper__method__flex" key={id}>
      <div
        className={`Billing__border-wrapper__method__flex__info ${
          method === PaymentMethodTypes.CARDS ? 'column' : ''
        }`}
      >
        <Typography weight={TypographyWeight.BOLD}>{title}</Typography>
        <img src={icon} alt={title} />
      </div>
      <img
        onClick={() => onClick(method)}
        src={icons.arrow_right}
        alt="Arrow"
        className={`Billing__border-wrapper__method__details-wrapper__arrow ${
          isSelected ? 'selected' : ''
        }`}
      />
    </div>
    {isSelected && (
      <div className="Billing__border-wrapper__method__details">
        {/* TODO: billing. payment iframe should come here */}
        {method === PaymentMethodTypes.CARDS && <CheckoutForm />}
      </div>
    )}
  </div>
);
