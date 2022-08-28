import { Typography } from '../Typography';
import './InfoBlockInstructions.scss';

export const InfoBlockInstructions: React.FC = () => {
  return (
    <div className="instructions">
      <Typography>
        To add projects to this list, click on the star icon on the Discover
        page or add directly from the list below.
      </Typography>
    </div>
  );
};
