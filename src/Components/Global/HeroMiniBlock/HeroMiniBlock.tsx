import { Button } from '../Button';
import { HeroMiniBlockProps } from './types';
import { Link } from 'react-router-dom';
import lottie from 'lottie-web';

import * as animationData from 'src/Assets/lotties/Lottie_rocket.json';

import './HeroMiniBlock.scss';
import classNames from 'classnames';

export const HeroMiniBlock = ({
  children,
  ctaText,
  ctaLink,
  img,
  className,
}: HeroMiniBlockProps) => {
  lottie.loadAnimation({
    container: document.querySelector('#lottie-rocket') as Element,
    loop: true,
    autoplay: true,
    animationData: animationData,
  });

  return (
    <div className={classNames('HeroMiniBlock', className)}>
      <div className="HeroMiniBlock__content">
        <p className="HeroMiniBlock__title">{children}</p>

        <Link to={ctaLink}>
          <Button onClick={() => undefined} className="HeroMiniBlock__cta">
            {ctaText}
          </Button>
        </Link>
      </div>

      <div className="HeroMiniBlock__img">
        {img ? (
          <img className="HeroMiniBlock__mainimg" src={img} alt="rocketImg" />
        ) : (
          <div id="lottie-rocket" />
        )}
      </div>
    </div>
  );
};
