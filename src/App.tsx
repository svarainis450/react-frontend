import { useContext, useEffect, useState } from 'react';
import {
  BrowserRouter,
  Routes as PublicRoutes,
  Route,
  Navigate,
} from 'react-router-dom';
import TagManager from 'react-gtm-module';
import { useCookies } from 'react-cookie';
import * as qs from 'query-string';

import ScrollOnNavigation from './Components/Global/ScrollOnNavigation/ScrollOnNavigation';

import { LinkList } from './types';
import {
  AboutPage,
  AddToCardPage,
  CheckoutPage,
  Frontpage,
  Pricing,
  SalesFunnel,
  SuccessPage,
  FAQPage,
  DemoPage,
  PrivacyPolicy,
  TermsAndConditions,
  WaitlistSignUp,
  Partnerships,
  QuizCheckout,
  Login,
  Register,
  Landing,
  Landing2,
  Landing3,
  Landing5,
  Landing4,
  Quiz,
  Email,
  Dashboard,
  Discover,
  ExpiredSubscription,
  ForYou,
  Funds,
  Influencers,
  Profile,
  Trends,
  YourInfluencers,
} from './pages';
import { useAppDispatch } from './state/reduxstate/store';

import { UserInfoContext } from './state/UserInfoContextProvider';
import { isLoggedIn } from './Common/utils/isLoggedIn';

import './App.scss';
import '../src/utils/breakpointsMixins.scss';
import 'normalize.css';
import { setUserToken } from './state/reduxstate/user/slice';
import { CookiesComponent } from './Components/Global/CookiesComponent/CookiesComponent';

import {
  QUIZ_CHECKOUT_3_PRODUCTS,
  QUIZ_CHECKOUT_4_PRODUCTS,
  QUIZ_CHECKOUT_PRODUCTS,
} from './constants';
import { useAuth } from './hooks';
import { UserContext } from './state/userContext';
import { ResetPasswCode } from './Components/Pages/ResetPasswCode/ResetPasswCode';
import { ResetPassword } from './Components/Pages/ResetPassword/ResetPassword';

const App = () => {
  const dispatch = useAppDispatch();
  const [getCookie, setCookie] = useCookies(['currency', 'currencySymbol']);
  const [, setCurrency] = useState('$');
  const { getUserInfo } = useContext(UserInfoContext);
  const { setUser } = useContext(UserContext);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (process.env.REACT_APP_ENV !== 'development') {
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

    //
    var parameters = qs.parse(window.location.search);

    if (parameters['f']) {
      setUser((prev) => ({ ...prev, funnel: Number(parameters['f']) }));
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn()) {
      getUserInfo();
      const token = JSON.parse(String(localStorage.getItem('token')));
      dispatch(setUserToken(token));
    }
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <ScrollOnNavigation />
        <PublicRoutes>
          <Route index element={<Frontpage />} />
          <Route path={LinkList.Landing} element={<Landing />} />
          <Route path="/landing/2" element={<Landing2 />} />
          <Route path="/landing/3" element={<Landing3 />} />
          <Route path="/landing/4" element={<Landing4 />} />
          <Route path="/landing/5" element={<Landing5 />} />

          <Route path={LinkList.Quiz} element={<Quiz />} />
          <Route path={LinkList.Email} element={<Email />} />

          <Route path={LinkList.Faq} element={<FAQPage />} />
          <Route path={LinkList.Pricing} element={<Pricing />} />
          <Route path={LinkList.Membership} element={<SalesFunnel />} />
          <Route path={LinkList.Checkout} element={<CheckoutPage />} />
          <Route
            path={LinkList.QuizCheckout}
            element={<QuizCheckout products={QUIZ_CHECKOUT_PRODUCTS} />}
          />
          {/** TODO: remove those tests */}
          <Route
            path="/quiz-checkout/2"
            element={<QuizCheckout products={QUIZ_CHECKOUT_PRODUCTS} />}
          />
          <Route
            path="/quiz-checkout/3"
            element={<QuizCheckout products={QUIZ_CHECKOUT_3_PRODUCTS} />}
          />
          <Route
            path="/quiz-checkout4/"
            element={<QuizCheckout products={QUIZ_CHECKOUT_4_PRODUCTS} />}
          />

          <Route path={LinkList.ResetPassword} element={<ResetPassword />} />
          <Route
            path={LinkList.ResetPasswordCode}
            element={<ResetPasswCode />}
          />

          <Route path={LinkList.AddToCard} element={<AddToCardPage />} />
          <Route path={LinkList.Success} element={<SuccessPage />} />
          <Route path={LinkList.WAITLIST} element={<WaitlistSignUp />} />
          <Route path={LinkList.PARTNERSHIPS} element={<Partnerships />} />
          <Route
            path={LinkList.TermsAndConditions}
            element={<TermsAndConditions />}
          />
          <Route path={LinkList.PrivacyPolicy} element={<PrivacyPolicy />} />
          <Route path={LinkList.Demo} element={<DemoPage />} />
          <Route path={LinkList.About} element={<AboutPage />} />

          <Route path={LinkList.WAITLIST} element={<WaitlistSignUp />} />
          <Route
            path={LinkList.Login}
            element={
              isAuthenticated ? <Navigate to={LinkList.TRENDS} /> : <Login />
            }
          />
          <Route
            path={LinkList.Register}
            element={
              isAuthenticated ? <Navigate to={LinkList.TRENDS} /> : <Register />
            }
          />
          {/** PRIVATE ROUTES  */}
          <Route
            path={LinkList.DASHBOARD}
            element={
              isAuthenticated ? <Dashboard /> : <Navigate to={LinkList.Login} />
            }
          />
          <Route
            path={LinkList.TRENDS}
            element={
              isAuthenticated ? <Trends /> : <Navigate to={LinkList.Login} />
            }
          />
          <Route
            path={LinkList.DISCOVER}
            element={
              isAuthenticated ? <Discover /> : <Navigate to={LinkList.Login} />
            }
          />
          <Route
            path={LinkList.PROFILE}
            element={
              isAuthenticated ? <Profile /> : <Navigate to={LinkList.Login} />
            }
          />
          <Route
            path={LinkList.INFLUENCERS}
            element={
              isAuthenticated ? (
                <Influencers />
              ) : (
                <Navigate to={LinkList.Login} />
              )
            }
          />
          <Route
            path={LinkList.FUNDS}
            element={
              isAuthenticated ? <Funds /> : <Navigate to={LinkList.Login} />
            }
          />
          <Route
            path={LinkList.FORYOU}
            element={
              isAuthenticated ? <ForYou /> : <Navigate to={LinkList.Login} />
            }
          />
          <Route
            path={LinkList.YOUR_INFLUENCERS}
            element={
              isAuthenticated ? (
                <YourInfluencers />
              ) : (
                <Navigate to={LinkList.Login} />
              )
            }
          />
          <Route
            path={LinkList.EXPIRED_SUBSCRIPTION}
            element={
              isAuthenticated ? (
                <ExpiredSubscription />
              ) : (
                <Navigate to={LinkList.Login} />
              )
            }
          />
        </PublicRoutes>
      </BrowserRouter>
      <CookiesComponent />
    </div>
  );
};

export default App;
