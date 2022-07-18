import { useContext, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import TagManager from 'react-gtm-module';
import { useCookies } from 'react-cookie';
import { PersistGate } from 'redux-persist/integration/react';
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
} from 'src/Components/Pages';

import ScrollOnNavigation from './Components/Global/ScrollOnNavigation/ScrollOnNavigation';

import { LinkList } from './types';
import { AddToCardPage, CheckoutPage, SuccessPage } from './pages';
import { persistor, store } from './state/reduxstate/store';

import { UserInfoContext } from './state/UserInfoContextProvider';
import { isLoggedIn } from './Common/utils/isLoggedIn';

import './App.scss';
import '../src/utils/breakpointsMixins.scss';
import 'normalize.css';
import _ from 'lodash';

const App = () => {
  const [getCookie, setCookie] = useCookies(['currency', 'currencySymbol']);
  const [currecy, setCurrency] = useState('$');
  const {userInfo, getUserInfo} = useContext(UserInfoContext)

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
    console.log(isLoggedIn())
    console.log(_.isEmpty(userInfo))

    if (isLoggedIn()) {
      console.log('papulinkim info')
      getUserInfo();
    }
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <ScrollOnNavigation />
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <Routes>
              <Route>
                <Route index element={<Frontpage />} />
                <Route path={LinkList.Faq} element={<FAQpage />} />
                <Route path={LinkList.Pricing} element={<Pricing />} />
                <Route path={LinkList.Membership} element={<SalesFunnel />} />
                <Route path={LinkList.Checkout} element={<CheckoutPage />} />
                <Route path={LinkList.AddToCard} element={<AddToCardPage />} />
                <Route path={LinkList.Success} element={<SuccessPage />} />
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

              <Route path={LinkList.Login} element={<Login />} />
              <Route path={LinkList.Register} element={<Register />} />
              {/* TODO: make these as private routes */}
              <Route path={LinkList.WAITLIST} element={<WaitlistSignUp />} />
              <Route path={LinkList.DASHBOARD} element={<Dashboard />} />
              <Route path={LinkList.TRENDS} element={<Trends />} />
              <Route path={LinkList.DISCOVER} element={<Discover />} />

              <Route path={LinkList.PROFILE} element={<Profile />} />
            </Routes>
          </PersistGate>
        </Provider>
      </BrowserRouter>
      <script
        type="text/javascript"
        src="//static.klaviyo.com/onsite/js/klaviyo.js?company_id=Us6NPr"
      />
    </div>
  );
};

export default App;
