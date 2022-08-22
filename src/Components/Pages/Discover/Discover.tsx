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
import { projectsSelector } from 'src/state/reduxstate/projects/selectors';
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
  const [projectsFilter, setProjectsFilter] = useState(ProjectFilterKeys.NONE);
  const [filterValue, setFilterValue] = useState<CategoryTags | string>('1');
  const [projectsStatus, setProjectStatus] = useState<Statuses>('idle');
  const [offsetCount, setOffsetCount] = useState(0);
  const notAllToShow = offsetCount < 3000;

  useEffect(() => {
    dispatch(
      fetchProjects({
        filter: projectsFilter,
        callBack: setProjectStatus,
        offset: offsetCount,
        filterValue: String(filterValue).toLocaleLowerCase(),
      })
    );
    if (userToken) {
      dispatch(getFavProjects({ tokenValue: userToken }));
    }
    scrollToElement('card-to-scroll');
  }, [projectsFilter, offsetCount, dispatch, filterValue, userToken]);

  const handleLoadMoreBtn = () => {
    if (notAllToShow) {
      setOffsetCount(offsetCount + 50);
    } else {
      const seenAll = 'You`ve seen it all';
      return seenAll;
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
        {projectsStatus === 'pending' && <Loader />}
        <div className="Discover__wrapper">
          {projectsStatus === 'success' &&
            projects &&
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
                  key={id}
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
        {notAllToShow && projectsStatus !== 'pending' && projects && (
          <Button onClick={() => handleLoadMoreBtn()}>Load more</Button>
        )}
      </LoggedInLayout>
    </div>
  );
};
