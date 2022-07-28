import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  InfluencerCard,
  LoadError,
  ProjectFilters,
} from 'src/Components/Global';
import { Submenu } from 'src/Components/Global/Submenu';
import { LoggedInLayout } from 'src/Components/layouts/LoggedInLayout';
import { influencersSelector } from 'src/state/reduxstate/projects/selectors';
import { fetchInfluencers } from 'src/state/reduxstate/projects/thunks';
import { ProjectFilterKeys } from 'src/state/reduxstate/projects/types';
import { useAppDispatch } from 'src/state/reduxstate/store';
import { submenuList } from '../Discover/Discover';

import './Influencers.scss';

export const Influencers: React.FC = () => {
  const influencers = useSelector(influencersSelector);
  const dispatch = useAppDispatch();
  const [influencersFilter, setInfluencersFilter] = useState<ProjectFilterKeys>(
    ProjectFilterKeys.NONE
  );

  console.log(influencers);
  useEffect(() => {
    dispatch(fetchInfluencers());
  }, [dispatch]);

  return (
    <div className="Influencers">
      <LoggedInLayout>
        <Submenu menuItems={submenuList} />
        <ProjectFilters callBack={setInfluencersFilter} />
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
