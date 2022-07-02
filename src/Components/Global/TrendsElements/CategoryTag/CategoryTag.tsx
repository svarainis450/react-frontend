import { CategoryTags } from '../TrendingCategory/types';
import './CategoryTag.scss';

interface TagProps {
  tagTitle: CategoryTags;
}

export const CategoryTag: React.FC<TagProps> = ({ tagTitle }) => (
  <div className={`Tag ${tagTitle}`}>
    <p className="Tag__text">{tagTitle}</p>
  </div>
);
