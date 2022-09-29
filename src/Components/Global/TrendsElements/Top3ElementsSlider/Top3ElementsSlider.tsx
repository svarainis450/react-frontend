import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

import { infoBlocks } from 'src/Components/Pages/Trends/constants';
import { SubmenuFilters } from 'src/state/reduxstate/projects/types';
import { LoadError } from '../../LoadError/LoadError';
import { CardWrapper } from '../CardWrapper/CardWrapper';
import { Top3Element } from '../Top3Element/Top3Element';
import { InfoBlockTypes } from '../types';

import {
  fetchProjectsByInfluencers,
  fetchTop3LowestProjects,
  fetchTop3Projects,
} from 'src/state/reduxstate/projects/thunks';
import {
  top3BullProjectsSelector,
  top3PositiveProjectsSelector,
  top3TalkRateProjectsSelector,
  top3LowestTalkRateProjectsSelector,
  top3BearProjectsSelector,
  top3NegativeProjectsSelector,
} from 'src/state/reduxstate/projects/selectors';

import './Top3ElementsSlider.scss';
import { Pagination } from 'swiper';
import { RefreshCounter } from './RefreshCounter';
import { useAppDispatch } from 'src/state/reduxstate/store';
import { useSelector } from 'react-redux';
import { userTokenSelector } from 'src/state/reduxstate/user/selectors';

interface Top3ElementsSliderProps {
  filterTitle?: string;
  isLowestList?: boolean;
  filter: SubmenuFilters;
}

export const Top3ElementsSlider: React.FC<Top3ElementsSliderProps> = ({
  filterTitle,
  isLowestList,
  filter,
}) => {
  const dispatch = useAppDispatch();
  const [showInfoBlock, setShowInfoBlock] = useState<InfoBlockTypes | null>(
    null
  );
  const token = useSelector(userTokenSelector);
  const top3BullProjects = useSelector(top3BullProjectsSelector);
  const top3BearProjects = useSelector(top3BearProjectsSelector);
  const top3PositiveProjects = useSelector(top3PositiveProjectsSelector);
  const top3NegativeProjects = useSelector(top3NegativeProjectsSelector);
  const top3TalkRateProjects = useSelector(top3TalkRateProjectsSelector);
  const top3LowestTalkRateProjects = useSelector(
    top3LowestTalkRateProjectsSelector
  );

  console.log(top3BullProjects);

  const topPositive = isLowestList
    ? top3NegativeProjects
    : top3PositiveProjects;

  const topBull = isLowestList ? top3BearProjects : top3BullProjects;
  const topTalkRate = isLowestList
    ? top3LowestTalkRateProjects
    : top3TalkRateProjects;

  useEffect(() => {
    if (token && filter !== 'upcomming') {
      dispatch(
        fetchProjectsByInfluencers({ tokenValue: token, dateFilter: filter })
      );
      dispatch(
        fetchTop3Projects({
          filter: 'top-bull',
          tokenValue: token,
          dateFilter: filter,
        })
      );
      dispatch(
        fetchTop3Projects({
          filter: 'top-sentiment',
          tokenValue: token,
          dateFilter: filter,
        })
      );
      dispatch(
        fetchTop3Projects({
          filter: 'top-talk-rate',
          tokenValue: token,
          dateFilter: filter,
        })
      );
      dispatch(
        fetchTop3LowestProjects({
          filter: 'lowest-bull',
          tokenValue: token,
          dateFilter: filter,
        })
      );
      dispatch(
        fetchTop3LowestProjects({
          filter: 'lowest-sentiment',
          tokenValue: token,
          dateFilter: filter,
        })
      );
      dispatch(
        fetchTop3LowestProjects({
          filter: 'lowest-talk-rate',
          tokenValue: token,
          dateFilter: filter,
        })
      );
    }

    //   setTimeout(() => {
    //     const interval = setInterval(() => {
    //       setTimeLoaded((timeLoaded) => timeLoaded + 1);
    //     }, 60000);
    //     return () => clearInterval(interval);
    //   });
    // }
  }, [token, filter]);

  return (
    <div className="top-elements">
      <Swiper
        spaceBetween={10}
        pagination={true}
        modules={[Pagination]}
        className="mySwiper"
        loop
      >
        <SwiperSlide>
          <CardWrapper
            title={
              isLowestList
                ? 'Lowest Talk Rate Projects'
                : 'Top 3 Talk Rate Projects'
            }
            subtitle={filterTitle}
            showInfoLabel
            infoTitle={infoBlocks[InfoBlockTypes.rate].title}
            infoDesc={infoBlocks[InfoBlockTypes.rate].desc}
            onInfoClick={() => setShowInfoBlock(InfoBlockTypes.rate)}
            onCloseClick={() => setShowInfoBlock(null)}
            showInfoBlock={showInfoBlock === InfoBlockTypes.rate}
          >
            {topTalkRate ? (
              <ul className="cards-grid">
                {topTalkRate.map(
                  (
                    {
                      place,
                      category,
                      project_name,
                      talk_rate,
                      img_url,
                      project_id,
                    },
                    index
                  ) => (
                    <Top3Element
                      key={`${place}_${index}`}
                      icon={img_url}
                      projectName={project_name}
                      tagTitle={category}
                      talkRate={talk_rate}
                      blockType={InfoBlockTypes.rate}
                      project_id={project_id}
                    />
                  )
                )}
                <RefreshCounter />
              </ul>
            ) : (
              <LoadError />
            )}
          </CardWrapper>
        </SwiperSlide>
        <SwiperSlide>
          <CardWrapper
            title={
              isLowestList
                ? 'Top 3 Negative Projects'
                : 'Top 3 Positive Projects'
            }
            subtitle={filterTitle}
            showInfoLabel
            infoTitle={infoBlocks[InfoBlockTypes.positive].title}
            infoDesc={infoBlocks[InfoBlockTypes.positive].desc}
            onInfoClick={() => setShowInfoBlock(InfoBlockTypes.positive)}
            onCloseClick={() => setShowInfoBlock(null)}
            showInfoBlock={showInfoBlock === InfoBlockTypes.positive}
          >
            {topPositive ? (
              <ul className="cards-grid">
                {topPositive.map(
                  (
                    {
                      place,
                      category,
                      project_name,
                      sentiment,
                      img_url,
                      project_id,
                    },
                    index
                  ) => (
                    <Top3Element
                      project_id={project_id}
                      key={`${place}_${index}`}
                      icon={img_url}
                      projectName={project_name}
                      tagTitle={category}
                      blockType={InfoBlockTypes.positive}
                      positiveRatio={sentiment}
                    />
                  )
                )}
                <RefreshCounter />
              </ul>
            ) : (
              <LoadError />
            )}
          </CardWrapper>
        </SwiperSlide>
        <SwiperSlide>
          <CardWrapper
            title={
              isLowestList ? 'Biggest Bear Projects' : 'Top 3 Bull Projects'
            }
            subtitle={filterTitle}
            showInfoLabel
            infoTitle={infoBlocks[InfoBlockTypes.bullish].title}
            infoDesc={infoBlocks[InfoBlockTypes.bullish].desc}
            onInfoClick={() => setShowInfoBlock(InfoBlockTypes.bullish)}
            onCloseClick={() => setShowInfoBlock(null)}
            showInfoBlock={showInfoBlock === InfoBlockTypes.bullish}
          >
            {topBull ? (
              <ul className="cards-grid">
                {topBull.map(
                  (
                    {
                      place,
                      category,
                      project_name,
                      bull,
                      img_url,
                      project_id,
                    },
                    index
                  ) => (
                    <Top3Element
                      project_id={project_id}
                      key={`${place}_${index}`}
                      icon={img_url}
                      projectName={project_name}
                      tagTitle={category}
                      bullRatio={bull}
                      blockType={InfoBlockTypes.bullish}
                    />
                  )
                )}
                <RefreshCounter />
              </ul>
            ) : (
              <LoadError />
            )}
          </CardWrapper>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};
