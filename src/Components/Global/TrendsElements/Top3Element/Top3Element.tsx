import { useNavigate } from 'react-router-dom';
import { fetchProjectById } from 'src/state/reduxstate/projects/thunks';
import { useAppDispatch } from 'src/state/reduxstate/store';
import { LinkList } from 'src/types';
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
  project_id?: number;
}

export const Top3Element: React.FC<ElementProps> = ({
  icon,
  projectName,
  talkRate,
  bullRatio,
  positiveRatio,
  tagTitle,
  blockType,
  project_id,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const visual = {
    [InfoBlockTypes.rate]: talkRate && <TalkRateElement rate={talkRate} />,
    [InfoBlockTypes.positive]: (positiveRatio || positiveRatio === 0) && (
      <IndexAxis isHalfAxis type="positive" rating={positiveRatio} />
    ),
    [InfoBlockTypes.bullish]: (bullRatio || bullRatio === 0) && (
      <IndexAxis isHalfAxis type="bull" rating={bullRatio} />
    ),
  };

  const handleGoToForYouPage = () => {
    if (project_id) {
      dispatch(fetchProjectById({ id: project_id })).then(() =>
        navigate(LinkList.FORYOU)
      );
    }
  };

  return (
    <li className="element" onClick={handleGoToForYouPage}>
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
            {projectName.substring(0, 20)}
            {projectName.length >= 20 && '...'}
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
