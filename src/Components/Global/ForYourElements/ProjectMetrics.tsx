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
  const { isTablet } = useMediaQuery();

  return (
    <div className="metrics-wrapper ">
      <div className="metrics-flex">
        <div className="metrics-flex bordered centered larger">
          <div>
            <img
              className="project-icon"
              src={projectByIdProp?.img_url || icons.no_image}
              alt={projectByIdProp?.name}
            />
          </div>
          <div>
            <Typography className="project-title">
              {projectByIdProp?.name}
            </Typography>
            <CategoryTag
              isSmallerTag={isTablet}
              tagTitle={
                // @ts-ignore
                (projectByIdProp && CategoryTags[projectByIdProp?.type]) ||
                CategoryTags.coins
              }
            />
          </div>
        </div>
        <div className="Metrics metrics-flex bordered centered smaller ">
          <div>
            <TalkRateElement
              rate={projectByIdProp?.talk_rate_score}
              type="talk_rate"
            />
          </div>
          <img
            className="metrics-question-mark"
            src={icons.question_mark_grey}
            alt="question mark"
            // onMouseOver={() => setShowInfo(true)}
            // onMouseLeave={() => setShowInfo(false)}
            // onTouchEnd={() => setShowInfo(false)}
            // onClick={() => setShowInfo(true)}
          />
        </div>
        <div className="Metrics metrics-flex bordered centered smaller">
          <div>
            <IndexAxis
              isHalfAxis
              rating={projectByIdProp?.bull_bear_score}
              type="bull"
            />
          </div>
          <img
            className="metrics-question-mark"
            src={icons.question_mark_grey}
            alt="question mark"
            // onMouseOver={() => setShowInfo(true)}
            // onMouseLeave={() => setShowInfo(false)}
            // onTouchEnd={() => setShowInfo(false)}
            // onClick={() => setShowInfo(true)}
          />
        </div>
        <div className="Metrics metrics-flex bordered centered smaller">
          <div>
            <IndexAxis
              isHalfAxis
              rating={projectByIdProp?.sentiment_score}
              type="positive"
            />
          </div>
          <img
            className="metrics-question-mark"
            src={icons.question_mark_grey}
            alt="question mark"
            // onMouseOver={() => setShowInfo(true)}
            // onMouseLeave={() => setShowInfo(false)}
            // onTouchEnd={() => setShowInfo(false)}
            // onClick={() => setShowInfo(true)}
          />
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
