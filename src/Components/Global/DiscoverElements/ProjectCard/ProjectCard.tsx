import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'src/hooks';
import { Project, Statuses } from 'src/state/reduxstate/projects/types';
import { useAppDispatch } from 'src/state/reduxstate/store';
import { favoriteProjectsSelector } from 'src/state/reduxstate/user/selectors';
import { setFavoriteProjects } from 'src/state/reduxstate/user/slice';
import {
  deleteFromFavorites,
  sendFavProjectOrInfluencer,
} from 'src/state/reduxstate/user/thunks';
import { icons } from 'src/utils/icons';
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

interface ProjectCardProps extends Omit<Project, 'symbol'> {}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  rateData,
  name,
  started,
  img,
}) => {
  const dispatch = useAppDispatch();
  const favoriteProjects = useSelector(favoriteProjectsSelector);
  const isFavoriteProject = favoriteProjects.find(
    (project) => project.id === id
  );
  const isPositiveRateChange = rateData.talkRateChanges > 0;
  const { isTablet } = useMediaQuery();
  const [showMore, setShowMore] = useState(false);
  const [status, setStatus] = useState<Statuses>('idle');

  const handleFavoritesIcon = (id: number) => {
    console.log(isFavoriteProject);
    if (!isFavoriteProject) {
      dispatch(
        sendFavProjectOrInfluencer({
          id,
          callBack: setStatus,
          fav_type: 'project',
        })
      );
    } else if (isFavoriteProject) {
      dispatch(
        deleteFromFavorites({ id, callBack: setStatus, fav_type: 'project' })
      );
    }
  };

  return (
    <div className="wrapper">
      <CardWrapper>
        <div className="project-card">
          <div className="flex border-wrapper">
            <div className="flex">
              <img className="icon" src={img || icons.no_image} alt="bitkoin" />
              <div>
                <Typography className="title" weight={TypographyWeight.MEDIUM}>
                  {name}
                </Typography>
                <CategoryTag tagTitle={CategoryTags.coins} />
              </div>
            </div>
            <img
              className="favorites"
              src={isFavoriteProject ? icons.favorite_selected : icons.fav_star}
              alt="Add to favorites"
              onClick={() => handleFavoritesIcon(id)}
            />
          </div>

          {(!isTablet || showMore) && (
            <>
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
                  <strong>Top influencers taked about this coin</strong>
                </Typography>
              </div>
              <CoinBaseButton />
            </>
          )}
        </div>
        {isTablet && (
          <div className="learn-more" onClick={() => setShowMore(!showMore)}>
            <img src={icons.finger_tap} alt="Learn more" />
            <Typography>{showMore ? 'Tap to shrink' : 'Learn more'}</Typography>
          </div>
        )}
      </CardWrapper>
    </div>
  );
};
