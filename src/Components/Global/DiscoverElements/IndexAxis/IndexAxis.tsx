import { Typography } from '../../Typography';
import styled from 'styled-components';

import './IndexAxis.scss';
import { theme } from 'src/theme';
import { icons } from 'src/utils/icons';

interface IndexAxisProps {
  rating: number;
  type: 'bull' | 'positive';
}

const BULLS = ['bear', 'neutral', 'bull'];
const POSITIVE = ['negative', 'neutral', 'positive'];

export const IndexAxis: React.FC<IndexAxisProps> = ({ rating, type }) => {
  const isBullType = type === 'bull';
  const axisTitles = isBullType ? BULLS : POSITIVE;
  const isPositive = rating >= 0;
  const rangeWidth = isPositive ? rating : Math.abs(rating);

  return (
    <div className="axis-wrapper">
      <div className="icons-wrapper">
        <img
          src={isBullType ? icons.bear : icons.negative}
          alt={isBullType ? 'Bears' : 'Negative'}
        />
        <img
          src={isBullType ? icons.bulls : icons.positive}
          alt={isBullType ? 'Bulls' : 'Positive'}
        />
      </div>
      <div className="axis">
        <div className="center-line" />
        <div className="range-wrapper">
          <div className="rating-wrapper negative">
            {!isPositive && (
              <Rating isPositive={isPositive} width={rangeWidth}>
                <div className="circle negative" />
              </Rating>
            )}
          </div>
          <div className="rating-wrapper">
            {isPositive && (
              <Rating isPositive={isPositive} width={rangeWidth}>
                <div className="circle" />
              </Rating>
            )}
          </div>
        </div>
      </div>
      <div className="axis-titles">
        {axisTitles.map((item, index) => (
          <Typography key={index}>{item}</Typography>
        ))}
      </div>
    </div>
  );
};
interface RatingProps {
  isPositive: boolean;
  width?: number;
}

const Rating = styled.div<RatingProps>`
  position: relative;
  height: 4px;
  width: ${({ width }) => `${width}%` || '100%'};
  background: ${({ isPositive }) =>
    isPositive ? theme.colors.potatoGreen : theme.colors.red};
`;
