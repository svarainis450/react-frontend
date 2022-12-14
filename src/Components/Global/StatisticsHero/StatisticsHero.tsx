import { StatisticsHeroProps } from "./types";
import { Typography } from "../Typography";

import "./StatisticsHero.scss";
import classNames from "classnames";

export const StatisticsHero = ({ className } : StatisticsHeroProps) => {

  return (
    <div className={classNames('StatisticsHero', className)}>
      <div className="StatisticsHero__block">
        <div className="StatisticsHero__text">
          <Typography className="StatisticsHero__number">164K</Typography>
          <Typography className="StatisticsHero__subtitle">records updated daily</Typography>
        </div>
      </div>

      <div className="StatisticsHero__block">
        <div className="StatisticsHero__text">
          <Typography className="StatisticsHero__number">1500+</Typography>
          <Typography className="StatisticsHero__subtitle">crypto expert profiles</Typography>
        </div>
      </div>

      <div className="StatisticsHero__block">
        <div className="StatisticsHero__text">        
          <Typography className="StatisticsHero__number">500+</Typography>
          <Typography className="StatisticsHero__subtitle">crypto projects</Typography>
        </div>
      </div>

      <div className="StatisticsHero__block">
        <div className="StatisticsHero__text">
          <Typography className="StatisticsHero__number">2300+</Typography>
          <Typography className="StatisticsHero__subtitle">NFT projects</Typography>
        </div>
      </div>
    </div>
  );
};
