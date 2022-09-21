import { ChangeEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  ForYouListItem,
  InfoBlockInstructions,
  ProjectMetrics,
  ProjectsSliderMobile,
  Top3ElementsSlider,
} from 'src/Components/Global';
import { Submenu } from 'src/Components/Global/Submenu';
import { LoggedInLayout } from 'src/Components/layouts/LoggedInLayout';
import {
  projectByIdSelector,
  projectsSelector,
  trendingProjectsSelector,
} from 'src/state/reduxstate/projects/selectors';
import { fetchProjects } from 'src/state/reduxstate/projects/thunks';
import { useAppDispatch } from 'src/state/reduxstate/store';

import './ForYou.scss';
import { SubmenuListProps } from 'src/Components/Global/Submenu';
import { Star, Influencers } from '../../../Assets/icons/IconElements';
import {
  favoriteProjectsSelector,
  userTokenSelector,
} from 'src/state/reduxstate/user/selectors';
import { Typography } from '@mui/material';
import {
  Project,
  ProjectFilterKeys,
  Statuses,
} from 'src/state/reduxstate/projects/types';
import { CategoryTags } from 'src/Components/Global/TrendsElements/types';
import { icons } from 'src/utils/icons';
import { ForYouChartView } from 'src/Components/Global/Graphic/ForYouChartView';
import { dogeCoinProjectData } from 'src/Components/Global/Graphic/chartDevData';
import {
  getFavInfluencers,
  getFavProjects,
} from 'src/state/reduxstate/user/thunks';
import {
  filterProjectsByName,
  filterProjectsLocaly,
} from 'src/utils/localFilters';
import { useMediaQuery } from 'src/hooks';

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
  const dispatch = useAppDispatch();
  const [filterValue, setFilterValue] = useState<CategoryTags | string>('1');
  const projectByIdState = useSelector(projectByIdSelector);
  const [offsetCount, setOffsetCount] = useState(0);
  const [projectsFilter, setProjectsFilter] = useState(ProjectFilterKeys.NONE);
  const projects = useSelector(projectsSelector);

  const favoriteProjects = useSelector(favoriteProjectsSelector);
  const userToken = useSelector(userTokenSelector);
  const token = localStorage.getItem('token');
  const [filteredFavProjects, setFilteredFavProjects] =
    useState(favoriteProjects);
  const [favFetchStatus, setFavFetchStatus] = useState<Statuses>('idle');

  const [selectedProjectID, setSelectedProjectID] = useState<number | null>(
    null
  );
  const [showInfo, setShowInfo] = useState(false);
  const [showMobileList, setShowMobileList] = useState(false);

  useEffect(() => {
    if (!window.location.hash) {
      //@ts-ignore
      window.location = window.location + '#loaded';
      window.location.reload();
    }
  }, []);

  useEffect(() => {
    dispatch(
      fetchProjects({
        filter: projectsFilter,
        callBack: setProjectStatus,
        skip: offsetCount,
        filterValue: String(filterValue).toLocaleLowerCase(),
      })
    );

    dispatch(getFavInfluencers());
  }, [
    projectsFilter,
    offsetCount,
    dispatch,
    filterValue,
    userToken,
    token,
    selectedProjectID,
  ]);

  const { isTablet } = useMediaQuery();

  const [projectsStatus, setProjectStatus] = useState<Statuses>('idle');

  const topTalkRateProject =
    favoriteProjects &&
    filterProjectsLocaly(favoriteProjects, ProjectFilterKeys.TALK_RATE)?.slice(
      0,
      1
    );
  const topPositiveProject =
    favoriteProjects &&
    filterProjectsLocaly(favoriteProjects, ProjectFilterKeys.POSITIVE)?.slice(
      0,
      1
    );

  const topBullProject =
    favoriteProjects &&
    filterProjectsLocaly(favoriteProjects, ProjectFilterKeys.BULL)?.slice(0, 1);

  const handleNameInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.value.length >= 3) {
      setProjectsFilter(ProjectFilterKeys.NAME);
      setFilterValue(e.target.value);
      setFilteredFavProjects(
        favoriteProjects.filter(
          (project) =>
            project.name
              .toLocaleLowerCase()
              .includes(e.target.value.toLocaleLowerCase()) && project
        )
      );
    } else if (e.target.value.length === 0) {
      setProjectsFilter(ProjectFilterKeys.NONE);
      setFilterValue('1');
      setFilteredFavProjects(favoriteProjects);
    }
  };

  return (
    <div className="For-you">
      <LoggedInLayout activeLink="For you">
        <Submenu pageTitleMob="For You" menuItems={forYouSubmenuList} />

        <div className="For-you__wrapper">
          <div className="For-you__wrapper__graph-wrapper">
            <div>
              {favoriteProjects.length > 0 && (
                <ProjectMetrics projectByIdProp={favoriteProjects[0]} />
              )}
            </div>

            <div>
              {(favFetchStatus !== 'success' ||
                (favoriteProjects && favoriteProjects.length > 0)) && (
                // this is chart
                <ForYouChartView
                  chartPrice={dogeCoinProjectData.data.chart_price}
                  chartSentiment={dogeCoinProjectData.data.chart_sentiment}
                  chartTalkRate={dogeCoinProjectData.data.chart_talk_rate}
                  chartVolume={dogeCoinProjectData.data.chart_volume}
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
            {/* {!isTablet && projectByIdState && filterValue !== '1' && (
              <ForYouListItem
                key={`${projectByIdState.id}`}
                project={projectByIdState}
                // projectIDCallback={projectByIdState.id}
                isInFavorites={
                  !!favoriteProjects?.find(
                    (item) => item.id === projectByIdState?.id
                  )
                }
              />
            )} */}
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
              {(!isTablet || showMobileList) &&
                (favFetchStatus === 'success' || favoriteProjects.length > 0) &&
                filteredFavProjects.map((project, index) => (
                  <ForYouListItem
                    showMobileListCallback={setShowMobileList}
                    key={`${project.id}${index}`}
                    project={project}
                    isInFavorites
                    isCheckingStats={project.id === projectByIdState?.id}
                  />
                ))}
              {(!isTablet || showMobileList) &&
                projects &&
                projects.map((project, index) => (
                  <ForYouListItem
                    showMobileListCallback={setShowMobileList}
                    key={`${project.id + index}`}
                    project={project}
                    isCheckingStats={project.id === projectByIdState?.id}
                  />
                ))}
            </div>
            {isTablet && (filteredFavProjects || projects) && (
              <ProjectsSliderMobile
                // projectIDCallback={setSelectedProjectID}
                favoriteProjects={favoriteProjects}
                projects={projects}
              />
            )}
          </div>
        </div>

        {/* {favoriteProjects && favoriteProjects.length > 0 && (
          <Top3ElementsSlider
            isForYouProject
            topBull={(topBullProject && topBullProject) || favoriteProjects}
            topPositive={
              (topPositiveProject && topPositiveProject) || favoriteProjects
            }
            topTalkRate={
              (topTalkRateProject && topTalkRateProject) || favoriteProjects
            }
          />
        )} */}
        {!favoriteProjects ||
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
