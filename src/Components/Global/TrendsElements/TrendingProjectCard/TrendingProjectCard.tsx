import { Typography, TypographyWeight } from '../../Typography';
import { CategoryTag } from '../CategoryTag/CategoryTag';
import { CategoryTags } from '../types';

import './TrendingProjectCard.scss';

interface ProjectCardProps {
  categoryTitle: CategoryTags;
  projectTitle: string;
  mentions: string;
}

export const TrendingProjectCard: React.FC<ProjectCardProps> = ({
  categoryTitle,
  projectTitle,
  mentions,
}) => (
  <li className="project-card">
    <Typography
      className="project-card__grey-text"
      weight={TypographyWeight.MEDIUM}
    >
      #1
    </Typography>
    {/* <img/> */}
    <div>
      <Typography weight={TypographyWeight.MEDIUM}>{projectTitle}</Typography>
      <Typography
        className="project-card__grey-text"
        weight={TypographyWeight.THIN}
      >
        {mentions}
      </Typography>
    </div>
    <CategoryTag tagTitle={categoryTitle} />
  </li>
);
