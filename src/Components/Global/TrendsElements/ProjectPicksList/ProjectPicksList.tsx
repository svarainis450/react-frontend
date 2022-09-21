import { Project } from 'src/state/reduxstate/projects/types';
import { icons } from 'src/utils/icons';
import { Typography, TypographyWeight } from '../../Typography';
import { CategoryTag } from '../CategoryTag/CategoryTag';
import { CategoryTags } from '../types';
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
        {pickedProjects.map(({ id, img_url, name, type }, index) => (
          <div key={`${id}_${index}`} className="picks-list__projects__project">
            <img
              className="picks-list__projects__project__icon"
              src={img_url || icons.no_image}
              alt="project name"
            />
            <Typography
              className="picks-list__projects__project__title"
              weight={TypographyWeight.MEDIUM}
            >
              {name}
            </Typography>
            {/* @ts-ignore */}
            <CategoryTag tagTitle={CategoryTags[type]} />
          </div>
        ))}
      </div>
    </div>
  );
};
