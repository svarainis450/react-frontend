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

  const projects = useSelector(projectsSelector);
  const projectsCount = useSelector(projectsCounttSelector);
  const [projectsFilter, setProjectsFilter] = useState(ProjectFilterKeys.NONE);
  const [filterValue, setFilterValue] = useState<CategoryTags | string>('1');
  const [projectsStatus, setProjectStatus] = useState<Statuses>('idle');
  const [offsetCount, setOffsetCount] = useState(0);
  const notAllToShow = offsetCount < projectsCount;
  const [seenAll, setSeenAll] = useState('');
  const projectsLeftToSee = projectsCount - offsetCount;

  useEffect(() => {
    if (projects.length === 0 || offsetCount > 0) {
      dispatch(
        fetchProjects({
          filter: projectsFilter,
          callBack: setProjectStatus,
          offset: offsetCount,
          filterValue: String(filterValue).toLocaleLowerCase(),
        })
      ).then(() => scrollToElement('card-to-scroll'));
    }
  }, [projectsFilter, offsetCount, dispatch, filterValue, userToken]);

  const handleLoadMoreBtn = () => {
    if (notAllToShow && projectsLeftToSee >= 52) {
      setOffsetCount(offsetCount + 52);
    } else if (notAllToShow && projectsLeftToSee < 52) {
      setOffsetCount(offsetCount + projectsLeftToSee);
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
        {(projectsStatus === 'error' || !projects) && (
          <div className="Discover__err-wrapper">
            <LoadError />
          </div>
        )}
        <div className="Discover__wrapper">
          {(projectsStatus === 'success' || projects.length > 0) &&
            projects.map(
              (
                {
                  id,
                  coinbaseUrl,
                  tag,
                  rateData,
                  name,
                  influencers,
                  img,
                  started,
                },
                index
              ) => (
                <Element
                  key={index}
                  name={index === offsetCount ? 'card-to-scroll' : 'no-scroll'}
                >
                  <ProjectCard
                    id={id}
                    name={name}
                    img={img}
                    coinbaseUrl={coinbaseUrl}
                    influencers={influencers}
                    rateData={rateData}
                    tag={tag}
                    started={started}
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
