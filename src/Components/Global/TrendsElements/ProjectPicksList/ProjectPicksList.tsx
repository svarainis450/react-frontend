import { ProjectPicks } from 'src/state/reduxstate/projects/types';
import { icons } from 'src/utils/icons';
import { Typography, TypographyWeight } from '../../Typography';
import { CategoryTag } from '../CategoryTag/CategoryTag';
import { CategoryTags } from '../types';
import './ProjectPicksList.scss';

interface ProjectPicksListProps {
  pickedProjects: ProjectPicks[];
}

export const ProjectPicksList: React.FC<ProjectPicksListProps> = ({
  pickedProjects,
}) => {
  const demoArray = [0, 1, 2, 3, 4];
  return (
    <div className="picks-list">
      <div className="picks-list__projects">
        {demoArray.slice(0, 5).map((_, idx) => (
          <div key={idx} className="picks-list__projects__project">
            <div className="picks-list__projects__project__flex">
              <Typography>#1</Typography>
              <img src={icons.coin_base} alt="project name" />
            </div>
            <Typography
              className="picks-list__projects__project__title"
              weight={TypographyWeight.MEDIUM}
            >
              Etherium
            </Typography>
            <CategoryTag tagTitle={CategoryTags.coins} />
          </div>
        ))}
      </div>
    </div>
  );
};
