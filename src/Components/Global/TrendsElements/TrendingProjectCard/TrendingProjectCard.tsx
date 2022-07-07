import { Typography, TypographyWeight } from '../../Typography';
import { CategoryTag } from '../CategoryTag/CategoryTag';
import { CategoryTags } from '../types';

import './TrendingProjectCard.scss';

interface ProjectCardProps {
  categoryTitle: CategoryTags;
  projectTitle: string;
  mentions: string;
  rankNumber: number;
}

export const TrendingProjectCard: React.FC<ProjectCardProps> = ({
  categoryTitle,
  projectTitle,
  mentions,
  rankNumber,
}) => (
  <li className="project-card">
    <Typography
      className="project-card__grey-text"
      weight={TypographyWeight.MEDIUM}
    >
      {`#${rankNumber}`}
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
