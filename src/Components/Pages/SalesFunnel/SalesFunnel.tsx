import { useState } from 'react';
// import { PricingHeroes } from "./constants";

import { GetStarted } from '../../Global/GetStarted';
import { FAQ } from '../../Global/FAQ';
// import { PageTitle } from "../../Global/PageTitle";
// import { PaymentOptions } from "../../Global/PaymentOptions";
import { planTypes } from '../../Global/PaymentOptions/constants';
import { faqItems } from '../../Global/FAQ/constants';

import { SliderBigBlock } from '../../Global/SliderBigBlock';

import { SliderPhoneBlock } from '../../Global/SliderPhoneBlock';
import { AllFeaturesBlock } from '../../Global/AllFeaturesBlock';
import { SourcesBlock } from '../../Global/SourcesBlock';
import { TwoSideBlock } from '../../Global/TwoSideBlock';
import { Reasoning } from '../../Global/Reasoning';
import { FunnelTop } from '../../Global/FunnelTop';
import { LinkList } from '../../../types/links';

import './SalesFunnel.scss';
import { Layout } from '../Layout';

export const SalesFunnel = () => {
  const [currentPricingOption, setCurrentPricingOption] = useState<string>(
    planTypes.yearly
  );

  return (
    <Layout>
      <div className="SalesFunnel">
        <FunnelTop
          currentPricingOption={currentPricingOption}
          setCurrentPricingOption={setCurrentPricingOption}
        />

        <SliderPhoneBlock />
        <AllFeaturesBlock />
        <SourcesBlock />
        <TwoSideBlock
          title="Get the first row ticket now" 
          subtitle="Join thousands who've already invested by copying the leading industry traders and crypto experts in our community."
          ctaText="Join the Waiting List"
          url={LinkList.WAITLIST}
        />
        <Reasoning />
        <SliderBigBlock />
        <GetStarted />

        <FAQ faqItems={faqItems} />
      </div>
    </Layout>
  );
};
