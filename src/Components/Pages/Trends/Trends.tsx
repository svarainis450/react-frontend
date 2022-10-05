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
  fetchProjects,
  fetchProjectsByInfluencers,
  fetchTrendingProjects,
} from 'src/state/reduxstate/projects/thunks';
import {
  projectsByInfluencersSelector,
  trendingProjectsSelector,
} from 'src/state/reduxstate/projects/selectors';
import { useSelector } from 'react-redux';
import { Statuses, SubmenuFilters } from 'src/state/reduxstate/projects/types';
import { Submenu } from './Submenu';
import { userTokenSelector } from 'src/state/reduxstate/user/selectors';
import { CategoryTags } from 'src/Components/Global/TrendsElements/types';
import { projectPicksSelector } from 'src/state/reduxstate/influencers/selectors';
import { fetchProjectsPick } from 'src/state/reduxstate/influencers/thunks';
import { useNavigate } from 'react-router-dom';
import { LinkList } from 'src/types';
import { LogOut } from 'src/Common/utils/LogOut';

export const Trends: React.FC = () => {
  const [filter, setFilter] = useState<SubmenuFilters>('daily');
  const filterTitle = filter === 'weekly' ? 'Last Week' : 'Today';
  const [trendingStatus, setTrendingStatus] = useState<Statuses>('idle');
  const dispatch = useAppDispatch();
  const trendingProjects = useSelector(trendingProjectsSelector);
  const projectPicks = useSelector(projectPicksSelector);
  const projectsByInfluencers = useSelector(projectsByInfluencersSelector);
  const token = useSelector(userTokenSelector);
  const [selectCategory, setSelectCategory] = useState<
    CategoryTags | undefined
  >(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      dispatch(
        fetchTrendingProjects({
          dateFilter: filter,
          callBack: setTrendingStatus,
          categoryFilter: selectCategory,
          tokenValue: token,
        })
      );
    }
  }, [token, filter, selectCategory]);

  useEffect(() => {
    if (token && filter !== 'upcomming') {
      dispatch(fetchProjectsPick({ tokenValue: token, dateFilter: filter }));
      dispatch(
        fetchProjectsByInfluencers({ tokenValue: token, dateFilter: filter })
      );
    }

    //   setTimeout(() => {
    //     const interval = setInterval(() => {
    //       setTimeLoaded((timeLoaded) => timeLoaded + 1);
    //     }, 60000);
    //     return () => clearInterval(interval);
    //   });
    // }
  }, [token, filter]);

  useEffect(() => {
    dispatch(fetchProjects({ skip: null }));
  }, []);

  useEffect(() => {
    if (trendingStatus === 'unauthorized') {
      navigate(LinkList.Login);
      LogOut();
    }
  }, [trendingStatus]);

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
                    filterTitle={filterTitle}
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
            <Top3ElementsSlider filterTitle={filterTitle} filter={filter} />
            <Top3ElementsSlider
              filterTitle={filterTitle}
              isLowestList
              filter={filter}
            />
            <section className="wrapper one-column">
              <CardWrapper
                title="List of influencers and their picks"
                subtitle={filterTitle}
              >
                <InfluencersTable filter={filter} />
              </CardWrapper>
            </section>
          </>
        )}
      </LoggedInLayout>
    </div>
  );
};
