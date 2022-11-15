import { icons } from 'src/utils/icons';
import { Typography } from '../Typography';

import './EmptyChartStateComp.scss';

interface EmptyChartStateCompProps {
  isNoData?: boolean;
}

export const EmptyChartStateComp: React.FC<EmptyChartStateCompProps> = ({
  isNoData,
}) => (
  <div className="empty-chart">
    <img
      src={isNoData ? icons.xmark_square : icons.chart_empty}
      alt="Chart empty"
    />
    <Typography>
      {isNoData
        ? 'Sorry, champ. This project is not available.'
        : 'Select a metric above to render a chart'}
    </Typography>
  </div>
);
