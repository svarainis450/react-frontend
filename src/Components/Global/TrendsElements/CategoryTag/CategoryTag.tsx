import { CategoryTags } from '../types';
import './CategoryTag.scss';

interface TagProps {
  tagTitle: CategoryTags;
  isSmallerTag?: boolean;
}

export const CategoryTag: React.FC<TagProps> = ({ tagTitle, isSmallerTag }) => (
  <div className={`Tag ${tagTitle} ${isSmallerTag ? 'smaller-tag' : ''}`}>
    <p className="Tag__text">{tagTitle}</p>
  </div>
);
