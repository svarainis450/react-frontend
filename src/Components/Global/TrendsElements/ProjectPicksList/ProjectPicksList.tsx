import { Project } from 'src/state/reduxstate/projects/types';
import { icons } from 'src/utils/icons';
import { Typography, TypographyWeight } from '../../Typography';
import { CategoryTag } from '../CategoryTag/CategoryTag';
import './ProjectPicksList.scss';

interface ProjectPicksListProps {
  pickedProjects: Project[];
}

export const ProjectPicksList: React.FC<ProjectPicksListProps> = ({
  pickedProjects,
}) => {
  return (
    <div className="picks-list">
      <div className="picks-list__projects">
        {pickedProjects.map(({ id, img, name, tag }, index) => (
          <div key={id} className="picks-list__projects__project">
            <div className="picks-list__projects__project__flex">
              <Typography>#{index + 1}</Typography>
              <img src={img || icons.no_image} alt="project name" />
            </div>
            <Typography
              className="picks-list__projects__project__title"
              weight={TypographyWeight.MEDIUM}
            >
              {name}
            </Typography>
            <CategoryTag tagTitle={tag.name} />
          </div>
        ))}
      </div>
    </div>
  );
};
