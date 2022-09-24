import { useEffect, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './StripeCheckout.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  userDataSelector,
  userTokenSelector,
} from 'src/state/reduxstate/user/selectors';
import { secretKeySelector } from 'src/state/reduxstate/payments/selectors';
import {
  completePaymentPost,
  createPaymentIntent,
} from 'src/state/reduxstate/payments/thunks';
import axios from 'axios';
import { apiv1, apiv2 } from 'src/state/reduxstate/types';

export default function CheckoutForm() {
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const userData = useSelector(userDataSelector);
  const token = useSelector(userTokenSelector);
  const [userName, setUserName] = useState('');
  const paymentDetails = {
    item_description: 'Monthly subscription',
    phone: '867777777',
    price: '20',
    customer_description: 'customer',
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

      const confirm = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: cardElement,
        },
      });
      console.log(confirm);

      setMessage('Payment succeeded!');
      //TODO: check all the messages
      // stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      //   switch (paymentIntent.status) {
      //     case 'succeeded':
      //       setMessage('Payment succeeded!');
      //       break;
      //     case 'processing':
      //       setMessage('Your payment is processing.');
      //       break;
      //     case 'requires_payment_method':
      //       setMessage('Your payment was not successful, please try again.');
      //       break;
      //     default:
      //       setMessage('Something went wrong.');
      //       break;
      //   }
      // });

      console.log(res.data);
    } catch {
      console.log('err');
      setMessage('Something went wrong.');
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
        {/* <PaymentElement id="payment-element" /> */}
        <div>
          <input
            className="full-name-input"
            placeholder="Name on card"
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <CardElement />
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
}
