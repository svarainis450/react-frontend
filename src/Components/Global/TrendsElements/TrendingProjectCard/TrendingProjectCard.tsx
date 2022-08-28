import { useNavigate } from 'react-router-dom';
import { fetchProjectById } from 'src/state/reduxstate/projects/thunks';
import { useAppDispatch } from 'src/state/reduxstate/store';
import { LinkList } from 'src/types';
import { Typography, TypographyWeight } from '../../Typography';
import { CategoryTag } from '../CategoryTag/CategoryTag';
import { CategoryTags } from '../types';

import './TrendingProjectCard.scss';

interface ProjectCardProps {
  categoryTitle: CategoryTags;
  projectTitle: string;
  mentions: string;
  rankNumber: number;
  img: string;
  id: number;
}

export const TrendingProjectCard: React.FC<ProjectCardProps> = ({
  categoryTitle,
  projectTitle,
  img,
  mentions,
  id,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleProjectCardNavigation = () => {
    dispatch(fetchProjectById({ id })).then(() => navigate(LinkList.FORYOU));
  };
  return (
    <li className="trending-project-card" onClick={handleProjectCardNavigation}>
      <div className="trending-project-card__flex">
        <img
          className="trending-project-card__icon"
          src={img}
          alt={projectTitle}
        />
        <div>
          <Typography weight={TypographyWeight.MEDIUM}>
            {projectTitle}
          </Typography>
          <Typography
            className="trending-project-card__grey-text"
            weight={TypographyWeight.THIN}
          >
            {mentions}
          </Typography>
        </div>
      </div>
      <CategoryTag tagTitle={categoryTitle} />
    </li>
  );
};
