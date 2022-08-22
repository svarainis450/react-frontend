import React, { useEffect, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './StripeCheckout.scss';
import { useDispatch, useSelector } from 'react-redux';
import { userDataSelector } from 'src/state/reduxstate/user/selectors';
import { secretKeySelector } from 'src/state/reduxstate/payments/selectors';
import {
  completePaymentPost,
  createPaymentIntent,
} from 'src/state/reduxstate/payments/thunks';

export default function CheckoutForm() {
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const userData = useSelector(userDataSelector);
  const [userName, setUserName] = useState('');
  const secretKey = useSelector(secretKeySelector);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case 'succeeded':
          setMessage('Payment succeeded!');
          break;
        case 'processing':
          setMessage('Your payment is processing.');
          break;
        case 'requires_payment_method':
          setMessage('Your payment was not successful, please try again.');
          break;
        default:
          setMessage('Something went wrong.');
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);
    dispatch(createPaymentIntent());
    const cardElement = elements.getElement(CardElement);

    const { error } = await stripe.confirmCardPayment(
      secretKey,
      {
        // Make sure to change this to your payment completion page
        // elements,
        // return_url: `${api}/order/${userData.id}/completed`,

        payment_method: {
          card: cardElement,
          billing_details: {
            name: userName,
          },
        },
      },
      dispatch(completePaymentPost(userData.id))
    );

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === 'card_error' || error.type === 'validation_error') {
      setMessage(error.message);
    } else {
      setMessage('An unexpected error occurred.');
    }

    setIsLoading(false);
  };

  return (
    <div className="stripe-payment">
      <form id="payment-form" onSubmit={handleSubmit}>
        {/* <PaymentElement id="payment-element" /> */}
        <div>
          <input
            class="full-name-input"
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
