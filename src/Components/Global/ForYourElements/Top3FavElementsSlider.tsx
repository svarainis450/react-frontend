import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

import { Project } from 'src/state/reduxstate/projects/types';
import './Top3FavElementsSlider.scss';
import { Pagination } from 'swiper';
import { InfoBlockTypes } from '../TrendsElements/types';
import { CardWrapper } from '../TrendsElements/CardWrapper/CardWrapper';
import { Top3Element } from '../TrendsElements/Top3Element/Top3Element';
import { LoadError } from '../LoadError/LoadError';

import { LastWeek, Today } from 'src/Assets/icons/IconElements';

import { SubmenuListProps } from '../../../pages/Trends/Submenu/types';

export const submenuList: Array<SubmenuListProps> = [
  {
    title: 'Today',
    icon: <Today />,
    callBackKey: 'daily',
  },
  {
    title: 'Last Week',
    icon: <LastWeek />,
    callBackKey: 'weekly',
  },
  // {
  //   title: 'Upcoming',
  //   icon: <Upcomming />,
  //   callBackKey: 'upcomming',
  // },
];

export const infoBlocks = {
  [InfoBlockTypes.rate]: {
    title: 'What’s Talk Rate Project?',
    desc: 'Talk Rate summarizes which projects are most often discussed among crypto experts and the community.',
  },
  [InfoBlockTypes.positive]: {
    title: 'What’s Positive Project?',
    desc: `Positive v.s. A negative Index shows whether people are more positive or negative about the project's growth.`,
  },
  [InfoBlockTypes.bullish]: {
    title: 'What’s Bullish Project?',
    desc: 'Bull v.s. Bear spots whether the project is Bullish, meaning is on the rise, or Bearish, meaning it is declining in value.',
  },
};

interface Top3ElementsSliderProps {
  topPositive: Project[];
  topBull: Project[];
  topTalkRate: Project[];
  isForYouProject?: boolean;
  filterTitle?: string;
}

export const Top3FavElementsSlider: React.FC<Top3ElementsSliderProps> = ({
  topPositive,
  topBull,
  topTalkRate,
  isForYouProject,
  filterTitle,
}) => {
  const [showInfoBlock, setShowInfoBlock] = useState<InfoBlockTypes | null>(
    null
  );

  return (
    <div className="top-elements-fav">
      <Swiper
        spaceBetween={10}
        pagination={true}
        modules={[Pagination]}
        className="mySwiper"
        loop
      >
        <SwiperSlide>
          <CardWrapper
            isForYouProject={isForYouProject}
            title="Highest Talk Rate of Your Projects"
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
                  ({ id, type, name, talk_rate_score, img_url }, index) => (
                    <Top3Element
                      key={`${id}_${index}`}
                      icon={img_url}
                      projectName={name}
                      tagTitle={type}
                      talkRate={talk_rate_score}
                      blockType={InfoBlockTypes.rate}
                    />
                  )
                )}
              </ul>
            ) : (
              <LoadError />
            )}
          </CardWrapper>
        </SwiperSlide>
        <SwiperSlide>
          <CardWrapper
            isForYouProject={isForYouProject}
            title="Highest Positive Rate of Your Projects"
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
                  ({ id, type, name, sentiment_score, img_url }, index) => (
                    <Top3Element
                      key={`${id}_${index}`}
                      icon={img_url}
                      projectName={name}
                      tagTitle={type}
                      blockType={InfoBlockTypes.positive}
                      positiveRatio={sentiment_score}
                    />
                  )
                )}
              </ul>
            ) : (
              <LoadError />
            )}
          </CardWrapper>
        </SwiperSlide>
        <SwiperSlide>
          <CardWrapper
            isForYouProject={isForYouProject}
            title="Highest Bull of Your Projects"
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
                  ({ id, type, name, bull_bear_score, img_url }, index) => (
                    <Top3Element
                      key={`${id}_${index}`}
                      icon={img_url}
                      projectName={name}
                      tagTitle={type}
                      bullRatio={bull_bear_score}
                      blockType={InfoBlockTypes.bullish}
                    />
                  )
                )}
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
