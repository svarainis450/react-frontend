import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'src/hooks';
import { fetchInfluencerByName } from 'src/state/reduxstate/influencers/thunks';
import { Influencer } from 'src/state/reduxstate/influencers/types';
import { Project } from 'src/state/reduxstate/projects/types';
import { useAppDispatch } from 'src/state/reduxstate/store';
import { LinkList } from 'src/types';
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
  const dispatch = useAppDispatch();
  const { isTablet } = useMediaQuery();
  const navigate = useNavigate();

  const handleGetInfluencerByName = (name: string) => {
    dispatch(fetchInfluencerByName({ name })).then(() =>
      navigate(LinkList.INFLUENCERS)
    );
  };

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
                <div
                  className="project-picks__row__influencer"
                  onClick={() => handleGetInfluencerByName(twitter_user.name)}
                >
                  <img
                    className="icon"
                    src={twitter_user.twitter_img_url || icons.no_image}
                    alt={twitter_user.name}
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null; // prevents looping
                      currentTarget.src = icons.no_image;
                    }}
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
                            className="project-picks__row__project__overlapping-images"
                            key={index}
                            src={item.img_url || icons.no_image}
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
