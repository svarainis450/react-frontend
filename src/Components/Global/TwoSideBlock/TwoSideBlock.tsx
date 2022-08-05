import Lottie from 'react-lottie';
import { Button } from '../Button';
import { Typography, TypographyVariant, TypographyWeight } from '../Typography';
import { TwoSideBlockProps } from './types';

import rocketTicket from '../../../Assets/images/rocketTicket.svg';
import infoIcon from '../../../Assets/images/infoIcon.svg';
import * as animationData from 'src/Assets/lotties/Lottie_ticket.json'

import './TwoSideBlock.scss';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

export const TwoSideBlock = ({title, subtitle, url, subText = "", subUrl = "", img, ctaText, className} : TwoSideBlockProps) => {
    const defaultOptions = {
      loop: true,
      autoplay: true, 
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    };

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

          {subtitle && 
            <p className="TwoSideBlock__subtitle">
              {subtitle}
            </p>
          }

          <Link to={url || "/"}>
            <Button
              onClick={() => console.log('click')}
              className="TwoSideBlock__cta desktop"
            >
              {ctaText}
            </Button>
          </Link>

          {subText?.length > 0 && 
            <div className="TwoSideBlock__sublink desktop">
              <img src={infoIcon} alt="" className="TwoSideBlock__sublink-img" />
              <a href={subUrl}>
                {subText}
              </a>
            </div>
          }
        </div>

        <div className="TwoSideBlock__img">
          {
            img 
              ? <img
              className="TwoSideBlock__message"
              src={img || rocketTicket}
              alt="heroMessage"
            />
            : <Lottie options={defaultOptions}/>
          }

          
          <Link to={url || "/"} >
            <Button
              onClick={() => console.log('click')}
              className="TwoSideBlock__cta mobile"
              >
              {ctaText}
            </Button>
          </Link>

          {subText?.length > 0 && 
            <div className="TwoSideBlock__sublink mobile">
              <img src={infoIcon} alt="" className="TwoSideBlock__sublink-img" />
              <a href={subUrl}>
                {subText}
              </a>
            </div>
          }
        </div>
      </div>
    </div>
  );
};
