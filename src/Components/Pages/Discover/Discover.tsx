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
import {
  projectsCounttSelector,
  projectsDataSelector,
  projectsSelector,
} from 'src/state/reduxstate/projects/selectors';
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
import { userTokenSelector } from 'src/state/reduxstate/user/selectors';
import { Typography } from '@mui/material';

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
  const userToken = useSelector(userTokenSelector);
  const projectsData = useSelector(projectsDataSelector);
  const projects = projectsData.projects;
  const projectsCount = useSelector(projectsCounttSelector);
  const [projectsFilter, setProjectsFilter] = useState(ProjectFilterKeys.NONE);
  const [filterValue, setFilterValue] = useState<CategoryTags | string>('1');
  const [projectsStatus, setProjectStatus] = useState<Statuses>('idle');
  const [offsetCount, setOffsetCount] = useState(0);
  const [skipElements, setSkipElements] = useState<number | null>(null);

  const notAllToShow =
    (skipElements !== null && skipElements) <
    (projectsData &&
      projectsData.meta !== undefined &&
      projectsData.meta.total !== undefined &&
      projectsData.meta.total);
  const [seenAll, setSeenAll] = useState('');
  const projectsLeftToSee =
    Number(
      projectsData &&
        projectsData.meta !== undefined &&
        projectsData.meta.total !== undefined &&
        projectsData.meta.total
    ) - Number(skipElements !== null && skipElements);

  console.log(projects);
  console.log(projectsData.meta?.total);

  useEffect(() => {
    if (
      (projects && projects.length === 0) ||
      (skipElements && skipElements > 0)
    ) {
      dispatch(
        fetchProjects({
          filter: projectsFilter,
          callBack: setProjectStatus,
          skip: skipElements,
          filterValue: String(filterValue).toLocaleLowerCase(),
        })
      ).then(() => scrollToElement('card-to-scroll'));
    }
  }, [skipElements, projectsFilter]);

  const handleLoadMoreBtn = () => {
    if (notAllToShow && projectsLeftToSee >= 52 && skipElements) {
      setSkipElements(skipElements + 52);
    } else if (notAllToShow && projectsLeftToSee < 52 && skipElements) {
      setSkipElements(skipElements + projectsLeftToSee);
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
        <ProjectFilters
          callBack={setProjectsFilter}
          categoryCallBack={setFilterValue}
          nameFilterCallBack={setFilterValue}
        />
        <div className="Discover__wrapper">
          {projectsStatus === 'error' ||
            (!projects && (
              <div className="Discover__err-wrapper">
                <LoadError />
              </div>
            ))}
          {projectsStatus === 'success' ||
            (projects &&
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
                    nft_address,
                    first_historical_data,
                    sentiment_score,
                  },
                  index
                ) => (
                  <Element
                    key={index}
                    name={
                      index === offsetCount ? 'card-to-scroll' : 'no-scroll'
                    }
                  >
                    <ProjectCard
                      id={id}
                      name={name}
                      img_url={img_url}
                      nft_address={nft_address}
                      coinbase_url={coinbase_url}
                      talk_rate_score={talk_rate_score}
                      talk_rate_daily_change={talk_rate_daily_change}
                      bull_bear_score={bull_bear_score}
                      sentiment_score={sentiment_score}
                      first_historical_data={first_historical_data}
                      // influencers={influencers}
                      type={type as unknown as CategoryTags}
                    />
                  </Element>
                )
              ))}
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
