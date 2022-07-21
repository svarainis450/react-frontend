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
  projects: Project[];
}

export const Top3ElementsSlider: React.FC<Top3ElementsSliderProps> = ({
  projects,
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
            {projects ? (
              <ul className="cards-grid">
                {projects.map(({ id, img, name, tag, rateData }) => (
                  <Top3Element
                    key={id}
                    id={id}
                    icon={img}
                    projectName={name}
                    tagTitle={tag}
                    talkRate={rateData.talkRate}
                    blockType={InfoBlockTypes.rate}
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
            {projects ? (
              <ul className="cards-grid">
                {projects.map(({ id, img, name, tag, rateData }) => (
                  <Top3Element
                    key={id}
                    id={id}
                    icon={img}
                    projectName={name}
                    tagTitle={tag}
                    talkRate={rateData.talkRate}
                    blockType={InfoBlockTypes.positive}
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
            {projects ? (
              <ul className="cards-grid">
                {projects.map(({ id, img, name, tag, rateData }) => (
                  <Top3Element
                    key={id}
                    id={id}
                    icon={img}
                    projectName={name}
                    tagTitle={tag}
                    talkRate={rateData.talkRate}
                    blockType={InfoBlockTypes.bullish}
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
