import { Button } from '../Button';
import { HeroMiniBlockProps } from './types';
import { Link } from 'react-router-dom';
import Lottie from 'lottie-react';

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
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

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
          <Lottie {...defaultOptions} />
        )}
      </div>
    </div>
  );
};
