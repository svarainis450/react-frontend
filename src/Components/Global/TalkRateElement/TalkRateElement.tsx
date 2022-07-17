import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { theme } from 'src/theme';

import './TalkRateElement.scss';

interface TalkRateProps {
  rate: number;
  type?: 'talk-rate' | 'bullseye';
}

export const TalkRateElement: React.FC<TalkRateProps> = ({
  rate,
  type = 'talk-rate',
}) => {
  const pathColorHandler = (rateVal: number) => {
    if (rateVal < 50 && type !== 'bullseye') {
      return theme.colors.red;
    } else {
      return theme.colors.potatoGreen;
    }
  };

  return (
    <div className={`circluar-wrapper ${type === 'bullseye' ? type : ''}`}>
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
      {type === 'talk-rate' ? (
        <p className="talk-rate">Talk rate</p>
      ) : (
        <p className="talk-rate bullseye">Bullseye</p>
      )}
    </div>
  );
};
