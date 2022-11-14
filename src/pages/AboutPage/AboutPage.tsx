import { Layout } from "../../Components/Pages/Layout";
import { GetStarted } from "../../Components/Global/GetStarted";
import { HeroMiniBlock } from "../../Components/Global/HeroMiniBlock";
import {
  Commitments,
  commitmentsList,
} from "../../Components/Global/Commitments";
import { PotatoFactsBlock } from "../../Components/Global/PotatoFactsBlock";
// import { TwoSideBlock } from '../../Global/TwoSideBlock';

// import memojiDesktop from '../../../Assets/images/aboutPage/memoji_desktop.svg';
// import memojiMobile from '../../../Assets/images/aboutPage/memoji_mobile.svg';
import { LinkList } from "../../types";

import "./AboutPage.scss";

const AboutPage = () => {
  return (
    <Layout>
      <div className="AboutPage">
        <HeroMiniBlock ctaLink={LinkList.Pricing} ctaText="Get started">
          We’re on a mission to help people discover <b>x100 opportunities</b>{" "}
          before it’s too late
        </HeroMiniBlock>
        <Commitments commitmentsList={commitmentsList} />
        <PotatoFactsBlock />
        {/* <TwoSideBlock 
          className='AboutPage__twoSideBlock'
          title='Our Team'
          subtitle='The Potato team includes some of the most experienced web data extraction professionals in the industry coming from big data, lead generation and data science backgrounds. Our combined experience and a culture of knowledge sharing allows us to help people utilize the data in the most efficient way and easily achieve related goals.'
          ctaText="Get started"
          img={!isDesktop ? memojiDesktop : memojiMobile}
          url={LinkList.Pricing}
        /> */}
        <GetStarted />
      </div>
    </Layout>
  );
};

export default AboutPage;
