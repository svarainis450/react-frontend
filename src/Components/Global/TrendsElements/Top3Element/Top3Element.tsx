import { icons } from 'src/utils/icons';
import { IndexAxis } from '../../DiscoverElements/IndexAxis/IndexAxis';
import { TalkRateElement } from '../../TalkRateElement/TalkRateElement';
import { Typography, TypographyWeight } from '../../Typography';
import { CategoryTag } from '../CategoryTag/CategoryTag';
import { CategoryTags, InfoBlockTypes } from '../types';
import './Top3Element.scss';

interface ElementProps {
  icon: string;
  projectName: string;
  tagTitle: CategoryTags;
  blockType: InfoBlockTypes;
  talkRate?: number;
  positiveRatio?: number;
  bullRatio?: number;
}

export const Top3Element: React.FC<ElementProps> = ({
  icon,
  projectName,
  talkRate,
  bullRatio,
  positiveRatio,
  tagTitle,
  blockType,
}) => {
  const visual = {
    [InfoBlockTypes.rate]: talkRate && <TalkRateElement rate={talkRate} />,
    [InfoBlockTypes.positive]: positiveRatio && (
      <IndexAxis isHalfAxis type="positive" rating={positiveRatio} />
    ),
    [InfoBlockTypes.bullish]: bullRatio && (
      <IndexAxis isHalfAxis type="bull" rating={bullRatio} />
    ),
  };
  return (
    <li className="element">
      <div className="element__flex">
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
          {/* NOTE: changed BE logic. need to rethink this component. quick decision */}
          {/* @ts-ignore */}
          <CategoryTag tagTitle={CategoryTags[tagTitle]} />
        </div>
      </div>
      <div>{visual[blockType]}</div>
    </li>
  );
};
