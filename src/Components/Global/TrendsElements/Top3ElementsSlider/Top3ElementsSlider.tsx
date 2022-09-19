import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

import { infoBlocks } from 'src/Components/Pages/Trends/constants';
import { TopOrLowestProject } from 'src/state/reduxstate/projects/types';
import { LoadError } from '../../LoadError/LoadError';
import { CardWrapper } from '../CardWrapper/CardWrapper';
import { Top3Element } from '../Top3Element/Top3Element';
import { InfoBlockTypes } from '../types';

import './Top3ElementsSlider.scss';
import { Pagination } from 'swiper';
import { RefreshCounter } from './RefreshCounter';

interface Top3ElementsSliderProps {
  topPositive: TopOrLowestProject[];
  topBull: TopOrLowestProject[];
  topTalkRate: TopOrLowestProject[];
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
                {topTalkRate.map(
                  (
                    { place, category, project_name, talk_rate, icon },
                    index
                  ) => (
                    <Top3Element
                      key={`${place}_${index}`}
                      icon={icon}
                      projectName={project_name}
                      tagTitle={category}
                      talkRate={talk_rate}
                      blockType={InfoBlockTypes.rate}
                    />
                  )
                )}
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
                {topPositive.map(
                  (
                    { place, category, project_name, sentiment, icon },
                    index
                  ) => (
                    <Top3Element
                      key={`${place}_${index}`}
                      icon={icon}
                      projectName={project_name}
                      tagTitle={category}
                      blockType={InfoBlockTypes.positive}
                      positiveRatio={sentiment}
                    />
                  )
                )}
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
                {topBull.map(
                  ({ place, category, project_name, bull, icon }, index) => (
                    <Top3Element
                      key={`${place}_${index}`}
                      icon={icon}
                      projectName={project_name}
                      tagTitle={category}
                      bullRatio={bull}
                      blockType={InfoBlockTypes.bullish}
                    />
                  )
                )}
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
