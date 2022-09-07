import { Loader } from '../Loader/Loader';
import { Typography } from '../Typography';

import './LoadError.scss';

export const LoadError: React.FC = () => (
  <div className="load-error">
    <Loader height={54} width={54} />
    <Typography>
      Sorry, champ. Got nothing yet. Give me another hour to gather some data.
    </Typography>
  </div>
);
