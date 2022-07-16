import { Typography } from '@mui/material';
import { RateData } from 'src/state/reduxstate/projects/types';
import { IndexAxis } from '../IndexAxis/IndexAxis';

interface Props {
  rateData: RateData;
}

export const PositiveBullsBlock: React.FC<Props> = ({ rateData }) => (
  <>
    <div className="border-wrapper">
      <IndexAxis rating={rateData.positiveRatio} type="positive" />
      <Typography className="small-text">
        <strong>Positive v.s. Negative</strong> Index shows how people
        collectively value the project - whether they are more positive or
        negative about the growth of the project
      </Typography>
    </div>
    <div className="border-wrapper">
      <IndexAxis rating={rateData.bullRatio} type="bull" />
      <Typography className="small-text">
        <strong>Bull v.s. Bear</strong> Index spots whether the project is
        Bullish, meaning is on the rise, or Bearish, meaning it is declining in
        value
      </Typography>
    </div>
  </>
);
