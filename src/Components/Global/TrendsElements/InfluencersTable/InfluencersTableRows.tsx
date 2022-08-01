import { Influencer, tags } from 'src/state/reduxstate/projects/types';
import { calculateFollowers } from 'src/utils/calculations';
import { icons } from 'src/utils/icons';
import { TalkRateElement } from '../../TalkRateElement/TalkRateElement';
import { Typography, TypographyWeight } from '../../Typography';
import { CategoryTag } from '../CategoryTag/CategoryTag';

const HEADLINES = [
  'Influencer',
  'Followers',
  'Bullseye Index',
  'Category',
  'Post count',
  'Channel',
  'Project',
];

interface InfluencersTableRowProps {
  influencersData: Influencer[];
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
            bullseye,
            postCount,
            channel,
            projects,
            tag,
          },
          index
        ) => (
          <div
            key={index}
            className="influencers-picks__influencers-table__row"
          >
            <div className="influencers-picks__influencers-table__row__influencer">
              <img
                className="icon"
                src={img || icons.no_image}
                alt={name || 'project'}
              />
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
              <Typography>{calculateFollowers(followers)}</Typography>
            </div>
            <div className="influencers-picks__influencers-table__row__bullseye">
              <TalkRateElement type="bullseye" rate={bullseye} />
            </div>
            <div>
              <CategoryTag tagTitle={tag.name} />
            </div>
            <div className="influencers-picks__influencers-table__row__thin-text">
              <Typography>{postCount}</Typography>
            </div>
            <div className="influencers-picks__influencers-table__row__thin-text">
              <Typography>{channel}</Typography>
            </div>
            <div className="influencers-picks__influencers-table__row__projects">
              <img
                className="icon"
                src={
                  (projects && projects.length > 0 && projects[0].img) ||
                  icons.no_image
                }
                alt={
                  (projects && projects.length > 0 && projects[0].name) || ''
                }
              />
              <Typography>
                {(projects && projects.length > 0 && projects[0].name) ||
                  'none'}
              </Typography>
            </div>
            {/* TODO: LINk TO POSt */}
            {/* <div className="influencers-picks__influencers-table__row__link">
              <img src={icons.link_arrow} alt="Link to post" />
            </div> */}
          </div>
        )
      )}
  </div>
);
