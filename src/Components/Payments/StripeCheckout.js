import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './StripeCheckout.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectedPlanSelector,
  userTokenSelector,
} from 'src/state/reduxstate/user/selectors';

import axios from 'axios';
import { apiv1 } from 'src/state/reduxstate/types';
import { updateUserInfo } from 'src/state/reduxstate/user/thunks';
import { setPaymentStatus } from 'src/state/reduxstate/payments/slice';

const CheckoutForm = () => {
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const selectedPlan = useSelector(selectedPlanSelector);

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const token = useSelector(userTokenSelector);
  const [userName, setUserName] = useState('');
  const paymentDetails = {
    item_description: `${selectedPlan.billing_type} subscription`,
    price: String(selectedPlan.begin_price),
    customer_description: 'customer',
    phone: 'we do not collect phone data yet',
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const cardElement = elements.getElement(CardElement);
    try {
      const res = await axios.post(`${apiv1}/stripe`, paymentDetails, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { client_secret } = res.data;

      const { error, paymentIntent } = await stripe.confirmCardPayment(
        client_secret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: userName,
            },
          },
        }
      );

      if (error) {
        setMessage(error.message);
      } else {
        dispatch(setPaymentStatus('succeeded'));
        setMessage('Payment successful!');
      }
      dispatch(updateUserInfo({ type: 'Potato Starter' }));
    } catch {
      console.log('err');
      setMessage('An unexpected error occurred.');
      setIsLoading(false);
    }

    setIsLoading(false);

    // if (error.type === 'card_error' || error.type === 'validation_error') {
    //   setMessage(error.message);
    // } else {
    //   setMessage('An unexpected error occurred.');
    // }
  };

  return (
    <div className="stripe-payment">
      <form id="payment-form" onSubmit={handleSubmit}>
        <div>
          <label>Full name</label>
          <input
            className="full-name-input"
            placeholder="Name on card"
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="card-wrapper">
          <CardElement />
        </div>
        <button disabled={isLoading || !stripe || !elements} id="submit">
          <span id="button-text">
            {isLoading ? (
              <div className="spinner" id="spinner"></div>
            ) : (
              'Pay now'
            )}
          </span>
        </button>
        {/* Show any error or success messages */}
        {message && <div id="payment-message">{message}</div>}
      </form>
    </div>
  );
};

export default CheckoutForm;
