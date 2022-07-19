import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  InfluencerCard,
  LoadError,
  ProjectCard,
  ProjectFilters,
} from 'src/Components/Global';
import { Submenu } from 'src/Components/Global/Submenu';
import { LoggedInLayout } from 'src/Components/layouts/LoggedInLayout';
import {
  influencersSelector,
  projectFilterKeySelector,
  projectsSelector,
} from 'src/state/reduxstate/projects/selectors';
import { fetchInfluencers } from 'src/state/reduxstate/projects/thunks';
import { useAppDispatch } from 'src/state/reduxstate/store';
import { submenuList } from './constants';

import './Influencers.scss';

export const Influencers: React.FC = () => {
  const influencers = useSelector(influencersSelector);
  const projectFilterKey = useSelector(projectFilterKeySelector);
  const dispatch = useAppDispatch();

  console.log(influencers);
  useEffect(() => {
    dispatch(fetchInfluencers());
  }, [dispatch]);

  return (
    <div className="Influencers">
      <LoggedInLayout>
        <Submenu menuItems={submenuList} />
        <ProjectFilters />
        <div className="Influencers__wrapper">
          {influencers ? (
            influencers.map(({ id, ...rest }) => (
              <InfluencerCard id={id} key={id} {...rest} />
            ))
          ) : (
            <LoadError />
          )}
        </div>
      </LoggedInLayout>
    </div>
  );
};
