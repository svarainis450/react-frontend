import { Button } from '../Button';
import { Typography, TypographyVariant, TypographyWeight } from '../Typography';
import { TwoSideBlockProps } from './types';

import rocketTicket from '../../../Assets/images/rocketTicket.svg';

import './TwoSideBlock.scss';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

export const TwoSideBlock = ({title, subtitle, url, img, ctaText, className} : TwoSideBlockProps) => {
  return (
    <div className={classNames("TwoSideBlock", className)}>
      <div className="TwoSideBlock__wrapper">
        <div className="TwoSideBlock__content">
          <Typography
            className="TwoSideBlock__title"
            weight={TypographyWeight.MEDIUM}
            variant={TypographyVariant.HEADING_LARGE}
          >
            {title}
          </Typography>

          <p className="TwoSideBlock__subtitle">
            {subtitle}
          </p>

          <Link to={url || "/"}>
            <Button
              onClick={() => console.log('click')}
              className="TwoSideBlock__cta desktop"
            >
              {ctaText}
            </Button>
          </Link>
        </div>

        <div className="TwoSideBlock__img">
          <img
            className="TwoSideBlock__message"
            src={img || rocketTicket}
            alt="heroMessage"
          />

          <Link to={url || "/"}>
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
