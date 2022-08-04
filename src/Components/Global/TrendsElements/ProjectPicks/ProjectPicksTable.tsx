import { useState } from 'react';
import { useMediaQuery } from 'src/hooks';
import { Project, ProjectPicks } from 'src/state/reduxstate/projects/types';
import { icons } from 'src/utils/icons';
import { idText } from 'typescript';
import { Typography, TypographyWeight } from '../../Typography';
import { CategoryTag } from '../CategoryTag/CategoryTag';

import { ProjectPicksList } from '../ProjectPicksList/ProjectPicksList';
import './ProjectPicksTable.scss';

interface ProjectPicksProps {
  pickedProjects: ProjectPicks[];
  influencerProjects: Project[];
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
  influencerProjects,
}) => {
  const { isTablet } = useMediaQuery();
  const [imgErr, setImgErr] = useState({
    id: null as unknown as number,
    isErr: false,
  });

  return (
    <div className="project-picks">
      {influencerProjects && (
        <ProjectPicksList pickedProjects={influencerProjects} />
      )}
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
          (
            { id, name, tagName, tag, channel, projects, postCount, img },
            index
          ) => {
            return (
              <div key={index} className="project-picks__row">
                <div className="project-picks__row__influencer">
                  <img
                    className="icon"
                    src={imgErr.id === id ? icons.no_image : img}
                    alt={name}
                    onError={() =>
                      setImgErr({
                        id,
                        isErr: true,
                      })
                    }
                  />
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
                    src={
                      projects && projects.length > 0 && projects[0].img
                        ? projects[0].img
                        : icons.no_image
                    }
                    alt="Project picks"
                  />
                  <Typography className="project-picks__row__thin-text">
                    {projects && projects.length > 1
                      ? 'Multiple'
                      : projects && projects.length > 0 && projects[0].name}
                  </Typography>
                </div>
              </div>
            );
          }
        )}
    </div>
  );
};
