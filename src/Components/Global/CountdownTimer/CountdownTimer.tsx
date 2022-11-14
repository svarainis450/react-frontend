import DateTimeDisplay from './DateTimeDisplay';
import { useCountdown } from 'src/hooks/useCountdown'
import './CountdownTimer.scss'

export const CountdownTimer = ({ targetDate, title} : { targetDate : number, title?: string}) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);
  return (
    <div className="CountdownTimer">
      {title && <p className='CountdownTimer__title'>{title}</p>}

      <div className="CountdownTimer__content">
        <DateTimeDisplay value={days} />
        <p className='CountdownTimer__spacer'>:</p>
        <DateTimeDisplay value={hours} />
        <p className='CountdownTimer__spacer'>:</p>
        <DateTimeDisplay value={minutes} />
        <p className='CountdownTimer__spacer'>:</p>
        <DateTimeDisplay value={seconds} />
      </div>
    </div>
  );
};