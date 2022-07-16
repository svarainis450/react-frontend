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
}

export const TrendingProjectCard: React.FC<ProjectCardProps> = ({
  categoryTitle,
  projectTitle,
  img,
  mentions,
  rankNumber,
}) => (
  <li className="trending-project-card">
    <Typography
      className="project-card__grey-text"
      weight={TypographyWeight.MEDIUM}
    >
      {`#${rankNumber}`}
    </Typography>
    <img src={img} alt={projectTitle} />
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
