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
          subtitle="Join thousands who've already invested by copying the leading industry traders and crypto experts in our community, or lead the way yourself to earn a passive income"
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
