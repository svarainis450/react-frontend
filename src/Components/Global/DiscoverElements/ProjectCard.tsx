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
      <div className="flex">
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
      <TalkRateElement />
    </div>
  </CardWrapper>
);
