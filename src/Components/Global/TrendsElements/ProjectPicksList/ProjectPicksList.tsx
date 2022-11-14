import { useNavigate } from 'react-router-dom';
import { fetchProjectById } from 'src/state/reduxstate/projects/thunks';
import { Project } from 'src/state/reduxstate/projects/types';
import { useAppDispatch } from 'src/state/reduxstate/store';
import { LinkList } from 'src/types';
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
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleGoToForYouPage = (id: number) => {
    if (id) {
      dispatch(fetchProjectById({ id: id })).then(() =>
        navigate(LinkList.FORYOU)
      );
    }
  };
  return (
    <div className="picks-list">
      <div className="picks-list__projects">
        {pickedProjects.map(({ id, img_url, name, type }, index) => (
          <div
            onClick={() => handleGoToForYouPage(id)}
            key={`${id}_${index}`}
            className="picks-list__projects__project"
          >
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
