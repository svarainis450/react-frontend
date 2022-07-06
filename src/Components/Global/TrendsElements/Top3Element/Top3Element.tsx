import { icons } from 'src/utils/icons';
import { images } from 'src/utils/images';
import { Typography, TypographyWeight } from '../../Typography';
import { CategoryTag } from '../CategoryTag/CategoryTag';
import { CategoryTags } from '../types';
import './Top3Element.scss';

interface ElementProps {
  id: number;
  icon: string;
  projectName: string;
  tagTitle: CategoryTags;
  talkRate: string;
}

export const Top3Element: React.FC<ElementProps> = ({
  id,
  icon,
  projectName,
  talkRate,
  tagTitle,
}) => (
  <li className="element">
    <Typography
      className="element__diff-color"
      weight={TypographyWeight.THIN}
    >{`#${id}`}</Typography>
    <img
      className="element__icon"
      src={images[icon as keyof typeof images]}
      alt={projectName}
    />
    <div>
      <Typography className="project-title" weight={TypographyWeight.MEDIUM}>
        {projectName}
      </Typography>
      <CategoryTag tagTitle={tagTitle} />
    </div>
    <div>{talkRate}</div>
  </li>
);
