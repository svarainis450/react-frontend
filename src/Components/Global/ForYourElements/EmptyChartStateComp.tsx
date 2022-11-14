import { icons } from 'src/utils/icons';
import { Typography } from '../Typography';

import './EmptyChartStateComp.scss';

export const EmptyChartStateComp: React.FC = () => (
  <div className="empty-chart">
    <img src={icons.chart_empty} alt="Chart epmty" />
    <Typography>Select a metric above to render a chart</Typography>
  </div>
);
