import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { InfluencerCard, ProjectFilters } from 'src/Components/Global';
import { Submenu } from 'src/Components/Global/Submenu';
import { LoggedInLayout } from 'src/Components/layouts/LoggedInLayout';
import { influencersSelector } from 'src/state/reduxstate/projects/selectors';
import { fetchInfluencers } from 'src/state/reduxstate/projects/thunks';
import { useAppDispatch } from 'src/state/reduxstate/store';

import './YourInfluencers.scss';
import { subscribedInfluencersSelector } from 'src/state/reduxstate/user/selectors';
import { Typography } from '@mui/material';
import { forYouSubmenuList } from '../ForYou/ForYou';
import { ProjectFilterKeys } from 'src/state/reduxstate/projects/types';

export const YourInfluencers: React.FC = () => {
  const influencers = useSelector(influencersSelector);
  const dispatch = useAppDispatch();
  const favoriteProjects = useSelector(subscribedInfluencersSelector);
  const [influencersFilter, setInfluencersFilter] = useState<ProjectFilterKeys>(
    ProjectFilterKeys.NONE
  );

  const subscribedInfluencers = influencers.filter((influencer) => {
    return favoriteProjects.some((item) => {
      return item === influencer.id;
    });
  });

  useEffect(() => {
    dispatch(fetchInfluencers());
  }, [dispatch]);

  return (
    <div className="Your-influencers">
      <LoggedInLayout>
        <Submenu menuItems={forYouSubmenuList} />
        <ProjectFilters callBack={setInfluencersFilter} />
        {subscribedInfluencers.length === 0 && (
          <div className="empty-dashboard">
            <Typography>
              Welcome to your dashboard of interest. To add your favorite
              influencers to this page, you need to click on the star icon on
              the Discover subpage.
            </Typography>
          </div>
        )}
        <div className="Your-influencers__wrapper">
          {subscribedInfluencers.length > 0 &&
            subscribedInfluencers.map(({ id, ...rest }) => (
              <InfluencerCard id={id} key={id} {...rest} />
            ))}
        </div>
      </LoggedInLayout>
    </div>
  );
};
