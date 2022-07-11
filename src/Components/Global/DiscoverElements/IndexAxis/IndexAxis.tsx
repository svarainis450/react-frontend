import { randomBytes } from 'crypto';
import { useEffect } from 'react';
import { Typography } from '../../Typography';
import './IndexAxis.scss';

interface IndexAxisProps {
  rating: number;
  type: 'bull' | 'positive';
}

const BULLS = ['bear', 'neutral', 'bull'];
const POSITIVE = ['negative', 'neutral', 'positive'];

export const IndexAxis: React.FC<IndexAxisProps> = ({ rating, type }) => {
  const axisTitles = type === 'bull' ? BULLS : POSITIVE;
  const isPositive = rating >= 0;
  const isNegative = rating < 0;
  const positiveElement = document.getElementById('positive');
  const negativeElement = document.getElementById('negative');

  useEffect(() => {
    if (isPositive && positiveElement) {
      positiveElement.style.setProperty('width', `${rating}%`);
    } else if (isNegative && negativeElement) {
      negativeElement.style.setProperty('width', `${Math.abs(rating)}%`);
    }
  }, [rating, isPositive, isNegative, positiveElement, negativeElement]);

  return (
    <div className="axis-wrapper">
      <div className="axis">
        <div className="center-line"></div>
        {isPositive && (
          <div className="rating-wrapper">
            <div id="positive" className="positive-range">
              <div className="circle" />
            </div>
          </div>
        )}
        {isNegative && (
          <div className="rating-wrapper">
            <div id="negative" className="negative-range">
              <div className="circle negative" />
            </div>
          </div>
        )}
      </div>
      <div className="axis-titles">
        {axisTitles.map((item, index) => (
          <Typography key={index}>{item}</Typography>
        ))}
      </div>
    </div>
  );
};
