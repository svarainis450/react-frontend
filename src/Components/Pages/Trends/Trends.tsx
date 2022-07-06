import { useEffect, useState } from 'react';

import {
  CardWrapper,
  CategoryTag,
  Top3Element,
  TrendingCategory,
} from 'src/Components/Global';
import {
  CategoryTags,
  InfoBlockTypes,
} from 'src/Components/Global/TrendsElements/types';
import { LoggedInLayout } from 'src/Components/layouts/LoggedInLayout';
import { Submenu } from 'src/Components/Global/Submenu';
import { submenuList, infoBlocks } from './constants';

import './trends.scss';
import { useAppDispatch } from 'src/state/reduxstate/store';
import { fethchProjects } from 'src/state/reduxstate/projects/thunks';

export const Trends = () => {
  const [showInfoBlock, setShowInfoBlock] = useState<InfoBlockTypes | null>(
    null
  );
  const dispatch = useAppDispatch();

  const demoProjects = [
    {
      id: 1,
      icon: 'bitkoin',
      tag: CategoryTags.coins,
      title: 'Bitcoin (BTC)',
      rate: '67',
    },
    {
      id: 2,
      icon: 'bitkoin',
      tag: CategoryTags.coins,
      title: 'Bitcoin (BTC)',
      rate: '67',
    },
    {
      id: 3,
      icon: 'bitkoin',
      tag: CategoryTags.coins,
      title: 'Bitcoin (BTC)',
      rate: '67',
    },
  ];

  const token =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2NTY3ODAyNDgsImV4cCI6MTY1NzE0MDI0OCwicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoiaWV2YUB0ZXN0Lmx0In0.ts6s40LdIoA0M1BKkHIF4fMTdZ3UurYZmS3tLJoMshR9QL74nHK23mgOftHUTcle8ngzCdcfKPjw9FZCDXRWPOK9JQokEbUU1KnuhqFyWVNT041EHIoDeLc9swJqvFmmZnSwCyWAszrokggydr_1rttsyg12KN5taROebJrZbnBSn0Kw4ckfm2bte5XoClTRfuCE95bLd9Dar0bxWbdIwO5N1s_E3GGvmEARpqf0CJ2pqaGXIiKQb8YDoj56N5TT4GdqeggAEBRsffqrS-oZNAPovnYGTbqRcMG1XbH4z3nfP-P2TCLZtgScCPFNyiLE7joVV6XRkdWhkZO_2YvYWQ';

  useEffect(() => {
    dispatch(fethchProjects());
  }, []);

  return (
    <div className="Trends">
      <LoggedInLayout>
        <Submenu menuItems={submenuList} />
        <div className="wrapper two-columns">
          <CardWrapper title="Trending Category" subtitle="Today">
            <TrendingCategory />
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
            <ul className="cards-grid">
              {demoProjects.map(({ id, icon, title, tag, rate }) => (
                <Top3Element
                  key={id}
                  id={id}
                  icon={icon}
                  projectName={title}
                  tagTitle={tag}
                  talkRate={rate}
                />
              ))}
            </ul>
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
            <ul className="cards-grid">
              {demoProjects.map(({ id, icon, title, tag, rate }) => (
                <Top3Element
                  key={id}
                  id={id}
                  icon={icon}
                  projectName={title}
                  tagTitle={tag}
                  talkRate={rate}
                />
              ))}
            </ul>
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
            <ul className="cards-grid">
              {demoProjects.map(({ id, icon, title, tag, rate }) => (
                <Top3Element
                  key={id}
                  id={id}
                  icon={icon}
                  projectName={title}
                  tagTitle={tag}
                  talkRate={rate}
                />
              ))}
            </ul>
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
