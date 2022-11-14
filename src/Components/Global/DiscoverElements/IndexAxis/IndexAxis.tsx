import { Typography } from '../../Typography';
import styled from 'styled-components';

import './IndexAxis.scss';
import { theme } from 'src/theme';
import { icons } from 'src/utils/icons';
import { calculateRangeWidth } from 'src/utils/calculations';

interface IndexAxisProps {
  rating: number;
  type: 'bull' | 'positive' | 'mover' | 'overall';
  isHalfAxis?: boolean;
  onMouseOver?: () => void;
  onMouseLeave?: () => void;
}

export const IndexAxis: React.FC<IndexAxisProps> = ({
  rating,
  type,
  isHalfAxis = false,
  onMouseLeave,
  onMouseOver,
}) => {
  const isNeutral = rating === 50;

  const isPositive = rating > 50 || isNeutral;

  const rangeWidth = calculateRangeWidth(rating, isHalfAxis);
  const isOverallType = type === 'overall';
  const halfClass = isHalfAxis ? 'half' : '';
  const neutralClass = isNeutral ? 'neutral' : '';
  const negativeClass = isPositive ? '' : 'negative';

  const BULLS = isHalfAxis
    ? [isPositive ? 'bull' : 'bear']
    : ['bear', 'neutral', 'bull'];
  const POSITIVE = isHalfAxis
    ? [isPositive ? 'positive' : 'negative']
    : ['negative', 'neutral', 'positive'];
  const MOVER = isHalfAxis
    ? [isPositive ? 'first mover' : 'reviewer']
    : ['reviewer', 'neutral', 'first mover'];

  const axisData = {
    bull: {
      titles: BULLS,
      iconNegative: icons.bear,
      iconPositive: icons.bulls,
    },
    positive: {
      titles: POSITIVE,
      iconNegative: icons.negative,
      iconPositive: icons.positive,
    },
    mover: {
      titles: MOVER,
      iconNegative: icons.reviewer,
      iconPositive: icons.first_mover,
    },
    overall: {
      titles: POSITIVE,
    },
  };

  return (
    <div
      className={`axis-wrapper ${halfClass}`}
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
    >
      <div className={`icons-wrapper ${halfClass} ${negativeClass}`}>
        {!isOverallType && ((isHalfAxis && !isPositive) || !isHalfAxis) && (
          <img
            src={axisData[type].iconNegative}
            alt={axisData[type].titles[0]}
          />
        )}
        {!isOverallType && ((isHalfAxis && isPositive) || !isHalfAxis) && (
          <img
            src={axisData[type].iconPositive}
            alt={axisData[type].titles[2]}
          />
        )}
      </div>
      <div className="axis">
        <div className={`center-line ${halfClass} ${negativeClass}`} />
        {!isHalfAxis && (
          <div className="range-wrapper">
            <div className={`rating-wrapper negative`}>
              {!isPositive && (
                <Rating isPositive={isPositive} width={rangeWidth}>
                  <div
                    className={`${
                      isOverallType
                        ? `market-rating negative ${neutralClass}`
                        : `circle negative ${neutralClass}`
                    }`}
                  >
                    {isOverallType ? rating : ''}
                  </div>
                </Rating>
              )}
            </div>
            <div className={`rating-wrapper ${halfClass}`}>
              {isPositive && (
                <Rating isPositive={isPositive} width={rangeWidth}>
                  <div
                    className={`${
                      isOverallType
                        ? `market-rating ${neutralClass}`
                        : `circle ${neutralClass}`
                    }`}
                  >
                    {isOverallType ? rating : ''}
                  </div>
                </Rating>
              )}
            </div>
          </div>
        )}
        {isHalfAxis && (
          <div className={`range-wrapper ${negativeClass}`}>
            <div className={`rating-wrapper ${halfClass} ${negativeClass}`}>
              <Rating isPositive={isPositive} width={rangeWidth}>
                <div className={`circle ${halfClass} ${negativeClass}`} />
              </Rating>
            </div>
          </div>
        )}
      </div>
      <div className={`axis-titles ${halfClass}`}>
        {axisData[type].titles.map((item, index) => (
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
