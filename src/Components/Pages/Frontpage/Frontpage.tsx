import { SliderPhoneBlock } from '../../Global/SliderPhoneBlock';
import { HeroBlock } from '../../Global/HeroBlock';
import { AllFeaturesBlock } from '../../Global/AllFeaturesBlock';
import { SourcesBlock } from '../../Global/SourcesBlock';
import { TwoSideBlock } from '../../Global/TwoSideBlock';
import { Reasoning } from '../../Global/Reasoning';
import { GetStarted } from '../../Global/GetStarted';
import { FAQ } from '../../Global/FAQ';
import { faqItems } from '../../Global/FAQ/constants';
import { SliderBigBlock } from '../../Global/SliderBigBlock';

import { LinkList } from '../../../types/links';
import graphImg from 'src/Assets/images/graph.png'
import './Frontpage.scss';
import { Layout } from '../Layout';

export const Frontpage = () => {
  return (
    <Layout>
      <div className="Frontpage">
        <HeroBlock />
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
        <TwoSideBlock
          title="Track sentiment, correlate with price"
          subtitle="Social sentiment has been shown to be useful in predicting whether Crypto & NFT prices will increase or decrease."
          ctaText="Learn more"
          subText='Click here for scientific information about sentiment tracking'
          subUrl="https://jfin-swufe.springeropen.com/articles/10.1186/s40854-022-00352-7"
          img={graphImg}
          className="Frontpage__graphBlock"
        />
        <FAQ faqItems={faqItems} />
      </div>
    </Layout>
  );
};
