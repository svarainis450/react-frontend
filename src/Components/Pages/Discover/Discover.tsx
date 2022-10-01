import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Element } from 'react-scroll';

import {
  Loader,
  LoadError,
  ProjectCard,
  ProjectFilters,
} from 'src/Components/Global';
import { Submenu } from 'src/Components/Global/Submenu';
import { LoggedInLayout } from 'src/Components/layouts/LoggedInLayout';
import { projectsDataSelector } from 'src/state/reduxstate/projects/selectors';
import { fetchProjects } from 'src/state/reduxstate/projects/thunks';
import { useAppDispatch } from 'src/state/reduxstate/store';

import './Discover.scss';
import { SubmenuListProps } from 'src/Components/Global/Submenu';
import { Star, Influencers, Funds } from '../../../Assets/icons/IconElements';
import {
  ProjectFilterKeys,
  Statuses,
} from 'src/state/reduxstate/projects/types';
import { Button } from 'src/Components/Global/Button';
import { CategoryTags } from 'src/Components/Global/TrendsElements/types';
import { scrollToElement } from 'src/utils/scrollers';
import { getFavProjects } from 'src/state/reduxstate/user/thunks';
import { Typography } from 'src/Components/Global/Typography';
import { fetchInfluencers } from 'src/state/reduxstate/influencers/thunks';
import { userTokenSelector } from 'src/state/reduxstate/user/selectors';
import { useProjectFilters } from 'src/hooks';
import { ModalWrapper } from 'src/Components/wrappers/ModalWrapper';

export const submenuList: SubmenuListProps[] = [
  {
    title: 'Projects',
    url: '/discover',
    icon: <Star />,
  },
  {
    title: 'Influencers',
    url: '/influencers',
    icon: <Influencers />,
  },
  {
    title: 'Funds',
    url: '/funds',
    icon: <Funds />,
  },
];

export const Discover: React.FC = () => {
  const dispatch = useAppDispatch();
  const projectsData = useSelector(projectsDataSelector);
  const projects = projectsData.projects;
  const [projectsFilter, setProjectsFilter] = useState(ProjectFilterKeys.NONE);
  const [categoryFilter, setCategoryFilter] = useState<CategoryTags | null>(
    null
  );
  const [nameFilter, setNameFilter] = useState<string | null>(null);
  const filterValue = useProjectFilters(
    projectsFilter,
    categoryFilter,
    nameFilter
  );

  const [projectsStatus, setProjectStatus] = useState<Statuses>('idle');

  const [skipElements, setSkipElements] = useState<number | null>(null);
  const token = useSelector(userTokenSelector);
  const skipElementsValue = skipElements === null ? 0 : skipElements;
  const notAllToShow =
    (skipElements !== null && skipElements) < Number(projectsData?.meta?.total);
  const [seenAll, setSeenAll] = useState('');

  const projectsLeftToSee =
    Number(projectsData?.meta?.total) -
    Number(skipElements !== null && skipElements);

  const cardsPerOneRequest = 8;

  useEffect(() => {
    if (
      (projects && projects.length === 0) ||
      (skipElements && skipElements > 0) ||
      filterValue
    ) {
      dispatch(
        fetchProjects({
          filter: filterValue,
          callBack: setProjectStatus,
          skip: skipElements,
        })
      ).then(() => scrollToElement('card-to-scroll'));
    }
  }, [skipElements, filterValue]);

  useEffect(() => {
    if (token) {
      dispatch(fetchInfluencers({ skip: null }));
      dispatch(getFavProjects({ tokenValue: token }));
    }
  }, []);

  const handleLoadMoreBtn = () => {
    if (notAllToShow && projectsLeftToSee >= cardsPerOneRequest) {
      setSkipElements(skipElementsValue + cardsPerOneRequest);
    } else if (notAllToShow && projectsLeftToSee < cardsPerOneRequest) {
      setSkipElements(skipElementsValue + projectsLeftToSee);
      const seenAll = 'You`ve seen it all';
      setSeenAll(seenAll);
    } else {
      const seenAll = 'You`ve seen it all';
      setSeenAll(seenAll);
    }
  };
  return (
    <div className="Discover">
      <LoggedInLayout activeLink="Discover">
        <Submenu pageTitleMob="Discover" menuItems={submenuList} />
        {projectsStatus === 'pending' && filterValue.length > 0 && (
          <ModalWrapper
            overlayOpacity="0.8"
            overlayBackground="#fff"
            topPositionOverlay="64px"
          >
            <div className="full-screen-loader">
              <Loader width={50} height={50} />
            </div>
          </ModalWrapper>
        )}
        <ProjectFilters
          callBack={setProjectsFilter}
          categoryCallBack={setCategoryFilter}
          nameFilterCallBack={setNameFilter}
        />
        <div className="Discover__wrapper">
          {projectsStatus === 'error' ||
            (!projects && (
              <div className="Discover__err-wrapper">
                <LoadError />
              </div>
            ))}
          {projects &&
            projects.length > 0 &&
            projects.map(
              (
                {
                  id,
                  coinbase_url,
                  name,
                  img_url,
                  type,
                  talk_rate_score,
                  talk_rate_daily_change,
                  bull_bear_score,
                  first_historical_data,
                  sentiment_score,
                  chart_talk_rate,
                  chart_sentiment,
                  price,
                  opensea_project_url,
                },
                index
              ) => (
                <Element
                  key={index}
                  name={index === skipElements ? 'card-to-scroll' : 'no-scroll'}
                >
                  <ProjectCard
                    id={id}
                    name={name}
                    img_url={img_url}
                    coinbase_url={coinbase_url}
                    talk_rate_score={talk_rate_score}
                    talk_rate_daily_change={talk_rate_daily_change}
                    bull_bear_score={bull_bear_score}
                    sentiment_score={sentiment_score}
                    first_historical_data={first_historical_data}
                    chart_talk_rate={chart_talk_rate}
                    chart_sentiment={chart_sentiment}
                    price={price}
                    opensea_project_url={opensea_project_url}
                    // influencers={influencers}
                    type={type as unknown as CategoryTags}
                  />
                </Element>
              )
            )}
        </div>
        {projectsStatus === 'pending' && <Loader width={50} height={50} />}

        {notAllToShow &&
          projectsStatus !== 'pending' &&
          projects &&
          seenAll.length === 0 && (
            <Button
              className="load-more-btn"
              onClick={() => handleLoadMoreBtn()}
            >
              Load more
            </Button>
          )}
        {seenAll.length > 0 && <Typography>{seenAll}</Typography>}
      </LoggedInLayout>
    </div>
  );
};
