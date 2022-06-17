import { Button } from "../Button";
import { Typography, TypographyVariant } from "../Typography";
import { StatisticsHero } from "../StatisticsHero";
import { HeroBlockProps } from "./types";
import { Link } from 'react-router-dom'

import heroMessage from "../../../Assets/images/heroMessage.svg";
import manWithRocket from "../../../Assets/images/manWithRocket.svg";

import "./HeroBlock.scss";
import { LinkList } from '../../../types/links'

export const HeroBlock = ({} : HeroBlockProps) => {

  return (
    <div className="HeroBlock">
      <div className="HeroBlock__content">
        <Typography 
          variant={TypographyVariant.HEADING_MAX}
          className="HeroBlock__title"
        >
          Easiest way to find the next crypto gem
        </Typography>

        <Typography 
          className="HeroBlock__subtitle"
        >
          Join the game before it's too late. Discover which coins & NFTs are being talked about before they rocket to the moon. 🚀
        </Typography>
        

        <Link to={LinkList.WAITLIST}>
          <Button
            onClick={() => console.log('click')}
            className="HeroBlock__cta"
          >
            Join the Waiting List
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
