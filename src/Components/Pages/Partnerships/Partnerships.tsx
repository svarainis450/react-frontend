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
import { TwoSideSimple } from 'src/Components/Global/TwoSideSimple';

import juicerImg from 'src/Assets/images/Partnerships/juicer.svg';
import calculatorImg from 'src/Assets/images/Partnerships/calculator.svg';
import jenkinsImg from 'src/Assets/images/Partnerships/jenkins.svg';
import appleImg from 'src/Assets/images/Partnerships/apple.svg';

export const Partnerships = () => {
  const { isDesktop } = useMediaQuery();

  return (
    <Layout>
      <div className="Partnerships">
        <HeroMiniBlock
          className='Partnerships__hero'
          ctaLink={"#"}
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

        <div className="Partnerships__teasers">
          <TwoSideSimple className='Partnerships__TwoSideSimple'>
            <TwoSideSimple.Left>
              <div className="Partnerships__TwoSideSimple__img">
                <img src={juicerImg}/>
              </div>
              <div className="Partnerships__TwoSideSimple__title">
                Earn high-paying commission
              </div>
              <div className="Partnerships__TwoSideSimple__text">
                You can earn at least 5$ commission for each sale you deliver. The more revenue you make - the higher the commission you get!
              </div>
            </TwoSideSimple.Left>

            <TwoSideSimple.Right>
              <div className="Partnerships__TwoSideSimple__img">
                <img src={calculatorImg}/>
              </div>
              <div className="Partnerships__TwoSideSimple__title">
                Expect a high conversion rate
              </div>
              <div className="Partnerships__TwoSideSimple__text">
              Potato conversion rates are one of the highest in the industry. Thus, you can be assured that your traffic will convert in all GEOs! We will provide you with localized landing pages and a huge selection of creatives and other assets to reach the maximum results.
              </div>
            </TwoSideSimple.Right>
          </TwoSideSimple>

          <TwoSideSimple className='Partnerships__TwoSideSimple'>
            <TwoSideSimple.Left>
            <div className="Partnerships__TwoSideSimple__img">
              <img src={jenkinsImg}/>
            </div>
              <div className="Partnerships__TwoSideSimple__title">
              Get a dedicated account manager
              </div>
              <div className="Partnerships__TwoSideSimple__text">
              If you are only starting now, don't worry - we got you! We will assign you a dedicated account manager who will assist you in setting up and launching campaigns. Our managers are here to make sure that all your campaigns are successful.
              </div>
            </TwoSideSimple.Left>

            <TwoSideSimple.Right>
            <div className="Partnerships__TwoSideSimple__img">
              <img src={appleImg}/>
            </div>
              <div className="Partnerships__TwoSideSimple__title">
              Over 50k happy users
              </div>
              <div className="Partnerships__TwoSideSimple__text">
              Currently over 50k users worldwide trust ColonBroom. We cover the United States, Australian, Canadian and New Zealand markets and have a team of over 50 marketing professionals that make every campaign a success! The numbers are rapidly growing!
              </div>
            </TwoSideSimple.Right>
          </TwoSideSimple>
        </div>

        <div className="Partnerships__videos">
          <TwoSideSimple className='Partnerships__TwoSideSimple'>
            <TwoSideSimple.Left>
              <div className="Partnerships__TwoSideSimple__title">
              Who is eligible to become a partner?
              </div>
              <div className="Partnerships__TwoSideSimple__text">
              Influencers of any platform (Youtube, Instagram, Podcast, Tik Tok) and any size who have a strong desire to work with health and nutrition brands. Affiliates that have blogs, news sites, review or coupons sites, etc. If you are interested in covering crypto, NFT, web3 topics (and earning a high commission) - you came to the right place!
              </div>
            </TwoSideSimple.Left>

            <TwoSideSimple.Right className='Partnerships__videos__grey'>
            </TwoSideSimple.Right>
          </TwoSideSimple>
        </div>

        <div className="Partnerships__videos">
          <TwoSideSimple className='Partnerships__TwoSideSimple' rtl={true}>
            <TwoSideSimple.Left className='Partnerships__videos__grey'>
            </TwoSideSimple.Left>

            <TwoSideSimple.Right>
              <div className="Partnerships__TwoSideSimple__title">
              How can you start?
              </div>
              <div className="Partnerships__TwoSideSimple__text">
                Sign up for the Potato Partnership Program and start promoting our product on your website or social media channels.
                <br /><br />
                You will receive commission for every visitor who purchases Potato via your links. This is a great way to earn at least 5$ commission per purchase and help others learn why using Potato is so great.
              </div>
            </TwoSideSimple.Right>
          </TwoSideSimple>
        </div>



        <TwoSideBlock
          className="Partnerships__TwoSideBlock"
          title="Join the Potato Partnership Program and start earning money now!"
          ctaText="For Influencers & Brand Ambassadors"
          url={"#"}
        />
      </div>
    </Layout>
  );
};