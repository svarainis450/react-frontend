import { useMediaQuery } from 'src/hooks';
import { ProjectPicks } from 'src/state/reduxstate/projects/types';
import { icons } from 'src/utils/icons';
import { Typography, TypographyWeight } from '../../Typography';
import { CategoryTag } from '../CategoryTag/CategoryTag';

import { ProjectPicksList } from '../ProjectPicksList/ProjectPicksList';
import './ProjectPicksTable.scss';

interface ProjectPicksProps {
  pickedProjects: ProjectPicks[];
}

const HEADLINES = [
  'Influencer',
  'Category',
  'Post count',
  'Channel',
  'Project',
];

export const ProjectPicksTable: React.FC<ProjectPicksProps> = ({
  pickedProjects,
}) => {
  const { isTablet } = useMediaQuery();
  return (
    <div className="project-picks">
      {pickedProjects && <ProjectPicksList pickedProjects={pickedProjects} />}
      {!isTablet && (
        <div className="project-picks__row titles">
          {HEADLINES.map((item) => (
            <Typography key={item} weight={TypographyWeight.BOLD700}>
              {item}
            </Typography>
          ))}
        </div>
      )}
      {pickedProjects &&
        !isTablet &&
        pickedProjects.map(
          ({ name, tagName, tag, channel, projects, postCount }, index) => (
            <div key={index} className="project-picks__row">
              <div className="project-picks__row__influencer">
                <img className="icon" src={icons.coin_base} alt={name} />
                <div>
                  <Typography className="project-picks__row__influencer__tag-name">
                    {tagName}
                  </Typography>
                  <Typography className="project-picks__row__influencer__name">
                    {name}
                  </Typography>
                </div>
              </div>
              <div>
                <CategoryTag tagTitle={tag.name} />
              </div>
              <Typography className="project-picks__row__thin-text__positioned">
                {postCount}
              </Typography>
              <Typography className="project-picks__row__thin-text">
                {channel}
              </Typography>
              <div className="project-picks__row__project">
                <img
                  className="icon"
                  src={icons.coin_base}
                  alt="Project picks"
                />
                <Typography className="project-picks__row__thin-text">
                  {projects && projects.length > 1
                    ? 'Multiple'
                    : projects && projects[0].name}
                </Typography>
              </div>
            </div>
          )
        )}
    </div>
  );
};
