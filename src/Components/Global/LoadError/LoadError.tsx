import { icons } from 'src/utils/icons';
import { Typography } from '../Typography';

import './LoadError.scss';

export const LoadError: React.FC = () => (
  <div className="load-error">
    <img src={icons.loader} alt="Loader logo" />
    <Typography>
      Sorry, champ. Got nothing yet. Give me another hour to gather some data.
    </Typography>
  </div>
);
