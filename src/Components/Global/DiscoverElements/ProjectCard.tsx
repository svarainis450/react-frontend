import { icons } from 'src/utils/icons';
import { images } from 'src/utils/images';
import { TalkRateElement } from '../TalkRateElement/TalkRateElement';
import { CardWrapper } from '../TrendsElements/CardWrapper/CardWrapper';
import { CategoryTag } from '../TrendsElements/CategoryTag/CategoryTag';
import { CategoryTags } from '../TrendsElements/types';
import { Typography, TypographyWeight, TypographyVariant } from '../Typography';

import './ProjectCard.scss';

interface ProjectCardProps {
  icon?: string;
  categoryTag?: CategoryTags;
}

export const ProjectCard: React.FC<ProjectCardProps> = () => (
  <CardWrapper>
    <div className="project-card">
      <div className="flex border-wrapper">
        <img className="icon" src={images.bitkoin} alt="bitkoin" />
        <div>
          <Typography className="title" weight={TypographyWeight.MEDIUM}>
            Dogecoin (DOGE)
          </Typography>
          <CategoryTag tagTitle={CategoryTags.coins} />
        </div>
        <img src={icons.fav_star} alt="Add to favorites" />
      </div>
      <div className="border-wrapper">
        <Typography
          className="grey-text"
          variant={TypographyVariant.TEXT_SMALL}
          weight={TypographyWeight.MEDIUM}
        >
          Project started
        </Typography>
        <Typography
          variant={TypographyVariant.HEADING_SMALL}
          weight={TypographyWeight.BOLD700}
        >
          2017 01 21
        </Typography>
      </div>
      <div className="flex border-wrapper">
        <TalkRateElement rate={89} />
        <div className="talk-rate-desc">
          <Typography className="small-text">
            Talk Rate indicates how popular the project is among crypto experts
            and the community
          </Typography>
        </div>
      </div>
      <div className="border-wrapper">
        <Typography className="small-text">
          <strong>Positive v.s. Negative</strong> Index shows how people
          collectively value the project - whether they are more positive or
          negative about the growth of the project
        </Typography>
      </div>
      <div className="border-wrapper">
        <Typography className="small-text">
          <strong>Bull v.s. Bear</strong> Index spots whether the project is
          Bullish, meaning is on the rise, or Bearish, meaning it is declining
          in value
        </Typography>
      </div>
    </div>
  </CardWrapper>
);
