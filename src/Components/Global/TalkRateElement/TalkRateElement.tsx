import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { theme } from 'src/theme';
import { pathColorHandler } from 'src/utils/styleHelpers';

import './TalkRateElement.scss';

interface TalkRateProps {
  rate: number;
  type?: 'talk_rate' | 'bullseye' | 'influence';
  isBiggerBullseye?: boolean;
}

export const TalkRateElement: React.FC<TalkRateProps> = ({
  rate,
  type = 'talk_rate',
  isBiggerBullseye = false,
}) => {
  const title = {
    talk_rate: 'Talk Rate',
    bullseye: 'Bullseye',
    influence: 'Influence',
  };

  return (
    <div
      className={`circluar-wrapper ${type === 'bullseye' ? type : ''} ${
        isBiggerBullseye ? 'bigger' : ''
      }`}
    >
      <CircularProgressbar
        styles={buildStyles({
          textSize: isBiggerBullseye ? '1.5rem' : '1.20rem',
          textColor: `${theme.colors.black}`,
          pathColor: `${pathColorHandler(rate)}`,
          trailColor: `${theme.colors.grey}`,
        })}
        value={rate}
        text={`${rate}`}
      />
      <p className={`talk-rate ${type !== 'talk_rate' ? 'bullseye' : ''}`}>
        {title[type]}
      </p>
    </div>
  );
};
