import { useContext, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import TagManager from 'react-gtm-module';
import { Cookies, useCookies } from 'react-cookie';
import * as qs from 'query-string';

import {
  AboutPage,
  Dashboard,
  DemoPage,
  Discover,
  FAQpage,
  Frontpage,
  Login,
  Pricing,
  PrivacyPolicy,
  Profile,
  SalesFunnel,
  TermsAndConditions,
  Trends,
  WaitlistSignUp,
  Register,
  Influencers,
  Funds,
  ForYou,
  Partnerships,
} from 'src/Components/Pages';

import ScrollOnNavigation from './Components/Global/ScrollOnNavigation/ScrollOnNavigation';

import { LinkList } from './types';
import { AddToCardPage, CheckoutPage, SuccessPage } from './pages';
import { useAppDispatch } from './state/reduxstate/store';

import { UserInfoContext } from './state/UserInfoContextProvider';
import { isLoggedIn } from './Common/utils/isLoggedIn';

import './App.scss';
import '../src/utils/breakpointsMixins.scss';
import 'normalize.css';
import _ from 'lodash';
import { YourInfluencers } from './Components/Pages/YourInfluencers/YourInfluencers';
import { setUserToken } from './state/reduxstate/user/slice';
import { CookiesComponent } from './Components/Global/CookiesComponent/CookiesComponent'
import {
  Appearance,
  loadStripe,
  StripeElementsOptions,
} from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './Components/Payments/StripeCheckout';
import { api } from './state/reduxstate/types';
import { createPaymentIntent } from './state/reduxstate/payments/thunks';
import { useSelect } from '@mui/base';
import { useSelector } from 'react-redux';
import { secretKeySelector } from './state/reduxstate/payments/selectors';

const stripePromise = loadStripe(
  'pk_test_51LSQG2LPHXTxUZlWyvAfxX92AV2docuxwV92qiDuFIP5lzErCWGdxFmvUIXjHmPBfonOTNqR3c3F0pJMobFmzfBN00jIXrnBDk'
);

const App = () => {
  const dispatch = useAppDispatch();
  const [getCookie, setCookie] = useCookies(['currency', 'currencySymbol']);
  const [currecy, setCurrency] = useState('$');
  const { userInfo, getUserInfo } = useContext(UserInfoContext);
  const [token, setToken] = useState('');
  const clientSecret = useSelector(secretKeySelector);
  const appearance: Appearance = {
    theme: 'stripe',
  };
  const options: StripeElementsOptions = {
    clientSecret,
    appearance,
  };

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    dispatch(createPaymentIntent());
  }, []);

  console.log(clientSecret);

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') {
      TagManager.initialize({ gtmId: 'GTM-NDCWF47' });
    }

    if (window.location.search) {
      setCookie('currency', qs.parse(window.location.search));
    }
    if (getCookie?.currency?.currency === 'eur') {
      setCookie('currencySymbol', '€');
      setCurrency('€');
    }

    if (getCookie?.currency?.currency === 'usd') {
      setCookie('currencySymbol', '$');
      setCurrency('$');
    }
    if (getCookie.currency === undefined && qs.parse(window.location.search)) {
      var parser = qs.parse(window.location.search);
      if (parser.currency == 'eur') {
        setCookie('currencySymbol', '€');
      } else {
        setCookie('currencySymbol', '$');
      }
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn()) {
      getUserInfo();
      const token = JSON.parse(String(localStorage.getItem('token')));
      dispatch(setUserToken(token));
      setToken(token);
    }
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <ScrollOnNavigation />
        {
          <Elements stripe={stripePromise}>
            <Routes>
              <Route>
                <Route index element={<Frontpage />} />
                <Route path={LinkList.Faq} element={<FAQpage />} />
                <Route path={LinkList.Pricing} element={<Pricing />} />
                <Route path={LinkList.Membership} element={<SalesFunnel />} />
                <Route path={LinkList.Checkout} element={<CheckoutPage />} />
                <Route path={LinkList.AddToCard} element={<AddToCardPage />} />
                <Route path={LinkList.Success} element={<SuccessPage />} />
                <Route path={LinkList.WAITLIST} element={<WaitlistSignUp />} />
                <Route
                  path={LinkList.PARTNERSHIPS}
                  element={<Partnerships />}
                />
                <Route
                  path={LinkList.TermsAndConditions}
                  element={<TermsAndConditions />}
                />
                <Route
                  path={LinkList.PrivacyPolicy}
                  element={<PrivacyPolicy />}
                />
                <Route path={LinkList.Demo} element={<DemoPage />} />
                <Route path={LinkList.About} element={<AboutPage />} />
              </Route>

              <Route path={LinkList.WAITLIST} element={<WaitlistSignUp />} />

              <Route
                path={LinkList.Login}
                element={
                  isLoggedIn() ? <Navigate to={LinkList.TRENDS} /> : <Login />
                }
              />
              <Route
                path={LinkList.Register}
                element={
                  isLoggedIn() ? (
                    <Navigate to={LinkList.TRENDS} />
                  ) : (
                    <Register />
                  )
                }
              />
              <Route
                path={LinkList.DASHBOARD}
                element={
                  isLoggedIn() ? (
                    <Dashboard />
                  ) : (
                    <Navigate to={LinkList.Login} />
                  )
                }
              />
              <Route
                path={LinkList.TRENDS}
                element={
                  isLoggedIn() ? <Trends /> : <Navigate to={LinkList.Login} />
                }
              />
              <Route
                path={LinkList.DISCOVER}
                element={
                  isLoggedIn() ? <Discover /> : <Navigate to={LinkList.Login} />
                }
              />
              <Route
                path={LinkList.PROFILE}
                element={
                  isLoggedIn() ? <Profile /> : <Navigate to={LinkList.Login} />
                }
              />
              <Route
                path={LinkList.INFLUENCERS}
                element={
                  isLoggedIn() ? (
                    <Influencers />
                  ) : (
                    <Navigate to={LinkList.Login} />
                  )
                }
              />
              <Route
                path={LinkList.FUNDS}
                element={
                  isLoggedIn() ? <Funds /> : <Navigate to={LinkList.Login} />
                }
              />
              <Route
                path={LinkList.FORYOU}
                element={
                  isLoggedIn() ? <ForYou /> : <Navigate to={LinkList.Login} />
                }
              />
              <Route
                path={LinkList.YOUR_INFLUENCERS}
                element={
                  isLoggedIn() ? (
                    <YourInfluencers />
                  ) : (
                    <Navigate to={LinkList.Login} />
                  )
                }
              />
            </Routes>
          </Elements>
        }
      </BrowserRouter>
      <script
        type="text/javascript"
        src="//static.klaviyo.com/onsite/js/klaviyo.js?company_id=Us6NPr"
      />

      <CookiesComponent />
    </div>
  );
};

export default App;
