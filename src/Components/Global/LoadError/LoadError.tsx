import { Loader } from '../Loader/Loader';
import { Typography } from '../Typography';

import './LoadError.scss';

export const LoadError: React.FC = () => (
  <div className="load-error">
    <Loader height={54} width={54} />
    <Typography>Give me a sec to load all the projects for you.</Typography>
  </div>
);
