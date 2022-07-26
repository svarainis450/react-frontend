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
import {
  favoriteProjectsSelector,
  subscribedInfluencersSelector,
} from 'src/state/reduxstate/user/selectors';
import {
  setFavoriteProjects,
  setSubscribedInfluencers,
} from 'src/state/reduxstate/user/slice';
import { icons } from 'src/utils/icons';
import { SubscribeButton } from '../../Button/SubscribeButton/SubscribeButton';
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

interface InfluencerCardProps extends Influencer {
  bullseyeChange?: number;
  influence?: number;
  influenceChange?: number;
}

export const InfluencerCard: React.FC<InfluencerCardProps> = ({
  bullseyeChange = 2,
  id,
  tagName,
  name,
  img,
  influence = 55,
  influenceChange = -6,
  flag,
  followers = '550k',
  posts = 859,
  bullseye,
}) => {
  const dispatch = useAppDispatch();
  const subscribedInfluencers = useSelector(subscribedInfluencersSelector);
  const isSubscribedInfluencer = subscribedInfluencers.includes(id);
  const { isTablet } = useMediaQuery();
  const [showMore, setShowMore] = useState(false);
  const isPositiveBullseye = bullseyeChange > 0;
  const isPositiveInfluence = influenceChange > 0;

  const handleSubscribeBtn = (id: number) => {
    if (!isSubscribedInfluencer) {
      dispatch(setSubscribedInfluencers(id));
    } else if (isSubscribedInfluencer) {
      const subscribedExcluded = subscribedInfluencers.filter(
        (item) => Number(item) !== id
      );
      dispatch(setSubscribedInfluencers(subscribedExcluded));
    }
  };

  return (
    <CardWrapper>
      <div className="influencer-card">
        <div className="influencer-card__border-wrapper__flex border">
          <div className="flex-wrapper border">
            <img
              className="influencer-card__border-wrapper__avatar"
              src={img}
              alt={name}
            />
            <div>
              <Typography weight={TypographyWeight.MEDIUM}>
                {tagName}
              </Typography>
              <Typography className="grey-text">{name}</Typography>
            </div>
          </div>
          {flag === 'expert' && (
            <img
              className="influencer-card__border-wrapper__top-expert"
              src={isTablet ? icons.top_expert_mobile : icons.top_expert}
              alt="Top Expert"
            />
          )}
          {isTablet && (
            <TalkRateElement rate={bullseye} type="bullseye" isBiggerBullseye />
          )}
        </div>
        {(!isTablet || showMore) && (
          <div>
            <div className="influencer-card__border-wrapper">
              <Typography
                className="grey-text"
                weight={TypographyWeight.MEDIUM}
              >
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
              <div className="flex-wrapper">
                <div className="stats">
                  <Typography weight={TypographyWeight.BOLD700}>
                    {followers}
                  </Typography>
                  <Typography
                    className="grey-text"
                    variant={TypographyVariant.TEXT_SMALL}
                    weight={TypographyWeight.THIN}
                  >
                    followers
                  </Typography>
                </div>
                <div className="stats">
                  <Typography weight={TypographyWeight.BOLD700}>
                    {posts}
                  </Typography>
                  <Typography
                    className="grey-text"
                    variant={TypographyVariant.TEXT_SMALL}
                    weight={TypographyWeight.THIN}
                  >
                    posts
                  </Typography>
                </div>
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
              <div className="influencer-card__border-wrapper__flex">
                {tags.map((item) => (
                  <CategoryTag key={item} tagTitle={item} />
                ))}
              </div>
            </div>
            <div className="influencer-card__border-wrapper flex">
              <div>
                <TalkRateElement
                  rate={bullseye}
                  type="bullseye"
                  isBiggerBullseye
                />
              </div>
              <div className="rate-desc">
                <div className="rate-change-wrapper">
                  <div
                    className={`triangle ${
                      isPositiveBullseye ? '' : 'negative'
                    }`}
                  />
                  <Typography>{bullseyeChange}% than yesterday</Typography>
                </div>
                <Typography
                  variant={TypographyVariant.TEXT_SMALL}
                  className="grey-text"
                  weight={TypographyWeight.MEDIUM}
                >
                  <strong>Bullseye</strong> indicates how often an expert has
                  told about a project that has grown in value
                </Typography>
              </div>
            </div>
            <div className="influencer-card__border-wrapper">
              <IndexAxis type="mover" rating={66} />
              <Typography
                variant={TypographyVariant.TEXT_SMALL}
                className="grey-text"
                weight={TypographyWeight.MEDIUM}
              >
                <strong>First Mover v.s. Reviewer Index</strong> shows whether
                an expert has a direct impact on the industry or is just a
                commentator{' '}
              </Typography>
            </div>
            <div className="influencer-card__border-wrapper flex">
              <div>
                <TalkRateElement
                  rate={influence}
                  type="influence"
                  isBiggerBullseye
                />
              </div>
              <div className="rate-desc">
                <div className="rate-change-wrapper">
                  <div
                    className={`triangle ${
                      isPositiveInfluence ? '' : 'negative'
                    }`}
                  />
                  <Typography>{influenceChange}% than yesterday</Typography>
                </div>
                <Typography
                  variant={TypographyVariant.TEXT_SMALL}
                  className="grey-text"
                  weight={TypographyWeight.MEDIUM}
                >
                  <strong>The influence rate</strong> indicates how many people
                  follow, share, like, tweet, and repost an expert
                </Typography>
              </div>
            </div>
            <SubscribeButton
              onClick={() => handleSubscribeBtn(id)}
              isSubscribed={isSubscribedInfluencer}
            />
          </div>
        )}
        {isTablet && (
          <div className="learn-more" onClick={() => setShowMore(!showMore)}>
            <img src={icons.finger_tap} alt="Learn more" />
            <Typography>{showMore ? 'Tap to shrink' : 'Learn more'}</Typography>
          </div>
        )}
      </div>
    </CardWrapper>
  );
};
