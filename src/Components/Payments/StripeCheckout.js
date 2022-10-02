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
    price: selectedPlan.stripe_price_id,
    customer_description: 'customer',
    phone: 'dont collect phones',
    product: selectedPlan.stripe_product,
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

      console.log(res);

      const client_secret =
        res.data.latest_invoice.payment_intent.client_secret;

      console.log(res.data.latest_invoice.payment_intent.client_secret);

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
      console.log(paymentIntent);
      console.log(error);

      if (error) {
        setMessage(error.message);
      } else {
        dispatch(setPaymentStatus('succeeded'));
        setMessage('Payment successful!');
      }
      dispatch(updateUserInfo({ type: selectedPlan.plan }));
      console.log(res.data);
    } catch (e) {
      console.log(e);
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
          <CardElement aria="aria-enabled" />
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
