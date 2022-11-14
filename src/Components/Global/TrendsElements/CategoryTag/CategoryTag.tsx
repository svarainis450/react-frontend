import { CategoryTags } from '../types';
import './CategoryTag.scss';

interface TagProps {
  tagTitle: CategoryTags;
  isSmallerTag?: boolean;
  isCaptionSizeTag?: boolean;
}

export const CategoryTag: React.FC<TagProps> = ({
  tagTitle,
  isSmallerTag,
  isCaptionSizeTag,
}) => (
  <div
    className={`Tag ${tagTitle} ${isSmallerTag ? 'smaller-tag' : ''} ${
      isCaptionSizeTag ? 'caption-tag' : ''
    }`}
  >
    <p className="Tag__text">{tagTitle}</p>
  </div>
);
