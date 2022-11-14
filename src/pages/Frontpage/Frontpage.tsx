import { SliderPhoneBlock } from "../../Components/Global/SliderPhoneBlock";
import { HeroBlock } from "../../Components/Global/HeroBlock";
import { AllFeaturesBlock } from "../../Components/Global/AllFeaturesBlock";
import { SourcesBlock } from "../../Components/Global/SourcesBlock";
import { TwoSideBlock } from "../../Components/Global/TwoSideBlock";
import { Reasoning } from "../../Components/Global/Reasoning";
import { GetStarted } from "../../Components/Global/GetStarted";
import { FAQ } from "../../Components/Global/FAQ";
import { faqItems } from "../../Components/Global/FAQ/constants";
import { SliderBigBlock } from "../../Components/Global/SliderBigBlock";

import { LinkList } from "../../types/links";
import graphImg from "src/Assets/images/graph.png";
import { Layout } from "../../Components/Pages/Layout";

import "./Frontpage.scss";
import { QuizSection } from "src/features/quiz/QuizSection";

const Frontpage = () => {
  return (
    <Layout>
      <div className="Frontpage">
        <HeroBlock />
        <SliderPhoneBlock />
        <AllFeaturesBlock />
        <SourcesBlock />
        <TwoSideBlock
          title="Track sentiment, correlate with price"
          subtitle="Social sentiment has been shown to be useful in predicting whether Crypto & NFT prices will increase or decrease."
          ctaText="Get started"
          url={LinkList.Pricing}
          subText="Click here for scientific information about sentiment tracking"
          subUrl="https://jfin-swufe.springeropen.com/articles/10.1186/s40854-022-00352-7"
          img={graphImg}
          className="Frontpage__graphBlock"
        />

        <Reasoning />
        <SliderBigBlock />
        <GetStarted />
        <TwoSideBlock
          title="Get the first row ticket now"
          subtitle="Join thousands who've already invested by copying the leading industry traders and crypto experts in our community."
          ctaText="Try 1 Month For $5"
          url={LinkList.Pricing}
        />
        <FAQ faqItems={faqItems} />
        <QuizSection />
      </div>
    </Layout>
  );
};

export default Frontpage;
