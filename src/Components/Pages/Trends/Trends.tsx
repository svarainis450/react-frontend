import { CardWrapper, TrendingCategory } from 'src/Components/Global';
import { LoggedInLayout } from 'src/Components/layouts/LoggedInLayout';
import { Submenu } from 'src/Components/Global/Submenu';
import { submenuList } from './constants';

import './trends.scss';

export const Trends = () => {
  return (
    <div className="Trends">
      <LoggedInLayout>
        <Submenu menuItems={submenuList} />
        <div className="wrapper">
          <CardWrapper title="Trending Category" subtitle="Today">
            <TrendingCategory />
          </CardWrapper>
          <CardWrapper
            title="Project picks by popularity among influencers and their followers"
            subtitle="Today"
          >
            anther coljumn
          </CardWrapper>
        </div>
        <div className="wrapper">
          <CardWrapper
            title="Top 3 Talk Rate Projects"
            subtitle="Today"
            showInfoLabel
          >
            anther coljumn
          </CardWrapper>
          <CardWrapper
            title="Top 3 Positive Projects"
            subtitle="Today"
            showInfoLabel
          >
            anther coljumn
          </CardWrapper>
          <CardWrapper
            title="Top 3 Bull Projects"
            subtitle="Today"
            showInfoLabel
          >
            anther coljumn
          </CardWrapper>
        </div>
      </LoggedInLayout>
    </div>
  );
};
