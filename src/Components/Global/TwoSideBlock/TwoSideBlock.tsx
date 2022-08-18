import lottie from 'lottie-web';
import { Button } from '../Button';
import { Typography, TypographyVariant, TypographyWeight } from '../Typography';
import { TwoSideBlockProps } from './types';

import rocketTicket from '../../../Assets/images/rocketTicket.svg';
import * as animationData from 'src/Assets/lotties/Lottie_ticket.json';

import './TwoSideBlock.scss';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

export const TwoSideBlock = ({
  title,
  subtitle,
  url,
  img,
  ctaText,
  className,
}: TwoSideBlockProps) => {
  lottie.loadAnimation({
    container: document.querySelector('#lottie_ticket') as Element,
    loop: true,
    autoplay: true,
    animationData: animationData,
  });

  return (
    <div className={classNames('TwoSideBlock', className)}>
      <div className="TwoSideBlock__wrapper">
        <div className="TwoSideBlock__content">
          <Typography
            className="TwoSideBlock__title"
            weight={TypographyWeight.MEDIUM}
            variant={TypographyVariant.HEADING_LARGE}
          >
            {title}
          </Typography>

          {subtitle && <p className="TwoSideBlock__subtitle">{subtitle}</p>}

          <Link to={url || '/'}>
            <Button
              onClick={() => console.log('click')}
              className="TwoSideBlock__cta desktop"
            >
              {ctaText}
            </Button>
          </Link>
        </div>

        <div className="TwoSideBlock__img">
          {img ? (
            <img
              className="TwoSideBlock__message"
              src={img || rocketTicket}
              alt="heroMessage"
            />
          ) : (
            <div id="lottie_ticket" />
          )}

          <Link to={url || '/'}>
            <Button
              onClick={() => console.log('click')}
              className="TwoSideBlock__cta mobile"
            >
              {ctaText}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
