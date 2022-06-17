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

export const Pricing = () => {
  const [currentPricingOption, setCurrentPricingOption] = useState<string>(
    planTypes.yearly
  );
  const [isSelectedm, setIsSelected] = useState(0);
  const { setUser } = useContext(UserContext);
  const selectedPlan = useMemo(
    () => priceOptions[currentPricingOption][isSelectedm],
    [currentPricingOption, isSelectedm]
  );

  useEffect(() => {
    setUser((prev) => ({ ...prev, selectedPlan }));
  }, [selectedPlan, setUser]);

  return (
    <Layout>
      <div className="Pricing">
        <PageTitle
          title="Reduce trading risks by recording & tracking crypto influencers"
          className="Pricing__hero"
        />
        <PaymentOptions
          currentOption={currentPricingOption}
          setCurrentPricingOption={setCurrentPricingOption}
          isSelected={isSelectedm}
          isSelectedHandler={setIsSelected}
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
