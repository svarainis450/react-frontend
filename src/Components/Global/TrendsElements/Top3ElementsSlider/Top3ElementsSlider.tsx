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

interface Top3ElementsSliderProps {
  topPositive: Project[];
  topBull: Project[];
  topTalkRate: Project[];
}

export const Top3ElementsSlider: React.FC<Top3ElementsSliderProps> = ({
  topPositive,
  topBull,
  topTalkRate,
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
            title="Top 3 Talk Rate Projects"
            subtitle="Today"
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
                    key={id}
                    id={id}
                    rank={index + 1}
                    icon={img}
                    projectName={name}
                    tagTitle={tag.name}
                    talkRate={rateData.talkRate}
                    blockType={InfoBlockTypes.rate}
                    positiveRatio={rateData.positiveRatio}
                    bullRatio={rateData.bullRatio}
                  />
                ))}
              </ul>
            ) : (
              <LoadError />
            )}
          </CardWrapper>
        </SwiperSlide>
        <SwiperSlide>
          <CardWrapper
            title="Top 3 Positive Projects"
            subtitle="Today"
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
                    key={id}
                    rank={index + 1}
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
              </ul>
            ) : (
              <LoadError />
            )}
          </CardWrapper>
        </SwiperSlide>
        <SwiperSlide>
          <CardWrapper
            title="Top 3 Bull Projects"
            subtitle="Today"
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
                    rank={index + 1}
                    key={id}
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
