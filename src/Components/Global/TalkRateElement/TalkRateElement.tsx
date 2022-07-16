import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { theme } from 'src/theme';

import './TalkRateElement.scss';

interface TalkRateProps {
  rate: number;
}

export const TalkRateElement: React.FC<TalkRateProps> = ({ rate }) => {
  const pathColorHandler = (rateVal: number) => {
    if (rateVal > 50) {
      return theme.colors.potatoGreen;
    } else {
      return theme.colors.red;
    }
  };

  return (
    <div className="circluar-wrapper">
      <CircularProgressbar
        styles={buildStyles({
          textSize: '1.25rem',
          textColor: `${theme.colors.black}`,
          pathColor: `${pathColorHandler(rate)}`,
          trailColor: `${theme.colors.grey}`,
        })}
        value={rate}
        text={`${rate}`}
      />
      <p className="talk-rate">Talk rate</p>
    </div>
  );
};
