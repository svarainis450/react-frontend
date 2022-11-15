import { useContext, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './StripeCheckout.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  userDataSelector,
  userTokenSelector,
} from 'src/state/reduxstate/user/selectors';

import axios from 'axios';
import { apiv1 } from 'src/state/reduxstate/types';
import {
  updateSendGridData,
  updateUserInfo,
} from 'src/state/reduxstate/user/thunks';
import { setPaymentStatus } from 'src/state/reduxstate/payments/slice';
import { UserContext } from 'src/state/userContext';

const CheckoutForm = () => {
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const userData = useSelector(userDataSelector);

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const token = useSelector(userTokenSelector);
  const [userName, setUserName] = useState('');
  const { user } = useContext(UserContext);

  const paymentDetails = {
    item_description: `${user.selectedPlan.title} subscription`,
    price:
      user.hasDownsell && user.selectedPlan.downsell.stripe_price_id
        ? user.selectedPlan.downsell.stripe_price_id
        : user.selectedPlan?.stripe_price_id,
    customer_description: 'customer',
    phone: 'dont collect phones',
    product:
      user.hasDownsell && user.selectedPlan.downsell.stripe_product
        ? user.selectedPlan.downsell.stripe_product
        : user.selectedPlan?.stripe_product,
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

      const client_secret =
        res.data.latest_invoice.payment_intent.client_secret;
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

      if (paymentIntent.status === 'succeeded') {
        dispatch(
          updateUserInfo({
            type: user.selectedPlan.title,
            subscription_expires_at: String(
              new Date(res.data.current_period_end * 1000)
            ),
          })
        );
      }

      if (error) {
        setMessage(error.message);
      } else {
        dispatch(
          updateSendGridData({
            email: userData.email,
            products: user.selectedPlan.title,
          })
        );
        dispatch(setPaymentStatus('succeeded'));
        setMessage('Payment successful!');
      }
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
