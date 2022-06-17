import { useSwiper } from 'swiper/react';

import arrowLeft from '../../../../Assets/images/arrowLeft.svg';
import arrowright from '../../../../Assets/images/arrowRight.svg';

import './SwiperButtons.scss';

export const SwiperButtons = () => {
  const swiper = useSwiper();

  return (
    <div className='SwiperButtons'>
      <button className='SwiperButtons__prev' onClick={() => swiper.slidePrev()}>
        <img src={arrowLeft} alt="previous" />
      </button>

      <button className='SwiperButtons__next'onClick={() => swiper.slideNext()}>
        <img src={arrowright} alt="next" />
      </button>
    </div>
  );
}