import { Typography } from '@mui/material';
import { IndexAxis } from '../IndexAxis/IndexAxis';

interface Props {
  sentiment_score: number;
  bull_bear_score: number;
}

export const PositiveBullsBlock: React.FC<Props> = ({
  sentiment_score,
  bull_bear_score,
}) => (
  <>
    <div className="border-wrapper">
      <IndexAxis rating={sentiment_score} type="positive" />
      <Typography className="small-text">
        <strong>Positive v.s. Negative</strong> Index shows how people
        collectively value the project - whether they are more positive or
        negative about the growth of the project
      </Typography>
    </div>
    <div className="border-wrapper">
      <IndexAxis rating={bull_bear_score} type="bull" />
      <Typography className="small-text">
        <strong>Bull v.s. Bear</strong> Index spots whether the project is
        Bullish, meaning is on the rise, or Bearish, meaning it is declining in
        value
      </Typography>
    </div>
  </>
);
