import { CategoryTag } from '../CategoryTag/CategoryTag';
import { CategoryTags } from '../TrendingCategory/types';

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
    <p>#1</p>
    {/* <img/> */}
    <div>
      <p>{projectTitle}</p>
      <p>{mentions}</p>
    </div>
    <CategoryTag tagTitle={categoryTitle} />
  </li>
);
