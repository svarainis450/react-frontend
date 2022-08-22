
import { useState } from 'react';
import { Navigation, Pagination } from 'swiper';

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import 'swiper/css/pagination';

import { phoneSliderContent } from './constants';
import { Typography, TypographyVariant } from '../Typography';
import { FixedTooltip } from '../FixedTooltip';
import { HeroTitle } from '../HeroTitle';
import { SwiperButtons } from './SwiperButtons';

import infoIco from '../../../Assets/images/infoIco.svg';

import './SliderPhoneBlock.scss';

export const SliderPhoneBlock = () => {
  const [disclosureOpen, setDisclosureOpen] = useState(false)

  return (
    <div className='SliderPhoneBlock'>
      {/* <HeroTitle 
        title='Invest smartly by tracking crypto influencers'
      /> */}

      <Swiper 
        modules={[Navigation, Pagination]}
        pagination={true}
        navigation
        className="mySwiper" 
        loop
      >
          {phoneSliderContent.map((item, index) => {
            return <SwiperSlide key={index}>
              <div className="SliderPhoneBlock__content">
                <div className="SliderPhoneBlock__phone">
                  <img className='SliderPhoneBlock__img' src={item.img} alt='phone' />
                </div>

                <div className="SliderPhoneBlock__context">
                  {/* <div className="SliderPhoneBlock__no">#{item.number}</div> */}

                  <HeroTitle 
                    className='SliderPhoneBlock__hero'
                    smallTitle
                    title={item.title}
                    subtitle={item.description}
                  />

                  <SwiperButtons className='desktop' />

                  <div className="SliderPhoneBlock__disclosure" onMouseOver={() => setDisclosureOpen((isOpen) => !isOpen)}>
                    <img src={infoIco} className="SliderPhoneBlock__icon" alt='info icon'/>
                    <Typography className='SliderPhoneBlock_text' variant={TypographyVariant.TEXT_SMALL}>Crypto Risk Disclosures</Typography>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          })}
      </Swiper>


      {disclosureOpen && <FixedTooltip 
        closeTooltip={() => setDisclosureOpen(false)}
        title='Crypto Risk Disclosures'
        subtitle=' Trading in cryptocurrencies comes with significant risks, including volatile market price swings or flash crashes, market manipulation, and cybersecurity risks. In addition, cryptocurrency markets and exchanges are not regulated with the same controls or customer protections available in equity, option, futures, or foreign exchange investing. Cryptocurrency trading can lead to large and immediate financial losses and is suitable only for investors who can bear such losses.'
      />}
    </div>
  );
};
