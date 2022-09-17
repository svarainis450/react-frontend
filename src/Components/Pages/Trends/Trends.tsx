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
  fetchTop3LowestProjects,
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
import { getFavProjects } from 'src/state/reduxstate/user/thunks';

export const Trends: React.FC = () => {
  const [filter, setFilter] = useState<SubmenuFilters>('daily');
  const filterTitle = filter === 'weekly' ? 'Last Week' : 'Today';
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
  >(undefined);
  const [offsetCount, setOffsetCount] = useState(0);

  const [influencersFilter, setInfluencersFilter] =
    useState<InfluencerFilterKeys>(InfluencerFilterKeys.NONE);
  const [inflFilterValue, setInflFilterValue] = useState<CategoryTags | string>(
    '1'
  );
  console.log(token);
  useEffect(() => {
    if (token) {
      // dispatch(getFavProjects({ tokenValue: token }));
      // dispatch(
      //   fetchInfluencers({
      //     callBack: setinfluencersStatus,
      //     filter: influencersFilter,
      //     filterValue: inflFilterValue,
      //     limit: 10,
      //     offset: offsetCount,
      //     tokenValue: token,
      //   })
      // );
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
      // dispatch(fetchProjectsPick(token));
      // dispatch(fetchProjectsByInfluencers(token));
      // dispatch(fetchTop3Projects({ filter: 'bull', tokenValue: token }));
      // dispatch(fetchTop3Projects({ filter: 'positive', tokenValue: token }));
      // dispatch(fetchTop3Projects({ filter: 'talk_rate', tokenValue: token }));
      // dispatch(fetchTop3LowestProjects({ filter: 'bear', tokenValue: token }));
      // dispatch(
      //   fetchTop3LowestProjects({ filter: 'negative', tokenValue: token })
      // );
      // dispatch(
      //   fetchTop3LowestProjects({ filter: 'lowest', tokenValue: token })
      // );
    }

    //   setTimeout(() => {
    //     const interval = setInterval(() => {
    //       setTimeLoaded((timeLoaded) => timeLoaded + 1);
    //     }, 60000);
    //     return () => clearInterval(interval);
    //   });
    // }
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
              <CardWrapper title="Trending Category" subtitle={filterTitle}>
                {trendingStatus === 'pending' ? (
                  <Loader width={50} height={50} />
                ) : (
                  <TrendingCategory
                    categoryCallback={setSelectCategory}
                    trendingProjects={trendingProjects}
                  />
                )}
              </CardWrapper>
              <CardWrapper
                title="Project picks by most followed crypto experts"
                subtitle={filterTitle}
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
              filterTitle={filterTitle}
            />
            <Top3ElementsSlider
              topBull={top3BullProjects}
              topPositive={top3PositiveProjects}
              topTalkRate={top3TalkRateProjects}
              filterTitle={filterTitle}
              isLowestList
            />
            <section className="wrapper one-column">
              <CardWrapper
                title="List of influencers and their picks"
                subtitle={filterTitle}
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
