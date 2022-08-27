import { useSelector } from 'react-redux';
import { useMediaQuery } from 'src/hooks';
import { projectByIdSelector } from 'src/state/reduxstate/projects/selectors';
import { Project } from 'src/state/reduxstate/projects/types';

import { icons } from 'src/utils/icons';
import { IndexAxis } from '../DiscoverElements/IndexAxis/IndexAxis';
import { TalkRateElement } from '../TalkRateElement/TalkRateElement';
import { CategoryTag } from '../TrendsElements/CategoryTag/CategoryTag';
import { CategoryTags } from '../TrendsElements/types';
import { Typography, TypographyVariant, TypographyWeight } from '../Typography';
import './ProjectMetrics.scss';

interface Props {
  projectByIdProp: Project;
}
export const ProjectMetrics: React.FC<Props> = ({ projectByIdProp }) => {
  const projectById = useSelector(projectByIdSelector);
  const { isTablet } = useMediaQuery();

  console.log(projectByIdProp);

  return (
    <div className="metrics-wrapper ">
      <div className="metrics-flex">
        <div className="metrics-flex bordered centered larger">
          <div>
            <img
              className="project-icon"
              src={
                (projectById && projectById.img) ||
                (!projectById && projectByIdProp.img) ||
                icons.no_image
              }
              alt={(projectById && projectById.name) || projectByIdProp.name}
            />
          </div>
          <div>
            <Typography className="project-title">
              {(projectById && projectById.name) || projectByIdProp.name}
            </Typography>
            <CategoryTag
              isSmallerTag={isTablet}
              tagTitle={
                (projectById && projectById.tag.name) || CategoryTags.coins
              }
            />
          </div>
        </div>
        <div className="Metrics metrics-flex bordered centered smaller ">
          <div>
            <TalkRateElement
              rate={
                (projectById && projectById.rateData.talkRate) ||
                projectByIdProp.rateData.talkRate
              }
              type="talk_rate"
            />
          </div>
        </div>
        <div className="Metrics metrics-flex bordered centered smaller">
          <div>
            <IndexAxis
              isHalfAxis
              rating={
                (projectById && projectById.rateData.bullRatio) ||
                projectByIdProp.rateData.bullRatio
              }
              type="bull"
            />
          </div>
        </div>
        <div className="Metrics metrics-flex bordered centered smaller">
          <div>
            <IndexAxis
              isHalfAxis
              rating={
                (projectById && projectById.rateData.bullRatio) ||
                projectByIdProp.rateData.bullRatio
              }
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
