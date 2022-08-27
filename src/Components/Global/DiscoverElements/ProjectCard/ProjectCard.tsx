import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'src/hooks';
import { fetchProjectById } from 'src/state/reduxstate/projects/thunks';
import { Project, Statuses } from 'src/state/reduxstate/projects/types';
import { useAppDispatch } from 'src/state/reduxstate/store';
import { favoriteProjectsSelector } from 'src/state/reduxstate/user/selectors';
import {
  deleteFromFavorites,
  sendFavProjectOrInfluencer,
} from 'src/state/reduxstate/user/thunks';
import { LinkList } from 'src/types';
import { icons } from 'src/utils/icons';
import CardScreen from '../../Graphic/cardScreen';
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
import Card from '../../Graphic/cardChart';
import './ProjectCard.scss';

interface ProjectCardProps extends Omit<Project, 'symbol'> {}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  rateData,
  name,
  started,
  img,
  openSeaUrl,
  coinbaseUrl,
}) => {
  const dispatch = useAppDispatch();
  const favoriteProjects = useSelector(favoriteProjectsSelector);
  const [isFavInstance, setIsFavInstance] = useState(false);
  const isFavoriteProject =
    favoriteProjects && favoriteProjects.find((project) => project.id === id);
  const isPositiveRateChange = rateData.talkRateChanges > 0;
  const { isTablet } = useMediaQuery();
  const navigate = useNavigate();
  const [showMore, setShowMore] = useState(false);
  const [status, setStatus] = useState<Statuses>('idle');
  const url = openSeaUrl || coinbaseUrl || null;
  const urlBtnType = openSeaUrl ? 'opensea' : 'coinbase';

  const handleFavoritesIcon = (id: number) => {
    if (!isFavoriteProject || !isFavInstance) {
      dispatch(
        sendFavProjectOrInfluencer({
          id,
          callBack: setStatus,
          fav_type: 'project',
        })
      );
      setIsFavInstance(true);
    } else if (isFavoriteProject || isFavInstance) {
      dispatch(
        deleteFromFavorites({ id, callBack: setStatus, fav_type: 'project' })
      );
      setIsFavInstance(false);
    }
  };

  const handleLearnMoreBtn = () => {
    dispatch(fetchProjectById({ id })).then(() => navigate(LinkList.FORYOU));
  };

  useEffect(() => {
    if (isFavoriteProject) {
      setIsFavInstance(true);
    }
  }, [dispatch, isFavoriteProject]);

  return (
    <div className="wrapper">
      <CardWrapper>
        <div className="project-card">
          <div className="flex border-wrapper">
            <div className="flex icon-project">
              <img className="icon" src={img || icons.no_image} alt="bitkoin" />
              <div>
                <Typography className="title" weight={TypographyWeight.MEDIUM}>
                  {name}
                </Typography>
                <CategoryTag tagTitle={CategoryTags.coins} />
              </div>
            </div>
            {isTablet && !showMore && (
              <div>
                <TalkRateElement rate={rateData.talkRate} />
              </div>
            )}
            <img
              className="favorites"
              src={isFavInstance ? icons.favorite_selected : icons.fav_star}
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
              <div className="graph-wrapper">
                <Card projectId={id} />
              </div>
              <PositiveBullsBlock rateData={rateData} />
              {/* <CardScreen /> */}
              <div className="border-wrapper">
                <Typography className="small-text">
                  <strong>Top influencers taked about this coin</strong>
                </Typography>
              </div>
              {url && <CoinBaseButton url={url} btnType={urlBtnType} />}
            </>
          )}
          <div className="learn-more" onClick={handleLearnMoreBtn}>
            <Typography weight={TypographyWeight.MEDIUM}>Learn more</Typography>
          </div>
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
