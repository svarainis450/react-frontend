import { icons } from 'src/utils/icons';
import { TalkRateElement } from '../../TalkRateElement/TalkRateElement';
import { Typography, TypographyWeight } from '../../Typography';
import { CategoryTag } from '../CategoryTag/CategoryTag';
import { InfluencerData } from './InfluencersTable';

const HEADLINES = [
  'Influencer',
  'Followers',
  'Bullseye Index',
  'Category',
  'Post count',
  'Channel',
  'Project',
  'Link to post',
];

interface InfluencersTableRowProps {
  influencersData: InfluencerData[];
}

export const InfluencersTableRows: React.FC<InfluencersTableRowProps> = ({
  influencersData,
}) => (
  <div className="influencers-picks__influencers-table">
    <div className="influencers-picks__influencers-table__row titles">
      {HEADLINES.map((item, index) => (
        <Typography key={index} weight={TypographyWeight.BOLD700}>
          {item}
        </Typography>
      ))}
    </div>
    {influencersData &&
      influencersData.map(
        (
          {
            name,
            tagName,
            img,
            followers,
            bullseyeIndex,
            category,
            postCount,
            channel,
            projectImg,
            projectName,
            linkToPost,
          },
          index
        ) => (
          <div
            key={index}
            className="influencers-picks__influencers-table__row"
          >
            <div className="influencers-picks__influencers-table__row__influencer">
              <img className="icon" src={img} alt={name} />
              <div>
                <Typography className="influencers-picks__influencers-table__row__influencer__tag-name">
                  {tagName}
                </Typography>
                <Typography className="influencers-picks__influencers-table__row__influencer__name">
                  {name}
                </Typography>
              </div>
            </div>
            <div className="influencers-picks__influencers-table__row__thin-text">
              <Typography>{followers} M</Typography>
            </div>
            <div className="influencers-picks__influencers-table__row__bullseye">
              <TalkRateElement type="bullseye" rate={bullseyeIndex} />
            </div>
            <div>
              <CategoryTag tagTitle={category} />
            </div>
            <div className="influencers-picks__influencers-table__row__thin-text">
              <Typography>{postCount}</Typography>
            </div>
            <div className="influencers-picks__influencers-table__row__thin-text">
              <Typography>{channel}</Typography>
            </div>
            <div className="influencers-picks__influencers-table__row__projects">
              <img className="icon" src={projectImg} alt={projectName} />
              <Typography>{projectName}</Typography>
            </div>
            <div className="influencers-picks__influencers-table__row__link">
              <img src={icons.link_arrow} alt="Link to post" />
            </div>
          </div>
        )
      )}
  </div>
);
