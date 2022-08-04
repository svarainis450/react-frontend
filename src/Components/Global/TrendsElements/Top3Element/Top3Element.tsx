import { icons } from 'src/utils/icons';
import { IndexAxis } from '../../DiscoverElements/IndexAxis/IndexAxis';
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
  positiveRatio: number;
  bullRatio: number;
  rank: number;
}

export const Top3Element: React.FC<ElementProps> = ({
  rank,
  icon,
  projectName,
  talkRate,
  bullRatio,
  positiveRatio,
  tagTitle,
  blockType,
}) => {
  const visual = {
    [InfoBlockTypes.rate]: <TalkRateElement rate={talkRate} />,
    [InfoBlockTypes.positive]: (
      <IndexAxis isHalfAxis type="positive" rating={positiveRatio} />
    ),
    [InfoBlockTypes.bullish]: (
      <IndexAxis isHalfAxis type="bull" rating={bullRatio} />
    ),
  };
  return (
    <li className="element">
      <div className="element__flex">
        <Typography
          className="element__flex__diff-color"
          weight={TypographyWeight.THIN}
        >{`#${rank}`}</Typography>
        <img
          className="element__flex__icon"
          src={icon || icons.no_image}
          alt={projectName}
        />
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
      <div>{visual[blockType]}</div>
    </li>
  );
};
