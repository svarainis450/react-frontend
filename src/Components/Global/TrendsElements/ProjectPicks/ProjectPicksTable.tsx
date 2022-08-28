import { useState } from 'react';
import { useMediaQuery } from 'src/hooks';
import { Project, ProjectPicks } from 'src/state/reduxstate/projects/types';
import { generateProjectsText } from 'src/utils/calculations';
import { icons } from 'src/utils/icons';
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
                    src={img || icons.no_image}
                    alt={name}
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
                  <div className="project-picks__row__project__overlapping-images">
                    {projects &&
                      projects.length > 0 &&
                      projects.slice(0, 3).map((item) => {
                        return (
                          <img
                            src={item.img || icons.no_image}
                            alt={item.name}
                          />
                        );
                      })}
                  </div>
                  <Typography className="project-picks__row__thin-text">
                    {generateProjectsText(projects)}
                  </Typography>
                </div>
              </div>
            );
          }
        )}
    </div>
  );
};
