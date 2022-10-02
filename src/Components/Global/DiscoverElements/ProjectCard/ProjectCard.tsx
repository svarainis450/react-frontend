import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'src/hooks';
import {
  fetchProjectById,
  sendFavProject,
} from 'src/state/reduxstate/projects/thunks';
import { Project, Statuses } from 'src/state/reduxstate/projects/types';
import { useAppDispatch } from 'src/state/reduxstate/store';
import { favoriteProjectsSelector } from 'src/state/reduxstate/user/selectors';
import {
  deleteFavProject,
  deleteFromFavorites,
  getFavProjects,
  sendFavProjectOrInfluencer,
} from 'src/state/reduxstate/user/thunks';
import { LinkList } from 'src/types';
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
import { CardChart } from '../../Graphic/CardChart';
import './ProjectCard.scss';
import { formatDate } from 'src/utils/calculations';

interface ProjectCardProps
  extends Pick<
    Project,
    | 'talk_rate_daily_change'
    | 'talk_rate_score'
    | 'sentiment_score'
    | 'bull_bear_score'
    | 'id'
    | 'name'
    | 'first_historical_data'
    | 'coinbase_url'
    | 'nft_address'
    | 'img_url'
    | 'chart_talk_rate'
    | 'chart_sentiment'
    | 'type'
    | 'price'
  > {}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  price,
  name,
  first_historical_data,
  img_url,
  nft_address,
  coinbase_url,
  talk_rate_daily_change,
  talk_rate_score,
  sentiment_score,
  bull_bear_score,
  chart_talk_rate,
  chart_sentiment,
  type,
}) => {
  const dispatch = useAppDispatch();
  const favoriteProjects = useSelector(favoriteProjectsSelector);
  const [isFavInstance, setIsFavInstance] = useState(false);
  const isFavoriteProject =
    favoriteProjects && favoriteProjects.find((project) => project.id === id);
  const isPositiveRateChange =
    talk_rate_daily_change && talk_rate_daily_change > 0;
  const { isTablet } = useMediaQuery();
  const navigate = useNavigate();
  const [showMore, setShowMore] = useState(false);
  const [status, setStatus] = useState<Statuses>('idle');
  const [showSentimentInfo, setShowSentimentInfo] = useState(false);
  const url = nft_address || coinbase_url || null;
  const urlBtnType = nft_address ? 'opensea' : 'coinbase';
  const [projectByIsStatus, setProjectByIdStatus] = useState<Statuses>('idle');

  const handleFavoritesIcon = (id: number | undefined) => {
    if ((!isFavoriteProject || !isFavInstance) && id) {
      dispatch(sendFavProject({ id }));
      setIsFavInstance(true);
      dispatch(getFavProjects({}));
    } else if ((isFavoriteProject || isFavInstance) && id) {
      dispatch(deleteFavProject({ id, callBack: setStatus }));
      setIsFavInstance(false);
    }
  };

  const hanldeGoToForYou = () => {
    if (id) {
      dispatch(fetchProjectById({ id, statusCallBack: setProjectByIdStatus }));
    }
  };

  useEffect(() => {
    if (isFavoriteProject) {
      setIsFavInstance(true);
    }

    if (projectByIsStatus === 'succeeded') {
      navigate(LinkList.FORYOU);
    }
  }, [dispatch, isFavoriteProject, projectByIsStatus]);

  return (
    <div className="wrapper">
      <CardWrapper>
        <div className="project-card">
          <div className="flex border-wrapper">
            <div className="flex icon-project" onClick={hanldeGoToForYou}>
              <img
                className="icon"
                src={img_url || icons.no_image}
                alt={name}
              />
              <div className="project-title-wrapper">
                <Typography className="title" weight={TypographyWeight.MEDIUM}>
                  {name.substring(0, 20)}
                  {name.length >= 20 && '...'}
                </Typography>
                {/* @ts-ignore */}
                <CategoryTag tagTitle={CategoryTags[type]} />
              </div>
            </div>
            {isTablet && !showMore && (
              <div>
                <TalkRateElement rate={talk_rate_score} />
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
              <div className="border-wrapper flex flex-start">
                <div>
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
                    {formatDate(first_historical_data)}
                  </Typography>
                </div>
                <div>
                  <Typography
                    className="grey-text"
                    variant={TypographyVariant.TEXT_SMALL}
                    weight={TypographyWeight.MEDIUM}
                  >
                    Current price
                  </Typography>
                  <Typography
                    variant={TypographyVariant.HEADING_SMALL}
                    weight={TypographyWeight.BOLD700}
                  >
                    ${price}
                  </Typography>
                </div>
              </div>
              <div className="flex border-wrapper">
                {talk_rate_score ? (
                  <TalkRateElement rate={talk_rate_score} />
                ) : (
                  <img src={icons.empty_talk_rate} alt="no talk rate data" />
                )}
                <div className="talk-rate-desc">
                  <div className="rate-change-wrapper">
                    <div
                      className={`triangle ${
                        isPositiveRateChange ? '' : 'negative'
                      }`}
                    />
                    <Typography>
                      {talk_rate_daily_change}% than yesterday
                    </Typography>
                  </div>
                  <Typography className="small-text">
                    Talk Rate indicates how popular the project is among crypto
                    experts and the community
                  </Typography>
                </div>
              </div>
              <div className="graph-wrapper">
                <img
                  src={icons.info_label_grey}
                  alt="sentiment-info"
                  className="sentiment-info-icon"
                  onMouseOver={() => setShowSentimentInfo(true)}
                  onMouseLeave={() => setShowSentimentInfo(false)}
                />
                {showSentimentInfo && (
                  <div className="sentiment-info">
                    <p>
                      Social sentiment has been shown to be useful in predicting
                      whether Crypto & NFT prices will increase or decrease.
                    </p>
                    <a
                      href="https://jfin-swufe.springeropen.com/articles/10.1186/s40854-022-00352-7"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        src={icons.info_label_yellow}
                        alt="Scientific info link"
                      />
                      <p className="link">
                        Click here for scientific information about sentiment
                        tracking
                      </p>
                    </a>
                  </div>
                )}
                <CardChart
                  projectId={id}
                  chart_talk_rate={chart_talk_rate}
                  chart_sentiment={chart_sentiment}
                />
              </div>
              <PositiveBullsBlock
                sentiment_score={sentiment_score}
                bull_bear_score={bull_bear_score}
              />
              <div className="border-wrapper">
                <Typography className="small-text">
                  <strong>Top influencers taked about this coin</strong>
                </Typography>
              </div>
              {url && <CoinBaseButton url={url} btnType={urlBtnType} />}
              <div className="learn-more" onClick={hanldeGoToForYou}>
                <Typography weight={TypographyWeight.MEDIUM}>
                  Learn more
                </Typography>
              </div>
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
