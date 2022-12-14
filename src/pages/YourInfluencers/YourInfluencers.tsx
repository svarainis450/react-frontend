import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { InfluencerCard, InfluencerFilters } from "src/Components/Global";
import { Submenu } from "src/Components/Global/Submenu";
import { LoggedInLayout } from "src/Components/layouts/LoggedInLayout";
import { useAppDispatch } from "src/state/reduxstate/store";

import "./YourInfluencers.scss";
import { subscribedInfluencersSelector } from "src/state/reduxstate/user/selectors";
import { Typography } from "@mui/material";
import { forYouSubmenuList } from "../ForYou/ForYou";
import { InfluencerFilterKeys } from "src/state/reduxstate/projects/types";
import { getFavInfluencers } from "src/state/reduxstate/user/thunks";

const YourInfluencers: React.FC = () => {
  const dispatch = useAppDispatch();
  const subscribedInfluencers = useSelector(subscribedInfluencersSelector);
  const [influencersFilter, setInfluencersFilter] =
    useState<InfluencerFilterKeys>(InfluencerFilterKeys.NONE);

  useEffect(() => {
    dispatch(getFavInfluencers());
  }, []);

  return (
    <div className="Your-influencers">
      <LoggedInLayout>
        <Submenu menuItems={forYouSubmenuList} pageTitleMob="For You" />
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
            subscribedInfluencers.map(({ ...rest }, index) => (
              <InfluencerCard key={index} {...rest} />
            ))}
        </div>
      </LoggedInLayout>
    </div>
  );
};

export default YourInfluencers;
