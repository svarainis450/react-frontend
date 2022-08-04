import { useEffect, useState } from 'react';

import {
  CardWrapper,
  InfluencersTable,
  Loader,
  ProjectPicksTable,
  Top3ElementsSlider,
  TrendingCategory,
  UpcommingLayout,
} from 'src/Components/Global';
import { LoggedInLayout } from 'src/Components/layouts/LoggedInLayout';
import { submenuList } from './constants';

import './trends.scss';
import { useAppDispatch } from 'src/state/reduxstate/store';
import {
  fetchInfluencers,
  fetchProjectsByInfluencers,
  fetchProjectsPick,
  fetchTop3Projects,
  fetchTrendingProjects,
} from 'src/state/reduxstate/projects/thunks';
import {
  influencersSelector,
  projectPicksSelector,
  projectsByInfluencersSelector,
  top3BullProjectsSelector,
  top3PositiveProjectsSelector,
  top3TalkRateProjectsSelector,
  trendingProjectsSelector,
} from 'src/state/reduxstate/projects/selectors';
import { useSelector } from 'react-redux';
import {
  InfluencerFilterKeys,
  Statuses,
  SubmenuFilters,
} from 'src/state/reduxstate/projects/types';
import { Submenu } from './Submenu';
import { userTokenSelector } from 'src/state/reduxstate/user/selectors';
import { CategoryTags } from 'src/Components/Global/TrendsElements/types';

export const Trends: React.FC = () => {
  const [filter, setFilter] = useState<SubmenuFilters>('today');
  const [trendingStatus, setTrendingStatus] = useState<Statuses>('idle');
  const [influencersStatus, setinfluencersStatus] = useState<Statuses>('idle');

  const dispatch = useAppDispatch();
  const trendingProjects = useSelector(trendingProjectsSelector);
  const projectPicks = useSelector(projectPicksSelector);
  const top3BullProjects = useSelector(top3BullProjectsSelector);
  const top3PositiveProjects = useSelector(top3PositiveProjectsSelector);
  const top3TalkRateProjects = useSelector(top3TalkRateProjectsSelector);
  const influencers = useSelector(influencersSelector);
  const projectsByInfluencers = useSelector(projectsByInfluencersSelector);
  const token = useSelector(userTokenSelector);
  const [selectCategory, setSelectCategory] = useState<CategoryTags>(
    CategoryTags.coins
  );
  const [offsetCount, setOffsetCount] = useState(0);

  const [influencersFilter, setInfluencersFilter] =
    useState<InfluencerFilterKeys>(InfluencerFilterKeys.NONE);
  const [inflFilterValue, setInflFilterValue] = useState<CategoryTags | string>(
    '1'
  );

  useEffect(() => {
    dispatch(fetchProjectsPick());
    dispatch(fetchTop3Projects('bull'));
    dispatch(fetchTop3Projects('positive'));
    dispatch(fetchTop3Projects('talk_rate'));
    dispatch(fetchProjectsByInfluencers());
  }, [dispatch, token]);

  useEffect(() => {
    dispatch(
      fetchInfluencers({
        callBack: setinfluencersStatus,
        filter: influencersFilter,
        filterValue: inflFilterValue,
        limit: 10,
        offset: offsetCount,
      })
    );
    dispatch(
      fetchTrendingProjects({
        filter: filter,
        callBack: setTrendingStatus,
        categoryFilter: selectCategory,
      })
    );
  }, [
    filter,
    inflFilterValue,
    influencersFilter,
    dispatch,
    offsetCount,
    selectCategory,
  ]);

  return (
    <div className="Trends">
      <LoggedInLayout>
        <Submenu callBack={setFilter} menuItems={submenuList} />
        {filter === 'upcomming' ? (
          <UpcommingLayout />
        ) : (
          <>
            <section className="wrapper two-columns">
              <CardWrapper title="Trending Category" subtitle="Today">
                {trendingStatus === 'pending' ? (
                  <Loader />
                ) : (
                  <TrendingCategory
                    categoryCallback={setSelectCategory}
                    trendingProjects={trendingProjects}
                  />
                )}
              </CardWrapper>
              <CardWrapper
                title="Project picks by most followed crypto experts"
                subtitle="Today"
              >
                <ProjectPicksTable
                  influencerProjects={projectsByInfluencers}
                  pickedProjects={projectPicks}
                />
              </CardWrapper>
            </section>
            <Top3ElementsSlider
              topBull={top3BullProjects}
              topPositive={top3PositiveProjects}
              topTalkRate={top3TalkRateProjects}
            />
            <section className="wrapper one-column">
              <CardWrapper
                title="List of influencers and their picks"
                subtitle="Today"
              >
                <InfluencersTable
                  influencersData={influencers}
                  callBack={setInfluencersFilter}
                  nameFilterCallBack={setInflFilterValue}
                  categoryCallBack={setInflFilterValue}
                  offsetCallBack={setOffsetCount}
                />
              </CardWrapper>
            </section>
          </>
        )}
      </LoggedInLayout>
    </div>
  );
};
