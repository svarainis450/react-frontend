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

  const projects = useSelector(projectsSelector);
  const [projectsFilter, setProjectsFilter] = useState(ProjectFilterKeys.NONE);
  const [categoryValue, setCategoryValue] = useState<CategoryTags | undefined>(
    undefined
  );
  const [projectsStatus, setProjectStatus] = useState<Statuses>('idle');
  const [offsetCount, setOffsetCount] = useState(0);
  const notAllToShow = offsetCount < 3000;

  useEffect(() => {
    dispatch(
      fetchProjects({
        filter: projectsFilter,
        callBack: setProjectStatus,
        offset: offsetCount,
        filterValue: categoryValue,
      })
    );
    scrollToElement('card-to-scroll');
  }, [projectsFilter, offsetCount, dispatch, categoryValue]);

  const handleLoadMoreBtn = () => {
    if (notAllToShow) {
      setOffsetCount(offsetCount + 50);
    } else {
      const seenAll = 'You`ve seen it all';
      return seenAll;
    }
  };

  console.log(projects);
  return (
    <div className="Discover">
      <LoggedInLayout>
        <Submenu menuItems={submenuList} />
        <ProjectFilters
          callBack={setProjectsFilter}
          categoryCallBack={setCategoryValue}
        />

        {projectsStatus === 'pending' && <Loader />}

        <div className="Discover__wrapper">
          {projectsStatus === 'success' &&
            projects.map(
              ({
                id,
                coinbaseUrl,
                tag,
                rateData,
                name,
                influencers,
                img,
                started,
              }) => (
                <Element
                  name={id === offsetCount ? 'card-to-scroll' : 'no-scroll'}
                >
                  <ProjectCard
                    id={id}
                    key={id}
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
        {notAllToShow && projectsStatus !== 'pending' && (
          <Button onClick={() => handleLoadMoreBtn()}>Load more</Button>
        )}
        {projectsStatus === 'error' && <LoadError />}
      </LoggedInLayout>
    </div>
  );
};
