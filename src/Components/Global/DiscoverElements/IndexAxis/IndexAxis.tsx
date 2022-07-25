import { Typography } from '../../Typography';
import styled from 'styled-components';

import './IndexAxis.scss';
import { theme } from 'src/theme';
import { icons } from 'src/utils/icons';

interface IndexAxisProps {
  rating: number;
  type: 'bull' | 'positive' | 'mover';
}

const BULLS = ['bear', 'neutral', 'bull'];
const POSITIVE = ['negative', 'neutral', 'positive'];
const MOVER = ['reviewer', 'neutral', 'first mover'];

export const IndexAxis: React.FC<IndexAxisProps> = ({ rating, type }) => {
  const isBullType = type === 'bull';
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
  };
  const isPositive = rating >= 0;
  const rangeWidth = isPositive ? rating : Math.abs(rating);

  return (
    <div className="axis-wrapper">
      <div className="icons-wrapper">
        <img src={axisData[type].iconNegative} alt={axisData[type].titles[0]} />
        <img src={axisData[type].iconPositive} alt={axisData[type].titles[2]} />
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
