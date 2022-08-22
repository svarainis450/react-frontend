import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'src/hooks';
import { projectByIdSelector } from 'src/state/reduxstate/projects/selectors';
import { fetchProjectById } from 'src/state/reduxstate/projects/thunks';
import { Project } from 'src/state/reduxstate/projects/types';
import { useAppDispatch } from 'src/state/reduxstate/store';
import {
  favoriteProjectsSelector,
  userDataSelector,
  userTokenSelector,
} from 'src/state/reduxstate/user/selectors';
import { getFavProjects } from 'src/state/reduxstate/user/thunks';

import { icons } from 'src/utils/icons';
import { IndexAxis } from '../DiscoverElements/IndexAxis/IndexAxis';
import { TalkRateElement } from '../TalkRateElement/TalkRateElement';
import { CategoryTag } from '../TrendsElements/CategoryTag/CategoryTag';
import { CategoryTags } from '../TrendsElements/types';
import { Typography, TypographyVariant, TypographyWeight } from '../Typography';
import './ProjectMetrics.scss';

interface Props {
  projectByIdProp: number;
}
export const ProjectMetrics: React.FC<Props> = ({ projectByIdProp }) => {
  const dispatch = useAppDispatch();
  const projectById = useSelector(projectByIdSelector);
  const { isTablet } = useMediaQuery();
  const favProjects = useSelector(favoriteProjectsSelector);
  const token = useSelector(userTokenSelector);

  console.log(projectById);

  useEffect(() => {
    dispatch(fetchProjectById({ id: projectByIdProp }));
    if (token) {
      dispatch(getFavProjects({ tokenValue: token }));
    }
  }, [dispatch, projectByIdProp, token]);

  return (
    <div className="metrics-wrapper ">
      <div className="metrics-flex">
        <div className="metrics-flex bordered centered larger">
          <div>
            <img
              className="project-icon"
              src={(projectById && projectById.img) || icons.no_image}
              alt={projectById && projectById.name}
            />
          </div>
          <div>
            <Typography className="project-title">
              {projectById?.name}
            </Typography>
            <CategoryTag
              isSmallerTag={isTablet}
              tagTitle={projectById?.tag?.name || CategoryTags.coins}
            />
          </div>
        </div>
        <div className="Metrics metrics-flex bordered centered smaller ">
          <div>
            <TalkRateElement
              rate={projectById?.rateData?.talkRate}
              type="talk_rate"
            />
          </div>
        </div>
        <div className="Metrics metrics-flex bordered centered smaller">
          <div>
            <IndexAxis
              isHalfAxis
              rating={projectById?.rateData?.bullRatio}
              type="bull"
            />
          </div>
        </div>
        <div className="Metrics metrics-flex bordered centered smaller">
          <div>
            <IndexAxis
              isHalfAxis
              rating={projectById?.rateData.bullRatio}
              type="positive"
            />
          </div>
        </div>
        <div className="Metrics metrics-flex bordered centered prices">
          <Typography
            variant={TypographyVariant.DEFAULT}
            weight={TypographyWeight.MEDIUM}
          >
            1 DOGE
          </Typography>
          <img
            className="exchange-icon"
            src={icons.transfer_arrows}
            alt="exchange rate"
          />
          <Typography className="price-title" weight={TypographyWeight.MEDIUM}>
            $ 0.092
          </Typography>
        </div>
      </div>
    </div>
  );
};
