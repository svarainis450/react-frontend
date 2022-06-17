import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Frontpage } from './Components/Pages/Frontpage';
import { FAQpage } from './Components/Pages/FAQpage';
import { Pricing } from './Components/Pages/Pricing';
import { SalesFunnel } from './Components/Pages/SalesFunnel';
import { TermsAndConditions } from './Components/Pages/TermsAndConditions';
import { PrivacyPolicy } from './Components/Pages/PrivacyPolicy';
import { DemoPage } from './Components/Pages/DemoPage';
import { AboutPage } from './Components/Pages/AboutPage';
import { Login } from './Components/Pages/Login';

import ScrollOnNavigation from './Components/Global/ScrollOnNavigation/ScrollOnNavigation';

import './App.scss';
import 'normalize.css';
import { LinkList } from './types';
import { AddToCardPage, CheckoutPage, SuccessPage } from './pages';
import { useEffect, useState } from 'react';
import TagManager from 'react-gtm-module';
import { useCookies } from 'react-cookie'
import * as qs from 'query-string';
import { WaitlistSignUp } from './Components/Pages/WaitlistSignUp';

const App = () => {
  const [getCookie, setCookie] = useCookies(['currency', 'currencySymbol'])
  const [currecy, setCurrency] = useState('$');

  
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') {
      TagManager.initialize({ gtmId: 'GTM-NDCWF47' });
    }

    if (window.location.search) {
      setCookie('currency', qs.parse(window.location.search))
    }
    if (getCookie?.currency?.currency === "eur") {
      setCookie('currencySymbol', "€")
      setCurrency("€")
    }
  
    if (getCookie?.currency?.currency === "usd") {
      setCookie('currencySymbol', "$")
      setCurrency("$")
    }
    if (getCookie.currency === undefined && qs.parse(window.location.search)) {
      var parser = qs.parse(window.location.search);
      if (parser.currency == "eur") {
        setCookie('currencySymbol', "€")
      } else {
      setCookie('currencySymbol', "$")
      }
    }

  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <ScrollOnNavigation />
        <Routes>
          <Route>
            <Route index element={<Frontpage />} />
            <Route path={LinkList.Faq} element={<FAQpage />} />
            <Route path={LinkList.Pricing} element={<Pricing />} />
            <Route path={LinkList.Membership} element={<SalesFunnel />}  />
            <Route path={LinkList.Checkout} element={<CheckoutPage />} />
            <Route path={LinkList.AddToCard} element={<AddToCardPage />} />
            <Route path={LinkList.Success} element={<SuccessPage />} />
            <Route
              path={LinkList.TermsAndConditions}
              element={<TermsAndConditions />}
            />
            <Route path={LinkList.PrivacyPolicy} element={<PrivacyPolicy />} />
            <Route path={LinkList.Demo} element={<DemoPage />} />
            <Route path={LinkList.About} element={<AboutPage />} />
          </Route>

          {/* <Route path={LinkList.Login} element={<Login />} /> */}
          <Route path={LinkList.WAITLIST} element={<WaitlistSignUp />} />
        </Routes>
      </BrowserRouter>
    </div>
    
  );
};

export default App;
