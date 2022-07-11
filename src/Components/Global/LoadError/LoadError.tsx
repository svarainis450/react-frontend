import { icons } from 'src/utils/icons';
import { Typography } from '../Typography';

export const LoadError: React.FC = () => (
  <div>
    <img src={icons.loader} alt="Loader logo" />
    <Typography>
      Sorry, champ. Got nothing yet. Give me another hour to gather some data.
    </Typography>
  </div>
);
