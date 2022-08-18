import { Project } from 'src/state/reduxstate/projects/types';
import { icons } from 'src/utils/icons';
import { CategoryTag } from '../TrendsElements/CategoryTag/CategoryTag';
import { Typography } from '../Typography';
import './ForYouListItem.scss';

interface ForYouListItemProps {
  project: Project;
}

export const ForYouListItem: React.FC<ForYouListItemProps> = ({ project }) => {
  const { img, name, tag, rateData } = project;
  const isInFavList = true;

  return (
    <div className="for-you-list-item">
      <div className="flex-wrapper">
        <div>
          <img
            className="project-icon"
            src={img || icons.no_image}
            alt={name}
          />
        </div>
        <div>
          <Typography className="project-name">{name}</Typography>
          <CategoryTag tagTitle={tag.name} />
        </div>
      </div>
      <div className="buttons-wrapper">
        <button className="check-stats-btn remove">
          <img
            src={isInFavList ? icons.remove : icons.add_to_list}
            alt="remove or add butn"
          />
          {isInFavList ? 'Remove' : 'Add to your list'}
        </button>
        <button className="check-stats-btn">Check stats</button>
      </div>
    </div>
  );
};
