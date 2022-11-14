import { useState } from "react";
// import { PricingHeroes } from "./constants";

import { GetStarted } from "../../Components/Global/GetStarted";
import { FAQ } from "../../Components/Global/FAQ";
// import { PageTitle } from "../../Global/PageTitle";
// import { PaymentOptions } from "../../Global/PaymentOptions";
import { planTypes } from "../../Components/Global/PaymentOptions/constants";
import { faqItems } from "../../Components/Global/FAQ/constants";

import { SliderBigBlock } from "../../Components/Global/SliderBigBlock";

import { SliderPhoneBlock } from "../../Components/Global/SliderPhoneBlock";
import { AllFeaturesBlock } from "../../Components/Global/AllFeaturesBlock";
import { SourcesBlock } from "../../Components/Global/SourcesBlock";
import { TwoSideBlock } from "../../Components/Global/TwoSideBlock";
import { Reasoning } from "../../Components/Global/Reasoning";
import { FunnelTop } from "../../Components/Global/FunnelTop";
import { LinkList } from "../../types/links";

import "./SalesFunnel.scss";
import { Layout } from "../../Components/Pages/Layout";

const SalesFunnel = () => {
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
          ctaText="Try 1 Month For $5"
          url={LinkList.Pricing}
        />
        <Reasoning />
        <SliderBigBlock />
        <GetStarted />

        <FAQ faqItems={faqItems} />
      </div>
    </Layout>
  );
};

export default SalesFunnel;
