import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { UserContextProvider } from './state/userContext';
import { UserInfoContextProvider } from 'src/state/UserInfoContextProvider';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './state/reduxstate/store';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(
  'pk_test_51LSQG2LPHXTxUZlWyvAfxX92AV2docuxwV92qiDuFIP5lzErCWGxFmvUIXjHmPBfonOTNqR3c3F0pJMobFmzfBN00jIXrnBDk'
);

const options = {
  // passing the client secret obtained from the server
  clientSecret:
    'sk_test_51LSQG2LPHXTxUZlWQNxt7JKuBEHvrrMeMPhS9aBJc931zbxuH8FK7lolHpFvrXK1U0YzLCY8DMEgFs6Ae9tGFG4000WqtcLcU',
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <UserContextProvider>
          <UserInfoContextProvider>
            <Elements stripe={stripePromise} options={options}>
              <App />
            </Elements>
          </UserInfoContextProvider>
        </UserContextProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
