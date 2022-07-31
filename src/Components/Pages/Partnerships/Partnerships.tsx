import { Button } from '../../Global/Button';
import { LayoutWithHeader } from '../../';

import heroDesktop from '../../../Assets/images/Partnerships/hero_desktop.svg';
import heroMobile from '../../../Assets/images/Partnerships/hero_mobile.svg';
import './Partnerships.scss';
import { HeroMiniBlock } from 'src/Components/Global/HeroMiniBlock';
import { LinkList } from 'src/types';
import { useMediaQuery } from 'src/hooks';
import { Layout } from '../Layout';
import { TwoSideBlock } from 'src/Components/Global/TwoSideBlock';
import { HeroTitle } from 'src/Components/Global/HeroTitle';

export const Partnerships = () => {
  const { isDesktop } = useMediaQuery();

  return (
    <Layout>
      <div className="Partnerships">
        <HeroMiniBlock
          className='Partnerships__hero'
          ctaLink={LinkList.INFLUENCERS}
          ctaText="For Influencers & Brand Ambassadors"
          img={!isDesktop ? heroDesktop : heroMobile}
        >
          
          <div className="Partnerships__title">
            Potato Partnership Program
          </div>

          <div className="Partnerships__subtitle">
            Join Potato Partnerships Program and start earning commission now! You can earn at least 5$ commission for each sale you deliver!
          </div>
          
        </HeroMiniBlock>

        <HeroTitle 
          className='Partnerships__heroTitle'
          title='Why partner with Potato?'/>

        <TwoSideBlock
          className="Partnerships__TwoSideBlock"
          title="Join the Potato Partnership Program and start earning money now!"
          ctaText="For Influencers & Brand Ambassadors"
          url={LinkList.INFLUENCERS}
        />
      </div>
    </Layout>
  );
};