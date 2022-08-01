import {PageTitle} from '../../Global/PageTitle';
// import {Video} from '../../Global/Video';
// import {Container} from '../../wrappers/Container';
import {Layout} from '../Layout';
import { GetStarted } from '../../Global/GetStarted';
import { HeroMiniBlock } from '../../Global/HeroMiniBlock';
import { Commitments, commitmentsList } from '../../Global/Commitments';
import { PotatoFactsBlock } from '../../Global/PotatoFactsBlock';
import { TwoSideBlock } from '../../Global/TwoSideBlock';

import memojiDesktop from '../../../Assets/images/aboutPage/memoji_desktop.svg';
import memojiMobile from '../../../Assets/images/aboutPage/memoji_mobile.svg';
import { LinkList } from '../../../types';

import rocketImg from "../../../Assets/images/rocket.svg";

import './AboutPage.scss';

import { useMediaQuery } from '../../../hooks';

export const AboutPage = () => {
  const { isDesktop } = useMediaQuery();

  return (
    <Layout>
        <div className="AboutPage">
        <HeroMiniBlock
          ctaLink={LinkList.WAITLIST}
          ctaText="Join the Waiting List"
          img={rocketImg}
        >
          We’re on a mission to help people discover <b>x100 opportunities</b> before it’s too late
        </HeroMiniBlock>
        <Commitments commitmentsList={commitmentsList}/>
        <PotatoFactsBlock/>
        <TwoSideBlock 
          className='AboutPage__twoSideBlock'
          title='Our Team'
          subtitle='The Potato team includes some of the most experienced web data extraction professionals in the industry coming from big data, lead generation and data science backgrounds. Our combined experience and a culture of knowledge sharing allows us to help people utilize the data in the most efficient way and easily achieve related goals.'
          ctaText="Join the Waiting List"
          img={!isDesktop ? memojiDesktop : memojiMobile}
          url={LinkList.WAITLIST}
        />
        <GetStarted />
      </div>
    </Layout>
  )
}