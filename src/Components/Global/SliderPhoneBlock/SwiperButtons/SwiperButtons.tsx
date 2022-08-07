import classNames from 'classnames';
import { useSwiper } from 'swiper/react';

import './SwiperButtons.scss';

export const SwiperButtons = ({className} : {className?: string}) => {
  const swiper = useSwiper();

  return (
    <div className={classNames('SwiperButtons', className)}>
      <button className='SwiperButtons__prev' onClick={() => swiper.slidePrev()}>
        <div className="arrowLeft"/>
      </button>

      <button className='SwiperButtons__next'onClick={() => swiper.slideNext()}>
        <div className="arrowRight"/>
      </button>
    </div>
  );
}