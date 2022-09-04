import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

import { infoBlocks } from 'src/Components/Pages/Trends/constants';
import { Project } from 'src/state/reduxstate/projects/types';
import { LoadError } from '../../LoadError/LoadError';
import { CardWrapper } from '../CardWrapper/CardWrapper';
import { Top3Element } from '../Top3Element/Top3Element';
import { InfoBlockTypes } from '../types';

import './Top3ElementsSlider.scss';
import { Pagination } from 'swiper';
import { RefreshCounter } from './RefreshCounter';

interface Top3ElementsSliderProps {
  topPositive: Project[];
  topBull: Project[];
  topTalkRate: Project[];
  isForYouProject?: boolean;
  filterTitle?: string;
  isLowestList?: boolean;
}

export const Top3ElementsSlider: React.FC<Top3ElementsSliderProps> = ({
  topPositive,
  topBull,
  topTalkRate,
  isForYouProject,
  filterTitle,
  isLowestList,
}) => {
  const [showInfoBlock, setShowInfoBlock] = useState<InfoBlockTypes | null>(
    null
  );

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
            isForYouProject={isForYouProject}
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
                {topTalkRate.map(({ id, img, name, tag, rateData }, index) => (
                  <Top3Element
                    key={`${id}_${index}`}
                    id={id}
                    icon={img}
                    projectName={name}
                    tagTitle={tag.name}
                    talkRate={rateData.talkRate}
                    blockType={InfoBlockTypes.rate}
                    positiveRatio={rateData.positiveRatio}
                    bullRatio={rateData.bullRatio}
                  />
                ))}
                {!isForYouProject && <RefreshCounter />}
              </ul>
            ) : (
              <LoadError />
            )}
          </CardWrapper>
        </SwiperSlide>
        <SwiperSlide>
          <CardWrapper
            isForYouProject={isForYouProject}
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
                {topPositive.map(({ id, img, name, tag, rateData }, index) => (
                  <Top3Element
                    key={`${id}${index}`}
                    id={id}
                    icon={img}
                    projectName={name}
                    tagTitle={tag.name}
                    talkRate={rateData.talkRate}
                    blockType={InfoBlockTypes.positive}
                    positiveRatio={rateData.positiveRatio}
                    bullRatio={rateData.bullRatio}
                  />
                ))}
                {!isForYouProject && <RefreshCounter />}
              </ul>
            ) : (
              <LoadError />
            )}
          </CardWrapper>
        </SwiperSlide>
        <SwiperSlide>
          <CardWrapper
            isForYouProject={isForYouProject}
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
                {topBull.map(({ id, img, name, tag, rateData }, index) => (
                  <Top3Element
                    key={`${id}${index}`}
                    id={id}
                    icon={img}
                    projectName={name}
                    tagTitle={tag.name}
                    talkRate={rateData.talkRate}
                    blockType={InfoBlockTypes.bullish}
                    positiveRatio={rateData.positiveRatio}
                    bullRatio={rateData.bullRatio}
                  />
                ))}
                {!isForYouProject && <RefreshCounter />}
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
