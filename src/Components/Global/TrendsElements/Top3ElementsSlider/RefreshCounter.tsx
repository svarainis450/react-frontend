import { useState } from 'react';
import CountUp, { useCountUp } from 'react-countup';
import { useTimer } from 'src/hooks';
import { icons } from 'src/utils/icons';

export const RefreshCounter: React.FC = () => {
  const [showInfo, setShowInfo] = useState(false);
  const timer = useTimer(300);

  return (
    <div
      className="top-counter"
      onMouseOver={() => setShowInfo(!showInfo)}
      onMouseLeave={() => setShowInfo(!showInfo)}
    >
      <img className="counter-icon" src={icons.counter} alt="Refresh timer" />
      <CountUp end={5} duration={300} />
      min ago
      {showInfo && (
        <div className="counter-info">
          Next possible update in {timer[1]} min
        </div>
      )}
    </div>
  );
};
