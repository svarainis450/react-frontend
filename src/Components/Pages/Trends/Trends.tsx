import { useEffect, useState } from 'react';

import {
  CardWrapper,
  LoadError,
  Top3Element,
  TrendingCategory,
} from 'src/Components/Global';
import { InfoBlockTypes } from 'src/Components/Global/TrendsElements/types';
import { LoggedInLayout } from 'src/Components/layouts/LoggedInLayout';
import { Submenu } from 'src/Components/Global/Submenu';
import { submenuList, infoBlocks } from './constants';

import './trends.scss';
import { useAppDispatch } from 'src/state/reduxstate/store';
import {
  fetchTrendingProjects,
  fethchProjects,
} from 'src/state/reduxstate/projects/thunks';
import {
  projectsSelector,
  trendingProjectsSelector,
} from 'src/state/reduxstate/projects/selectors';
import { useSelector } from 'react-redux';

export const Trends: React.FC = () => {
  const [showInfoBlock, setShowInfoBlock] = useState<InfoBlockTypes | null>(
    null
  );
  const dispatch = useAppDispatch();
  const trendingProjects = useSelector(trendingProjectsSelector);
  const projects = useSelector(projectsSelector);

  // const demoProjects = [
  //   {
  //     id: 1,
  //     icon: 'bitkoin',
  //     tag: CategoryTags.coins,
  //     title: 'Bitcoin (BTC)',
  //     rate: '67',
  //   },
  //   {
  //     id: 2,
  //     icon: 'bitkoin',
  //     tag: CategoryTags.coins,
  //     title: 'Bitcoin (BTC)',
  //     rate: '67',
  //   },
  //   {
  //     id: 3,
  //     icon: 'bitkoin',
  //     tag: CategoryTags.coins,
  //     title: 'Bitcoin (BTC)',
  //     rate: '67',
  //   },
  // ];

  useEffect(() => {
    dispatch(fethchProjects());
    dispatch(fetchTrendingProjects());
  }, [dispatch]);

  return (
    <div className="Trends">
      <LoggedInLayout>
        <Submenu menuItems={submenuList} />
        <div className="wrapper two-columns">
          <CardWrapper title="Trending Category" subtitle="Today">
            <TrendingCategory trendingProjects={trendingProjects} />
          </CardWrapper>
          <CardWrapper
            title="Project picks by popularity among influencers and their followers"
            subtitle="Today"
          >
            influencers
          </CardWrapper>
        </div>
        <div className="wrapper">
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
                  />
                ))}
              </ul>
            ) : (
              <LoadError />
            )}
          </CardWrapper>
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
                  />
                ))}
              </ul>
            ) : (
              <LoadError />
            )}
          </CardWrapper>
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
                  />
                ))}
              </ul>
            ) : (
              <LoadError />
            )}
          </CardWrapper>
        </div>
        <div className="wrapper one-column">
          <CardWrapper
            title="List of influencers and their picks"
            subtitle="Today"
          >
            influencers picks
          </CardWrapper>
        </div>
      </LoggedInLayout>
    </div>
  );
};
