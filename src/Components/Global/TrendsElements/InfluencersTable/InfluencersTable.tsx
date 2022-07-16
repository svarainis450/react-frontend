import { icons } from 'src/utils/icons';
import { TalkRateElement } from '../../TalkRateElement/TalkRateElement';
import { Typography, TypographyWeight } from '../../Typography';
import { CategoryTag } from '../CategoryTag/CategoryTag';
import { CategoryTags } from '../types';
import './InfluencersTable.scss';

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

interface InfluencerData {
  tagName: string;
  name: string;
  img: string;
  followers: number;
  bullseyeIndex: number;
  category: CategoryTags;
  postCount: number;
  channel: string;
  projectName: string;
  projectImg: string;
  linkToPost: string;
}

interface InfluencersTableProps {
  influencersData: InfluencerData[];
}

export const InfluencersTable: React.FC<InfluencersTableProps> = ({
  influencersData,
}) => {
  return (
    <div className="influencers-table">
      <div className="influencers-table__row titles">
        {HEADLINES.map((item, index) => (
          <Typography key={index} weight={TypographyWeight.BOLD700}>
            {item}
          </Typography>
        ))}
      </div>
      {influencersData &&
        influencersData.map(
          ({
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
          }) => (
            <div className="influencers-table__row">
              <div className="influencers-table__row__influencer">
                <img className="icon" src={icons.coin_base} alt={name} />
                <div>
                  <Typography className="influencers-table__row__influencer__tag-name">
                    {tagName}
                  </Typography>
                  <Typography className="influencers-table__row__influencer__name">
                    {name}
                  </Typography>
                </div>
              </div>
              <div className="influencers-table__row__thin-text">
                <Typography>{followers} M</Typography>
              </div>
              <div className="influencers-table__row__bullseye">
                <TalkRateElement rate={84} />
              </div>
              <div>
                <CategoryTag tagTitle={CategoryTags.coins} />
              </div>
              <div className="influencers-table__row__thin-text">
                <Typography>{postCount}</Typography>
              </div>
              <div className="influencers-table__row__thin-text">
                <Typography>{channel}</Typography>
              </div>
              <div className="influencers-table__row__projects">
                <img src={projectImg} alt={projectName} />
                <Typography>{projectName}</Typography>
              </div>
              <div>
                <img src={icons.link_arrow} alt="Link to post" />
              </div>
            </div>
          )
        )}
    </div>
  );
};
