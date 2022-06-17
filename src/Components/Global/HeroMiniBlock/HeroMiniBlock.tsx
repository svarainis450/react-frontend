import { Button } from "../Button";
import { Typography, TypographyVariant } from "../Typography";
import { StatisticsHero } from "../StatisticsHero";
import { HeroMiniBlockProps } from "./types";
import { Link } from 'react-router-dom'

import rocketImg from "../../../Assets/images/rocket.svg";

import "./HeroMiniBlock.scss";
import { LinkList } from '../../../types/links'

export const HeroMiniBlock = ({} : HeroMiniBlockProps) => {

  return (
    <div className="HeroMiniBlock">
      <div className="HeroMiniBlock__content">
        <p className="HeroMiniBlock__title">
          We’re on a mission to help people discover <b>x100 opportunities</b> before it’s too late
        </p>

        <Link to={LinkList.WAITLIST}>
          <Button
            onClick={() => undefined}
            className="HeroMiniBlock__cta"
          >
            Join the Waiting List
          </Button>
        </Link>
      </div>

      <div className="HeroMiniBlock__img">
        <img className="HeroMiniBlock__mainimg" src={rocketImg} alt="rocketImg" />
      </div>
    </div>
  );
};
