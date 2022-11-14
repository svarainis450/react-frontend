import { useContext, useEffect, useState } from "react";
import { PricingHeroes } from "./constants";

import { GetStarted } from "../../Components/Global/GetStarted";
import { FAQ } from "../../Components/Global/FAQ";
import { PageTitle } from "../../Components/Global/PageTitle";
import { PaymentOptions } from "../../Components/Global/PaymentOptions";
import {
  planTypes,
  priceOptions,
} from "../../Components/Global/PaymentOptions/constants";
import { faqItemsFull } from "../../Components/Global/FAQ/constants";
import { Quote, quoteList } from "../../Components/Global/Quote";
import {
  CompareFeatures,
  CompareFeaturesList,
} from "../../Components/Global/CompareFeatures";
import { SolidSidedHero } from "../../Components/Global/SolidSidedHero";

import "./Pricing.scss";
import { Layout } from "../../Components/Pages/Layout";
import { UserContext } from "../../state/userContext";
import { useNavigate } from "react-router-dom";
import { LinkList } from "src/types";

const PricingPage = () => {
  const navigate = useNavigate();
  const [currentPricingOption, setCurrentPricingOption] = useState<string>(
    planTypes.yearly
  );
  const [isSelectedm, setIsSelected] = useState(1);
  const { setUser } = useContext(UserContext);

  const handlePlanSelection = (index: number) => {
    setIsSelected(index);
    const selectedPlan = priceOptions[currentPricingOption][index];

    setUser((prev) => ({ ...prev, selectedPlan }));

    navigate(LinkList.Checkout);
  };

  useEffect(() => {
    const selectedPlan = priceOptions[currentPricingOption][isSelectedm];

    setUser((prev) => ({ ...prev, selectedPlan }));
  }, []);

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
          isSelectedHandler={handlePlanSelection}
        />

        <CompareFeatures featuresList={CompareFeaturesList} />
        <Quote quoteList={quoteList} />

        {PricingHeroes.map((item, index) => {
          return (
            <SolidSidedHero
              key={"pricinghero_" + index}
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

export default PricingPage;
