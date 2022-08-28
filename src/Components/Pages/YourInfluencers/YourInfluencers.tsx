import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { InfluencerCard, InfluencerFilters } from 'src/Components/Global';
import { Submenu } from 'src/Components/Global/Submenu';
import { LoggedInLayout } from 'src/Components/layouts/LoggedInLayout';
import { influencersSelector } from 'src/state/reduxstate/projects/selectors';
import { fetchInfluencers } from 'src/state/reduxstate/projects/thunks';
import { useAppDispatch } from 'src/state/reduxstate/store';

import './YourInfluencers.scss';
import { subscribedInfluencersSelector } from 'src/state/reduxstate/user/selectors';
import { Typography } from '@mui/material';
import { forYouSubmenuList } from '../ForYou/ForYou';
import {
  InfluencerFilterKeys,
  ProjectFilterKeys,
  Statuses,
} from 'src/state/reduxstate/projects/types';
import { getFavInfluencers } from 'src/state/reduxstate/user/thunks';

export const YourInfluencers: React.FC = () => {
  const dispatch = useAppDispatch();
  const influencers = useSelector(influencersSelector);
  const subscribedInfluencers = useSelector(subscribedInfluencersSelector);
  const [influencersFilter, setInfluencersFilter] =
    useState<InfluencerFilterKeys>(InfluencerFilterKeys.NONE);

  useEffect(() => {
    dispatch(getFavInfluencers());
  }, []);

  return (
    <div className="Your-influencers">
      <LoggedInLayout>
        <Submenu menuItems={forYouSubmenuList} />
        {/* TODO: waiting for backend post request */}
        {/* <InfluencerFilters callBack={setInfluencersFilter} /> */}
        {(!subscribedInfluencers || subscribedInfluencers.length === 0) && (
          <div className="empty-dashboard">
            <Typography>
              Welcome to your dashboard of interest. To add your favorite
              influencers to this page, you need to click on the star icon on
              the Discover subpage.
            </Typography>
          </div>
        )}
        <div className="Your-influencers__wrapper">
          {subscribedInfluencers?.length > 0 &&
            subscribedInfluencers.map(({ id, ...rest }) => (
              <InfluencerCard id={id} key={id} {...rest} />
            ))}
        </div>
      </LoggedInLayout>
    </div>
  );
};
