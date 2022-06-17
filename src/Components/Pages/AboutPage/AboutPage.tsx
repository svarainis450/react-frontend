import {PageTitle} from '../../Global/PageTitle';
// import {Video} from '../../Global/Video';
// import {Container} from '../../wrappers/Container';
import {Layout} from '../Layout';
import { GetStarted } from '../../Global/GetStarted';
import { HeroMiniBlock } from '../../Global/HeroMiniBlock';
import { Commitments, commitmentsList } from '../../Global/Commitments';
import { PotatoFactsBlock } from '../../Global/PotatoFactsBlock';
import { TwoSideBlock } from '../../Global/TwoSideBlock';

import drawer from '../../../Assets/images/allFeatureCards/drawer.svg';

import './AboutPage.scss';
import { LinkList } from '../../../types';

export const AboutPage = () => {
  return (
    <Layout>
        <div className="AboutPage">
          {/* <PageTitle 
            className='AboutPage__title'
            title='All-in-one platform to discover the next x100 crypto opportunity'
            subtitle='Potato makes it easier than ever to track top crypto influencers’ picks and stay ahead of trading trends'
          /> */}


        <HeroMiniBlock />
        <Commitments commitmentsList={commitmentsList}/>
        <PotatoFactsBlock/>
        <TwoSideBlock 
          className='AboutPage__twoSideBlock'
          title='Our Team'
          subtitle='The Potato team includes some of the most experienced web data extraction professionals in the industry coming from big data, lead generation, data science and e-commerce backgrounds. Our combined experience and a culture of knowledge sharing allows us to help people utilize the data in the most efficient way and easily achieve related goals.'
          ctaText="Join the Waiting List"
          img={drawer}
          url={LinkList.WAITLIST}
        />
        <GetStarted />
      </div>
    </Layout>
  )
}