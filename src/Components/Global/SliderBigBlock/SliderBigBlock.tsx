import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";

import "swiper/css";
import "swiper/css/navigation";

import { Button } from "../Button";
import { HeroTitle } from "../HeroTitle";

import ss1 from "../../../Assets/images/screenshots/ss1.png";
import ss2 from "../../../Assets/images/screenshots/ss2.png";
import ss3 from "../../../Assets/images/screenshots/ss3.png";
import infograph1 from "../../../Assets/images/screenshots/infograph1.svg";
import infograph2 from "../../../Assets/images/screenshots/infograph2.svg";
import infograph3 from "../../../Assets/images/screenshots/infograph3.svg";

import "./SliderBigBlock.scss";

export const SliderBigBlock = () => {

  return (
    <div className="SliderBigBlock">

      <Swiper navigation={true} modules={[Navigation]} className="mySwiper" loop>
        <SwiperSlide>
          <div className="SliderBigBlock__wrapper">
            <div className="SliderBigBlock__content">
              <HeroTitle 
                className="SliderBigBlock__text"
                title="🎯 Bullseye Index"
                subtitle="Bullseye score is created to track the authority of the influencers and their crypto & NFT picks. It’s calculated from the historical data and guessed coin picks that crypto influencers promote"
              />

              <div className="SliderBigBlock__infograph">
                <img className="SliderBigBlock__infograph__img SliderBigBlock__infograph__img--circle" src={infograph1} alt="heroMessage" />
              </div>
            </div>

            <div className="SliderBigBlock__img">
              <img className="SliderBigBlock__message" src={ss1} alt="heroMessage" />
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="SliderBigBlock__wrapper">
            <div className="SliderBigBlock__content">
              <HeroTitle 
                className="SliderBigBlock__text"
                title="Positive v.s. Negative Index"
                subtitle="Positive v.s. Negative Index shows how people collectively value the project - whether they are more positive or negative about the growth of the project"
              />

              <div className="SliderBigBlock__infograph">
                <img className="SliderBigBlock__infograph__img SliderBigBlock__infograph__img--slider" src={infograph2} alt="heroMessage" />
              </div>
            </div>

            <div className="SliderBigBlock__img">
              <img className="SliderBigBlock__message" src={ss2} alt="heroMessage" />
            </div>
          </div>
        </SwiperSlide>
        
        <SwiperSlide>
          <div className="SliderBigBlock__wrapper">
            <div className="SliderBigBlock__content">
              <HeroTitle 
                className="SliderBigBlock__text"
                title="Talk rate 💬"
                subtitle="Talk Rate is a metric to summarize and define which projects are most often discussed among crypto experts and the community. It's an easy-to-understand metric that can change dynamically even every 5 minutes."
              />

              <div className="SliderBigBlock__infograph">
                <img className="SliderBigBlock__infograph__img SliderBigBlock__infograph__img--circle" src={infograph3} alt="heroMessage" />
              </div>
            </div>

            <div className="SliderBigBlock__img">
              <img className="SliderBigBlock__message" src={ss3} alt="heroMessage" />
            </div>
          </div>
        </SwiperSlide>
      </Swiper>

      
      <Button
        onClick={() => console.log('click')}
        className="SliderBigBlock__cta mobile"
      >
        Get started
      </Button>
    </div>
  );
};
