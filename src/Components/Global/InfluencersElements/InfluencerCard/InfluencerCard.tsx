import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'src/hooks';
import {
  Influencer,
  Project,
  ProjectPicks,
  tags,
} from 'src/state/reduxstate/projects/types';
import { useAppDispatch } from 'src/state/reduxstate/store';
import { favoriteProjectsSelector } from 'src/state/reduxstate/user/selectors';
import { setFavoriteProjects } from 'src/state/reduxstate/user/slice';
import { icons } from 'src/utils/icons';
import { IndexAxis } from '../../DiscoverElements/IndexAxis/IndexAxis';
import { PositiveBullsBlock } from '../../DiscoverElements/ProjectCard/PositiveBullsBlock';
import { TalkRateElement } from '../../TalkRateElement/TalkRateElement';
import { CardWrapper } from '../../TrendsElements/CardWrapper/CardWrapper';
import { CategoryTag } from '../../TrendsElements/CategoryTag/CategoryTag';
import { CategoryTags } from '../../TrendsElements/types';
import {
  Typography,
  TypographyWeight,
  TypographyVariant,
} from '../../Typography';

import './InfluencerCard.scss';

interface InfluencerCardProps extends Influencer {}

export const InfluencerCard: React.FC<InfluencerCardProps> = ({
  id,
  tagName,
  name,
  img,
  flag,
  bullseye,
}) => {
  const dispatch = useAppDispatch();
  const favoriteProjects = useSelector(favoriteProjectsSelector);
  const isFavoriteProject = favoriteProjects.includes(id);
  const { isTablet } = useMediaQuery();
  const [showMore, setShowMore] = useState(false);

  const handleFavoritesIcon = (id: number) => {
    if (!isFavoriteProject) {
      dispatch(setFavoriteProjects(id));
    } else if (isFavoriteProject) {
      const favoriteExcluded = favoriteProjects.filter(
        (item) => Number(item) !== id
      );
      dispatch(setFavoriteProjects(favoriteExcluded));
    }
  };

  return (
    <CardWrapper>
      <div className="influencer-card">
        <div className="influencer-card__border-wrapper flex">
          <img
            className="influencer-card__border-wrapper__avatar"
            src={img}
            alt={name}
          />
          <div>
            <Typography weight={TypographyWeight.MEDIUM}>{tagName}</Typography>
            <Typography className="grey-text">{name}</Typography>
          </div>
          {flag === 'expert' && (
            <img
              className="influencer-card__border-wrapper__top-expert"
              src={icons.top_expert}
              alt="Top Expert"
            />
          )}
        </div>
        <div className="influencer-card__border-wrapper">
          <Typography className="grey-text" weight={TypographyWeight.MEDIUM}>
            Active social channels
          </Typography>
          <img
            className="influencer-card__border-wrapper__social-icon"
            src={icons.twitter}
            alt="twitter"
          />
          <img
            className="influencer-card__border-wrapper__social-icon"
            src={icons.discord}
            alt="discord"
          />
          <img
            className="influencer-card__border-wrapper__social-icon"
            src={icons.youtube}
            alt="youtube"
          />
          <img
            className="influencer-card__border-wrapper__social-icon"
            src={icons.telegram}
            alt="telegram"
          />
          <img
            className="influencer-card__border-wrapper__social-icon"
            src={icons.reddit}
            alt="reddit"
          />
        </div>
        <div className="influencer-card__border-wrapper">
          <Typography
            variant={TypographyVariant.TEXT_SMALL}
            className="grey-text"
            weight={TypographyWeight.MEDIUM}
          >
            Statistics
          </Typography>
        </div>
        <div className="influencer-card__border-wrapper">
          <Typography
            variant={TypographyVariant.TEXT_SMALL}
            className="grey-text"
            weight={TypographyWeight.MEDIUM}
          >
            Focus areas
          </Typography>
          <div className="influencer-card__border-wrapper__flex">
            {tags.map((item) => (
              <CategoryTag key={item} tagTitle={item} />
            ))}
          </div>
        </div>
        <div className="influencer-card__border-wrapper">
          <Typography
            variant={TypographyVariant.TEXT_SMALL}
            className="grey-text"
            weight={TypographyWeight.MEDIUM}
          >
            Focus areas
          </Typography>
          <TalkRateElement rate={bullseye} type="bullseye" isBiggerBullseye />
        </div>
        <div className="influencer-card__border-wrapper">
          <IndexAxis type="mover" rating={66} />
          <Typography
            variant={TypographyVariant.TEXT_SMALL}
            className="grey-text"
            weight={TypographyWeight.MEDIUM}
          >
            <strong>First Mover v.s. Reviewer Index</strong> shows whether an
            expert has a direct impact on the industry or is just a commentator{' '}
          </Typography>
        </div>
        <div className="influencer-card__border-wrapper">
          <TalkRateElement rate={55} type="influence" isBiggerBullseye />
        </div>
      </div>
    </CardWrapper>
  );
};
