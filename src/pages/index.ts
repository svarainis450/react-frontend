import { lazy } from 'react';
import { withSuspense } from 'src/hocs/withSuspense';

export const Landing = withSuspense(lazy(() => import('./landing/index')));
export const Landing2 = withSuspense(lazy(() => import('./landing/Landing2')));
export const Landing3 = withSuspense(lazy(() => import('./landing/Landing3')));
export const Landing4 = withSuspense(lazy(() => import('./landing/Landing4')));
export const Landing5 = withSuspense(lazy(() => import('./landing/Landing5')));
export const Quiz = withSuspense(lazy(() => import('./quiz')));
export const Email = withSuspense(lazy(() => import('./email')));

export const AboutPage = withSuspense(lazy(() => import('./AboutPage/AboutPage')));
export const CheckoutPage = withSuspense(lazy(() => import('./CheckoutPage')));
export const AddToCardPage = withSuspense(lazy(() => import('./AddToCardPage')));
export const Frontpage = withSuspense(lazy(() => import('./Frontpage/Frontpage')));
export const Pricing = withSuspense(lazy(() => import('./Pricing/Pricing')));
export const SalesFunnel = withSuspense(lazy(() => import('./SalesFunnel/SalesFunnel')));
export const FAQPage = withSuspense(lazy(() => import('./FAQpage')));
export const SuccessPage = withSuspense(lazy(() => import('./SuccessPage')));
export const DemoPage = withSuspense(lazy(() => import('./DemoPage/DemoPage')));
export const PrivacyPolicy = withSuspense(lazy(() => import('./PrivacyPolicy/PrivacyPolicy')));
export const TermsAndConditions = withSuspense(lazy(() => import('./TermsAndConditions/TermsAndConditions')));
export const WaitlistSignUp = withSuspense(lazy(() => import('./WaitlistSignUp/WaitlistSignUp')));
export const Partnerships = withSuspense(lazy(() => import('./Partnerships/Partnerships')));
export const QuizCheckout = withSuspense(lazy(() => import('./QuizCheckoutPage')));

// private routes
export const Dashboard = lazy(() => import('./Dashboard'));
export const Login = lazy(() => import('./Login/Login'));
export const Register = lazy(() => import('./Register/Register'));
export const Trends = lazy(() => import('./Trends/Trends'));
export const Discover = lazy(() => import('./Discover/Discover'));
export const YourInfluencers = lazy(() => import('./YourInfluencers/YourInfluencers'));
export const ExpiredSubscription = lazy(() => import('./ExpiredSubscription/ExpiredSubscription'));
export const Profile = lazy(() => import('./Profile/Profile'));
export const Influencers = withSuspense(lazy(() => import('./Influencers/Influencers')));
export const Funds = withSuspense(lazy(() => import('./Funds/Funds')));
export const ForYou = withSuspense(lazy(() => import('./ForYou/ForYou')));