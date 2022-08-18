import { Project } from 'src/state/reduxstate/projects/types';
import { icons } from 'src/utils/icons';
import { IndexAxis } from '../DiscoverElements/IndexAxis/IndexAxis';
import { TalkRateElement } from '../TalkRateElement/TalkRateElement';
import { CategoryTag } from '../TrendsElements/CategoryTag/CategoryTag';
import { Typography, TypographyVariant, TypographyWeight } from '../Typography';
import './ProjectMetrics.scss';

interface ProjectMetricsProps {
  project: Project;
}

export const ProjectMetrics: React.FC<ProjectMetricsProps> = ({ project }) => {
  console.log(project);
  const { img, name, tag, rateData } = project;
  return (
    <div className="metrics-wrapper ">
      <div className="metrics-flex">
        <div className="metrics-flex bordered centered larger">
          <div>
            <img
              className="project-icon"
              src={img || icons.no_image}
              alt={name}
            />
          </div>
          <div>
            <Typography>{name}</Typography>
            <CategoryTag tagTitle={tag.name} />
          </div>
        </div>
        <div className="Metrics metrics-flex bordered centered smaller ">
          <div>
            <TalkRateElement rate={rateData.talkRate} type="talk_rate" />
          </div>
        </div>
        <div className="Metrics metrics-flex bordered centered smaller">
          <div>
            <IndexAxis isHalfAxis rating={rateData.bullRatio} type="bull" />
          </div>
        </div>
        <div className="Metrics metrics-flex bordered centered smaller">
          <div>
            <IndexAxis isHalfAxis rating={rateData.bullRatio} type="positive" />
          </div>
        </div>
        <div className="Metrics metrics-flex bordered centered">
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
