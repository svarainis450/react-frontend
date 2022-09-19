import { useState } from 'react';
import { useMediaQuery } from 'src/hooks';
import { Influencer } from 'src/state/reduxstate/influencers/types';
import { Project, ProjectPicks } from 'src/state/reduxstate/projects/types';
import {
  calculateBigNumberValues,
  generateProjectsText,
} from 'src/utils/calculations';
import { icons } from 'src/utils/icons';
import { Typography, TypographyWeight } from '../../Typography';
import { CategoryTag } from '../CategoryTag/CategoryTag';

import { ProjectPicksList } from '../ProjectPicksList/ProjectPicksList';
import { CategoryTags } from '../types';
import './ProjectPicksTable.scss';

interface ProjectPicksProps {
  pickedProjects: Influencer[];
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

  console.log(pickedProjects);

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
          ({ twitter_user, category, post_count, channel, project }, index) => {
            return (
              <div key={index} className="project-picks__row">
                <div className="project-picks__row__influencer">
                  <img
                    className="icon"
                    src={twitter_user.twitter_img_url || icons.no_image}
                    alt={twitter_user.name}
                  />
                  <div>
                    <Typography className="project-picks__row__influencer__tag-name">
                      {twitter_user.twitter_displayname}
                    </Typography>
                    <Typography className="project-picks__row__influencer__name">
                      {twitter_user.twitter_username}
                    </Typography>
                  </div>
                </div>
                <div>
                  {/* @ts-ignore */}
                  <CategoryTag tagTitle={CategoryTags[category]} />
                </div>
                <Typography className="project-picks__row__thin-text__positioned">
                  {calculateBigNumberValues(post_count)}
                </Typography>
                <Typography className="project-picks__row__thin-text">
                  {channel}
                </Typography>
                <div className="project-picks__row__project">
                  <div className="project-picks__row__project__overlapping-images">
                    {project &&
                      project.length > 0 &&
                      project.slice(0, 3).map((item, index) => {
                        return (
                          <img
                            key={index}
                            src={item.img || icons.no_image}
                            alt={item.name}
                          />
                        );
                      })}
                  </div>
                  <Typography className="project-picks__row__thin-text">
                    {generateProjectsText(project)}
                  </Typography>
                </div>
              </div>
            );
          }
        )}
    </div>
  );
};
