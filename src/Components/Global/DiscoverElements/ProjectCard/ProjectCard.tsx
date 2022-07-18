import { Project } from 'src/state/reduxstate/projects/types';
import { icons } from 'src/utils/icons';
import { images } from 'src/utils/images';
import { TalkRateElement } from '../../TalkRateElement/TalkRateElement';
import { CardWrapper } from '../../TrendsElements/CardWrapper/CardWrapper';
import { CategoryTag } from '../../TrendsElements/CategoryTag/CategoryTag';
import { CategoryTags } from '../../TrendsElements/types';
import {
  Typography,
  TypographyWeight,
  TypographyVariant,
} from '../../Typography';
import { CoinBaseButton } from '../CoinBaseButton/CoinBaseButton';
import { PositiveBullsBlock } from './PositiveBullsBlock';

import './ProjectCard.scss';

interface ProjectCardProps extends Omit<Project, 'id' | 'symbol'> {}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  rateData,
  name,
  started,
}) => {
  const isPositiveRateChange = rateData.talkRateChanges > 0;

  return (
    <div className="wrapper">
      <CardWrapper>
        <div className="project-card">
          <div className="flex border-wrapper">
            <img className="icon" src={images.bitkoin} alt="bitkoin" />
            <div>
              <Typography className="title" weight={TypographyWeight.MEDIUM}>
                {name}
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
              {started}
            </Typography>
          </div>
          <div className="flex border-wrapper">
            <TalkRateElement rate={rateData.talkRate} />
            <div className="talk-rate-desc">
              <div className="rate-change-wrapper">
                <div
                  className={`triangle ${
                    isPositiveRateChange ? '' : 'negative'
                  }`}
                />
                <Typography>
                  {rateData.talkRateChanges}% than yesterday
                </Typography>
              </div>
              <Typography className="small-text">
                Talk Rate indicates how popular the project is among crypto
                experts and the community
              </Typography>
            </div>
          </div>
          <PositiveBullsBlock rateData={rateData} />
          <div className="border-wrapper">
            <Typography className="small-text">
              <strong>Top influencers taked about this coin</strong>{' '}
            </Typography>
          </div>
          <CoinBaseButton />
        </div>
      </CardWrapper>
    </div>
  );
};
