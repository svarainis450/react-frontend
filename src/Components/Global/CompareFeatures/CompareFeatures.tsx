import classNames from 'classnames';
import { Link, useNavigate } from 'react-router-dom';

import { HeroTitle } from '../HeroTitle';
import { CompareFeaturesProps } from './types';
import { LinkList } from '../../../types';
import { Button } from '../Button';

import trueImage from '../../../Assets/images/compareTrue.svg';
import falseImage from '../../../Assets/images/compareFalse.svg';
import { useCookies } from 'react-cookie';
import * as qs from 'query-string';

import './CompareFeatures.scss';
import { useAppDispatch } from 'src/state/reduxstate/store';
import { PlanType } from 'src/state/reduxstate/user/types';
import { setSelectedPlan } from 'src/state/reduxstate/user/slice';
import {
  StripeProductKeys,
  SubsPriceIdStripe,
} from 'src/globalConstants/prices';
import { isDevelopment } from '../PaymentOptions/constants';
import { useContext } from 'react';
import { UserContext } from 'src/state/userContext';

export const CompareFeatures = ({
  featuresList,
  className,
}: CompareFeaturesProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [getCookie] = useCookies(['currency', 'currencySymbol']);
  var currencySymbol = getCookie.currencySymbol;
  const { setUser } = useContext(UserContext);

  const starterProduct = isDevelopment
    ? StripeProductKeys.POTATO_STARTER_DEV
    : StripeProductKeys.POTATO_STARTER_PROD;
  const starterPrices = isDevelopment
    ? SubsPriceIdStripe.STARTER_YEARLY_DEV
    : SubsPriceIdStripe.STARTER_YEARLY_PROD;

  const proProduct = isDevelopment
    ? StripeProductKeys.POTATO_PRO_DEV
    : StripeProductKeys.POTATO_PRO_PROD;
  const proPrices = isDevelopment
    ? SubsPriceIdStripe.PRO_YEARLY_DEV
    : SubsPriceIdStripe.PRO_YEARLY_PROD;

  const handleSelect = (plan: PlanType) => {
    dispatch(
      setSelectedPlan({
        plan: plan,
        billing_type: 'yearly',
        monthly_price: plan === 'Potato Starter' ? 5 : 15,
        begin_price: plan === 'Potato Starter' ? 60 : 180,
        stripe_price_id: plan === 'Potato Starter' ? starterPrices : proPrices,
        stripe_product: plan === 'Potato Starter' ? starterProduct : proProduct,
      })
    );
    navigate(LinkList.Checkout);
  };

  return (
    <div className={classNames('CompareFeatures', className)}>
      <HeroTitle className="CompareFeatures__hero" title="Compare features" />

      <div className="CompareFeatures__table-wrapper">
        <table className="CompareFeatures__table" cellSpacing="0">
          <tr className="CompareFeatures__heading-row">
            <th className="CompareFeatures__first-heading"></th>

            <th className="CompareFeatures__header">
              <p className="CompareFeatures__name">Potato Starter</p>
              <p className="CompareFeatures__occurrence">
                {currencySymbol}5 per month, paid annually
              </p>

              <div className="CompareFeatures__cta">
                <Button onClick={() => handleSelect('Potato Starter')}>
                  Select plan
                </Button>
              </div>
            </th>

            <th className="CompareFeatures__header">
              <p className="CompareFeatures__name">Potato Pro</p>
              <p className="CompareFeatures__occurrence">
                {currencySymbol}15 per month, paid annually
              </p>

              <div className="CompareFeatures__cta">
                <Button
                  buttonType="success"
                  onClick={() => handleSelect('Potato Pro')}
                >
                  Select plan
                </Button>
              </div>
            </th>
          </tr>

          {featuresList.map((item, index) => {
            return (
              <tr key={index}>
                <td className="CompareFeatures__feature-desc">{item.type}</td>
                <td>
                  {item.starter ? (
                    <img
                      className="CompareFeatures__feature-img"
                      src={trueImage}
                      alt="true"
                    />
                  ) : (
                    <img
                      className="CompareFeatures__feature-img"
                      src={falseImage}
                      alt="false"
                    />
                  )}
                </td>
                <td>
                  {item.pro ? (
                    <img
                      className="CompareFeatures__feature-img"
                      src={trueImage}
                      alt="true"
                    />
                  ) : (
                    <img
                      className="CompareFeatures__feature-img"
                      src={falseImage}
                      alt="false"
                    />
                  )}
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
};
