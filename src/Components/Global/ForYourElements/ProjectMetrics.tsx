import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'src/hooks';
import { sendFavProject } from 'src/state/reduxstate/projects/thunks';
import { Project, Statuses } from 'src/state/reduxstate/projects/types';
import { useAppDispatch } from 'src/state/reduxstate/store';
import { favoriteProjectsSelector } from 'src/state/reduxstate/user/selectors';

import { icons } from 'src/utils/icons';
import { CoinBaseButton } from '../DiscoverElements/CoinBaseButton/CoinBaseButton';
import { IndexAxis } from '../DiscoverElements/IndexAxis/IndexAxis';
import { InfoBlocks } from '../Graphic/InfoBlocks';
import { Loader } from '../Loader/Loader';
import { TalkRateElement } from '../TalkRateElement/TalkRateElement';
import { CategoryTag } from '../TrendsElements/CategoryTag/CategoryTag';
import { CategoryTags } from '../TrendsElements/types';
import { Typography, TypographyWeight } from '../Typography';
import './ProjectMetrics.scss';

interface Props {
  projectByIdProp: Project;
}
export const ProjectMetrics: React.FC<Props> = ({ projectByIdProp }) => {
  const dispatch = useAppDispatch();
  const { isTablet } = useMediaQuery();
  const [favStatus, setFavStatus] = useState<Statuses>('idle');
  const isNftProject =
    projectByIdProp.type === CategoryTags.nft.toLocaleLowerCase();
  const priceTitle = isNftProject ? 'Floor price' : '';
  const maxNameChars = isTablet ? 13 : 100;
  const favorites = useSelector(favoriteProjectsSelector);
  const isInFavs = !!favorites?.find((item) => item.id === projectByIdProp?.id);

  const [showInfoBlock, setShowInfoBlock] = useState({
    talk_rate: false,
    bull: false,
    positive_negative: false,
  });

  const handleAddToFavs = () => {
    if (!isInFavs && projectByIdProp) {
      dispatch(
        sendFavProject({
          id: projectByIdProp.id,
          callBack: setFavStatus,
        })
      );
    }
  };

  return (
    <div className="metrics-wrapper ">
      <div className={`metrics-flex ${isNftProject ? 'nft-project' : ''}`}>
        <div className="metrics-flex bordered centered larger">
          <div>
            <img
              className="project-icon"
              src={projectByIdProp?.img_url || icons.no_image}
              alt={projectByIdProp?.name}
            />
          </div>
          <div>
            <Typography className="project-title">
              {projectByIdProp?.name.substring(0, maxNameChars)}
              {projectByIdProp?.name.length >= maxNameChars && '...'}
            </Typography>
            <CategoryTag
              isSmallerTag={isTablet}
              tagTitle={
                // @ts-ignore
                (projectByIdProp && CategoryTags[projectByIdProp?.type]) ||
                CategoryTags.coins
              }
            />
          </div>
        </div>
        <div className="Metrics metrics-flex bordered centered smaller ">
          {showInfoBlock.talk_rate && <InfoBlocks infoType="talk_rate" />}
          <div className="talk-rate-wrapper">
            {projectByIdProp.talk_rate_score ? (
              <TalkRateElement
                rate={projectByIdProp.talk_rate_score}
                type="talk_rate"
                isSmalller={isTablet}
                isWhiteBorder
              />
            ) : (
              <img src={icons.empty_talk_rate} alt="no talk rate data" />
            )}
          </div>
          {!isTablet && (
            <img
              className="metrics-question-mark"
              src={icons.question_mark_grey}
              alt="question mark"
              onMouseLeave={() =>
                setShowInfoBlock({
                  ...showInfoBlock,
                  talk_rate: false,
                })
              }
              onMouseOver={() =>
                setShowInfoBlock({
                  ...showInfoBlock,
                  talk_rate: true,
                })
              }
            />
          )}
        </div>
        <div className="Metrics metrics-flex bordered centered smaller">
          <div>
            <IndexAxis
              isHalfAxis
              rating={projectByIdProp?.bull_bear_score}
              type="bull"
            />
          </div>
          {!isTablet && (
            <img
              className="metrics-question-mark"
              src={icons.question_mark_grey}
              alt="question mark"
              onMouseOver={() =>
                setShowInfoBlock({
                  ...showInfoBlock,
                  bull: true,
                })
              }
              onMouseLeave={() =>
                setShowInfoBlock({
                  ...showInfoBlock,
                  bull: false,
                })
              }
            />
          )}
          {showInfoBlock.bull && <InfoBlocks infoType="bull" />}{' '}
        </div>
        <div className="Metrics metrics-flex bordered centered smaller">
          <div>
            <IndexAxis
              isHalfAxis
              rating={projectByIdProp?.sentiment_score}
              type="positive"
            />
          </div>
          {!isTablet && (
            <img
              className="metrics-question-mark"
              src={icons.question_mark_grey}
              alt="question mark"
              onMouseEnter={() =>
                setShowInfoBlock({
                  ...showInfoBlock,
                  positive_negative: true,
                })
              }
              onMouseLeave={() =>
                setShowInfoBlock({
                  ...showInfoBlock,
                  positive_negative: false,
                })
              }
            />
          )}
          {showInfoBlock.positive_negative && (
            <InfoBlocks infoType="positive_negative" />
          )}
        </div>
        {isNftProject ? (
          <div className="Metrics metrics-flex bordered centered prices nft">
            <Typography className="nft-title">{priceTitle}</Typography>
            <div className="price-wrapper">
              <img src={icons.nft_symbol} alt="nft symbol" />
              <Typography
                className="price-title"
                weight={TypographyWeight.MEDIUM}
              >
                {Number(projectByIdProp.price).toFixed(2)}
              </Typography>
            </div>
          </div>
        ) : (
          <div className="Metrics metrics-flex bordered centered prices">
            <Typography
              className="price-symbol"
              weight={TypographyWeight.MEDIUM}
            >
              1 {projectByIdProp.symbol}
            </Typography>
            <img
              className="exchange-icon"
              src={icons.transfer_arrows}
              alt="exchange rate"
            />
            <Typography
              className="price-title"
              weight={TypographyWeight.MEDIUM}
            >
              $ {projectByIdProp.price}
            </Typography>
          </div>
        )}
        {isNftProject && (
          <div className="Metrics metrics-flex bordered centered prices nft">
            <Typography className="nft-title">total volume</Typography>
            <div className="price-wrapper">
              <img src={icons.nft_symbol} alt="nft symbol" />
              <Typography
                className="price-title"
                weight={TypographyWeight.MEDIUM}
              >
                {Number(projectByIdProp.full_volume).toFixed(2)}
              </Typography>
            </div>
          </div>
        )}
        <div className="Metrics metrics-flex bordered centered add ">
          <div className="add-project">
            <div className="add-to-favs" onClick={handleAddToFavs}>
              {favStatus === 'pending' ? (
                <Loader width={20} height={20} />
              ) : (
                <img
                  src={isInFavs ? icons.black_checkmark : icons.add_project}
                  alt="add to favorites"
                />
              )}
            </div>
            {(projectByIdProp.opensea_project_url ||
              projectByIdProp.coinbase_url) && (
              <CoinBaseButton
                url={
                  projectByIdProp.opensea_project_url ||
                  projectByIdProp.coinbase_url
                }
                btnType={
                  projectByIdProp.type ===
                  String(CategoryTags.nft).toLocaleLowerCase()
                    ? 'opensea'
                    : 'coinbase'
                }
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
