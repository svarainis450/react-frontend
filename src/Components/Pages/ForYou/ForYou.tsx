import { ChangeEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  ForYouListItem,
  InfoBlockInstructions,
  Loader,
  ProjectMetrics,
  ProjectsSliderMobile,
} from 'src/Components/Global';
import { Submenu } from 'src/Components/Global/Submenu';
import { LoggedInLayout } from 'src/Components/layouts/LoggedInLayout';
import {
  projectByIdSelector,
  projectsDataSelector,
} from 'src/state/reduxstate/projects/selectors';
import { fetchProjects } from 'src/state/reduxstate/projects/thunks';
import { useAppDispatch } from 'src/state/reduxstate/store';

import './ForYou.scss';
import { SubmenuListProps } from 'src/Components/Global/Submenu';
import { Star, Influencers } from '../../../Assets/icons/IconElements';
import {
  favoriteProjectsSelector,
  userDataSelector,
} from 'src/state/reduxstate/user/selectors';
import { Typography } from '@mui/material';
import {
  Project,
  ProjectFilterKeys,
  Statuses,
} from 'src/state/reduxstate/projects/types';
import { icons } from 'src/utils/icons';
import { ForYouChartView } from 'src/Components/Global/Graphic/ForYouChartView';
import {
  getFavInfluencers,
  getFavProjects,
} from 'src/state/reduxstate/user/thunks';
import { filterProjectsLocaly } from 'src/utils/localFilters';
import { useForYouPageData, useMediaQuery, useProjectFilters } from 'src/hooks';
import { Top3FavElementsSlider } from 'src/Components/Global/ForYourElements/Top3FavElementsSlider';
import { setModalType } from 'src/state/reduxstate/modals/slice';
import { ModalTypes } from 'src/state/reduxstate/modals/types';

export const forYouSubmenuList: SubmenuListProps[] = [
  {
    title: 'Your Projects',
    url: '/foryou',
    icon: <Star />,
  },
  {
    title: 'Your Influencers',
    url: '/your-influencers',
    icon: <Influencers />,
  },
  // {
  //   title: 'Suggestions',
  //   url: '/suggestions',
  //   icon: <Suggestion />,
  // },
];

export const ForYou: React.FC = () => {
  const { isTablet } = useMediaQuery();
  const dataForStats = useForYouPageData();
  const dispatch = useAppDispatch();
  const userData = useSelector(userDataSelector);
  const isPotatoStarter = userData?.type === 'Potato Starter';

  const [nameFilter, setNameFilter] = useState<string | null>(null);
  const projectByIdState = useSelector(projectByIdSelector);
  const [projectsFilter, setProjectsFilter] = useState<ProjectFilterKeys>(
    ProjectFilterKeys.NONE
  );
  const [nameFilterStatus, setNameFilterStatus] = useState<Statuses>('idle');
  const { projects, meta } = useSelector(projectsDataSelector);
  const [takeProjects, setTakeProjects] = useState(0);
  const [loadMoreProjectsStatus, setLoadmoreProjectsStatus] =
    useState<Statuses>('idle');

  const favoriteProjects = useSelector(favoriteProjectsSelector);
  const hasFavProjects = favoriteProjects && favoriteProjects.length > 0;
  const filterValue = useProjectFilters(projectsFilter, null, nameFilter);

  const [showInfo, setShowInfo] = useState(false);
  const [showMobileList, setShowMobileList] = useState(false);

  useEffect(() => {
    dispatch(getFavProjects({}));
    dispatch(getFavInfluencers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isPotatoStarter) {
      dispatch(
        fetchProjects({ filter: filterValue, callBack: setNameFilterStatus })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectsFilter, filterValue, nameFilter]);

  useEffect(() => {
    if (takeProjects > 0) {
      if (meta && projects.length >= meta.total) {
        return;
      }
      if (takeProjects < ((meta && meta?.total) || 1000)) {
        setProjectsFilter(ProjectFilterKeys.NONE);
        dispatch(
          fetchProjects({
            skip: takeProjects,
            callBack: setLoadmoreProjectsStatus,
          })
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [takeProjects]);

  const topTalkRateProject =
    hasFavProjects &&
    filterProjectsLocaly(favoriteProjects, ProjectFilterKeys.TALK_RATE)?.slice(
      0,
      1
    );
  const topPositiveProject =
    hasFavProjects &&
    filterProjectsLocaly(favoriteProjects, ProjectFilterKeys.POSITIVE)?.slice(
      0,
      1
    );

  const topBullProject =
    hasFavProjects &&
    filterProjectsLocaly(favoriteProjects, ProjectFilterKeys.BULL)?.slice(0, 1);

  const handleNameInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (!isPotatoStarter) {
      if (e.target.value.length >= 3) {
        setProjectsFilter(ProjectFilterKeys.NAME);
        setNameFilter(e.target.value);
      } else if (e.target.value.length === 0) {
        setProjectsFilter(ProjectFilterKeys.NONE);
        setNameFilter(null);
      }
    }
  };

  const handleUpgradeModal = () => {
    if (isPotatoStarter) {
      dispatch(setModalType(ModalTypes.UPGRADE_TO_PRO));
    }
  };

  return (
    <div className="For-you">
      <LoggedInLayout activeLink="For you">
        <Submenu pageTitleMob="For You" menuItems={forYouSubmenuList} />
        <div>
          {!isTablet && dataForStats && dataForStats.length > 0 && (
            <ProjectMetrics projectByIdProp={dataForStats[0]} />
          )}
        </div>
        <div className="For-you__wrapper">
          <div className="For-you__wrapper__graph-wrapper">
            <div>
              {dataForStats && (
                <ForYouChartView
                  projectType={dataForStats[0].type}
                  chartPrice={dataForStats[0].chart_price}
                  chartSentiment={dataForStats[0].chart_sentiment}
                  chartTalkRate={dataForStats[0].chart_talk_rate}
                  chartVolume={dataForStats[0].chart_volume}
                />
              )}
            </div>
          </div>
          <div className="For-you__wrapper__projects-list">
            {!isTablet && (
              <div className="title-wrapper">
                <Typography className="list-title">
                  List of projects you follow
                </Typography>
                <img
                  className="question-mark"
                  src={icons.question_mark_grey}
                  alt="question mark"
                  onMouseOver={() => setShowInfo(true)}
                  onMouseLeave={() => setShowInfo(false)}
                  onTouchEnd={() => setShowInfo(false)}
                  onClick={() => setShowInfo(true)}
                />
                {showInfo && <InfoBlockInstructions />}
              </div>
            )}
            {(!isTablet || !showMobileList) && (
              <div className="input-wrapper" onClick={handleUpgradeModal}>
                <img
                  className="input-wrapper__magnifier"
                  src={icons.search_magnifier}
                  alt="Filter by name"
                />
                <input
                  className="input-wrapper__input"
                  type="text"
                  placeholder="Filter by name..."
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleNameInputChange(e)
                  }
                  onFocus={() => setShowMobileList(true)}
                  disabled={isPotatoStarter}
                />
              </div>
            )}
            {!isTablet && projectByIdState && filterValue !== '' && (
              <ForYouListItem
                showMobileListCallback={setShowMobileList}
                key={`${projectByIdState.id}`}
                project={projectByIdState}
                isInFavorites={
                  !!favoriteProjects?.find(
                    (item) => item.id === projectByIdState?.id
                  )
                }
              />
            )}
            <div className="For-you__wrapper__projects-list__desktop-mobile">
              {isTablet && showMobileList && (
                <div className="input-wrapper">
                  <img
                    className="input-wrapper__magnifier"
                    src={icons.search_magnifier}
                    alt="Filter by name"
                  />
                  <input
                    className="input-wrapper__input"
                    type="text"
                    placeholder="Filter by name..."
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleNameInputChange(e)
                    }
                    onFocus={() => setShowMobileList(true)}
                  />
                </div>
              )}
              {nameFilterStatus === 'pending' && showMobileList && (
                <Loader width={20} height={20} />
              )}
              {(!isTablet || showMobileList) &&
                hasFavProjects &&
                favoriteProjects.map((project: Project, index) => (
                  <ForYouListItem
                    nameFilterValue={nameFilter}
                    showMobileListCallback={setShowMobileList}
                    key={`${project.id}${index}`}
                    project={project}
                    isInFavorites
                    isCheckingStats={project.id === projectByIdState?.id}
                  />
                ))}
              {(!isTablet || showMobileList) &&
                projects &&
                // eslint-disable-next-line array-callback-return
                projects.map((project, index) => {
                  const isIncludedInFavs = favoriteProjects?.find(
                    (item) => item.id === project.id
                  );

                  if (!isIncludedInFavs) {
                    return (
                      <ForYouListItem
                        showMobileListCallback={setShowMobileList}
                        key={`${project.id + index}`}
                        project={project}
                        isCheckingStats={project.id === projectByIdState?.id}
                      />
                    );
                  }
                })}
              {(!isTablet || showMobileList) && (
                <div
                  className="load-more-projects"
                  onClick={() => setTakeProjects(takeProjects + 8)}
                >
                  {loadMoreProjectsStatus === 'pending' ? (
                    <Loader width={20} height={20} />
                  ) : (
                    <Typography>Load more...</Typography>
                  )}
                </div>
              )}
            </div>
            {isTablet && (hasFavProjects || projects) && (
              <ProjectsSliderMobile
                // projectIDCallback={setSelectedProjectID}
                favoriteProjects={favoriteProjects}
                projects={projects}
              />
            )}
            {isTablet && dataForStats && dataForStats.length > 0 && (
              <ProjectMetrics projectByIdProp={dataForStats[0]} />
            )}
          </div>
        </div>

        {hasFavProjects && (
          <Top3FavElementsSlider
            isForYouProject
            topBull={(topBullProject && topBullProject) || favoriteProjects}
            topPositive={
              (topPositiveProject && topPositiveProject) || favoriteProjects
            }
            topTalkRate={
              (topTalkRateProject && topTalkRateProject) || favoriteProjects
            }
          />
        )}
        {!hasFavProjects ||
          (!Array.isArray(favoriteProjects) && (
            <div className="empty-dashboard">
              <Typography>
                Welcome to your dashboard of interest. To add your favorite
                projects to this page, you need to click on the star icon on the
                Discover subpage.
              </Typography>
            </div>
          ))}
      </LoggedInLayout>
    </div>
  );
};
