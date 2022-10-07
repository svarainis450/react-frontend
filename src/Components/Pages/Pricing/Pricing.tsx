import { useContext, useEffect, useMemo, useState } from 'react';
import { PricingHeroes } from './constants';

import { GetStarted } from '../../Global/GetStarted';
import { FAQ } from '../../Global/FAQ';
import { PageTitle } from '../../Global/PageTitle';
import { PaymentOptions } from '../../Global/PaymentOptions';
import { planTypes, priceOptions } from '../../Global/PaymentOptions/constants';
import { faqItemsFull } from '../../Global/FAQ/constants';
import { Quote, quoteList } from '../../Global/Quote';
import {
  CompareFeatures,
  CompareFeaturesList,
} from '../../Global/CompareFeatures';
import { SolidSidedHero } from '../../Global/SolidSidedHero';

import './Pricing.scss';
import { Layout } from '../Layout';
import { UserContext } from '../../../state/userContext';
import { useAppDispatch } from 'src/state/reduxstate/store';
import { setSelectedPlan } from 'src/state/reduxstate/user/slice';
import { useSelector } from 'react-redux';
import { selectedPlanSelector } from 'src/state/reduxstate/user/selectors';
import { useNavigate } from 'react-router-dom';
import { LinkList } from 'src/types';

export const Pricing = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [currentPricingOption, setCurrentPricingOption] = useState<string>(
    planTypes.yearly
  );
  const selectedPlan = useSelector(selectedPlanSelector);
  const [navigateNext, setNavigateNext] = useState(false);
  const [isSelectedm, setIsSelected] = useState(1);
  const { setUser } = useContext(UserContext);
  // const selectedPlan = useMemo(
  //   () => priceOptions[currentPricingOption][isSelectedm],
  //   [currentPricingOption, isSelectedm]
  // );

  useEffect(() => {
    const selectedPlan = priceOptions[currentPricingOption][isSelectedm];
    setUser((prev) => ({ ...prev, selectedPlan }));
    dispatch(
      setSelectedPlan({
        plan: selectedPlan.plan,
        billing_type: selectedPlan.billing_type,
        monthly_price: selectedPlan.monthly_price,
        begin_price: selectedPlan.begin_price,
        stripe_price_id: selectedPlan.stripe_price_id,
        stripe_product: selectedPlan.stripe_product,
      })
    );
    navigateNext && navigate(LinkList.Checkout);
  }, [isSelectedm, currentPricingOption, setUser, navigateNext]);

  return (
    <Layout>
      <div className="Pricing">
        <PageTitle
          title="Get an edge over everyone else by utilizing social sentiment and comparing it with the price."
          className="Pricing__hero"
        />
        <PaymentOptions
          currentOption={currentPricingOption}
          setCurrentPricingOption={setCurrentPricingOption}
          isSelected={isSelectedm}
          isSelectedHandler={setIsSelected}
          navigateHandler={setNavigateNext}
        />

        <CompareFeatures featuresList={CompareFeaturesList} />
        <Quote quoteList={quoteList} />

        {PricingHeroes.map((item, index) => {
          return (
            <SolidSidedHero
              key={'pricinghero_' + index}
              image={item.image}
              number={item.number}
              title={item.title}
              text={item.text}
              imgleft={item.imgleft}
              colour={item.colour}
            />
          );
        })}

        <GetStarted />
        <FAQ faqItems={faqItemsFull} />
      </div>
    </Layout>
  );
};
