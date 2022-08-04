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
}

export const IndexAxis: React.FC<IndexAxisProps> = ({
  rating,
  type,
  isHalfAxis = false,
}) => {
  const BULLS = isHalfAxis ? ['bull'] : ['bear', 'neutral', 'bull'];
  const POSITIVE = isHalfAxis
    ? ['positive']
    : ['negative', 'neutral', 'positive'];
  const MOVER = isHalfAxis
    ? ['first mover']
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
  const isNeutral = rating === 50;

  const isPositive = rating > 50 || isNeutral;

  const rangeWidth = calculateRangeWidth(rating);
  const isOverallType = type === 'overall';
  const halfClass = isHalfAxis ? 'half' : '';
  const neutralClass = isNeutral ? 'neutral' : '';

  return (
    <div className={`axis-wrapper ${halfClass}`}>
      <div className={`icons-wrapper ${halfClass}`}>
        {!isHalfAxis && !isOverallType && (
          <img
            src={axisData[type].iconNegative}
            alt={axisData[type].titles[0]}
          />
        )}
        {!isOverallType && (
          <img
            src={axisData[type].iconPositive}
            alt={axisData[type].titles[2]}
          />
        )}
      </div>
      <div className="axis">
        <div className={`center-line ${halfClass}`} />
        <div className="range-wrapper">
          {!isHalfAxis && (
            <div className={`rating-wrapper negative`}>
              {!isPositive && (
                <Rating isPositive={isPositive} width={rangeWidth}>
                  <div
                    className={`${
                      isOverallType
                        ? `market-rating negative ${neutralClass}`
                        : 'circle negative'
                    }`}
                  >
                    {isOverallType ? rating : ''}
                  </div>
                </Rating>
              )}
            </div>
          )}
          <div className={`rating-wrapper ${halfClass}`}>
            {isPositive && (
              <Rating isPositive={isPositive} width={rangeWidth}>
                <div
                  className={`${
                    isOverallType ? `market-rating ${neutralClass}` : 'circle'
                  }`}
                >
                  {isOverallType ? rating : ''}
                </div>
              </Rating>
            )}
          </div>
        </div>
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
