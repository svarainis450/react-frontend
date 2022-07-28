import { icons } from 'src/utils/icons';
import { TalkRateElement } from '../../TalkRateElement/TalkRateElement';
import { Typography, TypographyWeight } from '../../Typography';
import { CategoryTag } from '../CategoryTag/CategoryTag';
import { CategoryTags, InfoBlockTypes } from '../types';
import './Top3Element.scss';

interface ElementProps {
  id: number;
  icon: string;
  projectName: string;
  tagTitle: CategoryTags;
  talkRate: number;
  blockType: InfoBlockTypes;
}

export const Top3Element: React.FC<ElementProps> = ({
  id,
  icon,
  projectName,
  talkRate,
  tagTitle,
  blockType,
}) => {
  const visual = {
    [InfoBlockTypes.rate]: <TalkRateElement rate={talkRate} />,
    [InfoBlockTypes.positive]: (
      <img src={icons.positive_element} alt="Positive project" />
    ),
    [InfoBlockTypes.bullish]: (
      <img src={icons.bull_element} alt="Bull project" />
    ),
  };
  return (
    <li className="element">
      <div className="element__flex">
        <Typography
          className="element__flex__diff-color"
          weight={TypographyWeight.THIN}
        >{`#${id}`}</Typography>
        <img className="element__flex__icon" src={icon} alt={projectName} />
        <div>
          <Typography
            className="project-title"
            weight={TypographyWeight.MEDIUM}
          >
            {projectName}
          </Typography>
          <CategoryTag tagTitle={tagTitle} />
        </div>
      </div>
      <>{visual[blockType]}</>
    </li>
  );
};
