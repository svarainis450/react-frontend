import { Button } from "../Button";
import { Typography, TypographyVariant } from "../Typography";
import { StatisticsHero } from "../StatisticsHero";
import { HeroBlockProps } from "./types";
import { Link } from 'react-router-dom'

import heroMessage from "../../../Assets/images/heroMessage.svg";
import manWithRocket from "../../../Assets/images/manWithRocket.svg";

import "./HeroBlock.scss";
import { LinkList } from '../../../types/links'
import { CountdownTimer } from "../CountdownTimer";

export const HeroBlock = ({} : HeroBlockProps) => {
  // const THREE_DAYS_IN_MS = 5 * 24 * 60 * 60 * 1000;
  // const NOW_IN_MS = new Date().getTime();

  // const dateTimeAfterThreeDays = NOW_IN_MS + THREE_DAYS_IN_MS;

  return (
    <div className="HeroBlock">
      <div className="HeroBlock__content">
        <Typography 
          variant={TypographyVariant.HEADING_MAX}
          className="HeroBlock__title"
        >
          Stay ahead of trends by tracking crypto influencers
        </Typography>

        <Typography 
          className="HeroBlock__subtitle"
        >
          Discover which coins & NFTs are being talked about before they rocket to the moon. 
          {/* <span className="HeroBlock__subtitle-emphasize"></span> */}
        </Typography>

        {/* <CountdownTimer targetDate={dateTimeAfterThreeDays} title="Deal ends in:"/> */}

        <Link to={LinkList.WAITLIST}>
          <Button
            onClick={() => console.log('click')}
            className="HeroBlock__cta"
          >
            Get started
          </Button>
        </Link>

        <StatisticsHero />
      </div>

      <div className="HeroBlock__img">
        <img className="HeroBlock__message" src={heroMessage} alt="heroMessage" />
        <img className="HeroBlock__mainimg" src={manWithRocket} alt="manWithRocket" />
      </div>
    </div>
  );
};
