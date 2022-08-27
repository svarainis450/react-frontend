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
  fetchProjectById,
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
import {
  favoriteProjectsSelector,
  userTokenSelector,
} from 'src/state/reduxstate/user/selectors';
import { CategoryTags } from 'src/Components/Global/TrendsElements/types';
import { render } from 'react-dom';
import { isLoggedIn } from 'src/Common/utils/isLoggedIn';
import { getFavProjects } from 'src/state/reduxstate/user/thunks';

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
  const [selectCategory, setSelectCategory] = useState<
    CategoryTags | undefined
  >(CategoryTags.coins);
  const [offsetCount, setOffsetCount] = useState(0);

  const [influencersFilter, setInfluencersFilter] =
    useState<InfluencerFilterKeys>(InfluencerFilterKeys.NONE);
  const [inflFilterValue, setInflFilterValue] = useState<CategoryTags | string>(
    '1'
  );
  useEffect(() => {
    if (token) {
      dispatch(getFavProjects({ tokenValue: token }));
      dispatch(
        fetchInfluencers({
          callBack: setinfluencersStatus,
          filter: influencersFilter,
          filterValue: inflFilterValue,
          limit: 10,
          offset: offsetCount,
          tokenValue: token,
        })
      );
      dispatch(
        fetchTrendingProjects({
          filter: filter,
          callBack: setTrendingStatus,
          categoryFilter: selectCategory,
          tokenValue: token,
        })
      );
    }
  }, [
    token,
    filter,
    inflFilterValue,
    influencersFilter,
    dispatch,
    offsetCount,
    selectCategory,
  ]);

  useEffect(() => {
    if (token) {
      dispatch(fetchProjectsPick(token));
      dispatch(fetchTop3Projects({ filter: 'bull', tokenValue: token }));
      dispatch(fetchTop3Projects({ filter: 'positive', tokenValue: token }));
      dispatch(fetchTop3Projects({ filter: 'talk_rate', tokenValue: token }));
      dispatch(fetchProjectsByInfluencers(token));
    }
  }, [dispatch, token]);

  return (
    <div className="Trends">
      <LoggedInLayout activeLink="Trends">
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
