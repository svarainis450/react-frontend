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
  <div
    className="Billing__border-wrapper__method"
    onClick={() => onClick(method)}
  >
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
        src={icons.arrow_right}
        alt="Arrow"
        className={`Billing__border-wrapper__method__flex__arrow ${
          isSelected ? 'selected' : ''
        }`}
      />
    </div>
    {isSelected && (
      <div className="Billing__border-wrapper__method__details">
        iframe data
        {/* TODO: billing. payment iframe should come here */}
        <CheckoutForm />
      </div>
    )}
  </div>
);
