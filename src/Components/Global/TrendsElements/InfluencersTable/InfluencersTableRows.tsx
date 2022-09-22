import { useEffect, useState } from 'react';
import { Influencer } from 'src/state/reduxstate/influencers/types';
import {
  calculateBigNumberValues,
  generateProjectsText,
} from 'src/utils/calculations';
import { icons } from 'src/utils/icons';
import { Typography, TypographyWeight } from '../../Typography';
import { CategoryTag } from '../CategoryTag/CategoryTag';
import { CategoryTags } from '../types';

const HEADLINES = [
  'Influencer',
  'Followers',
  // 'Bullseye Index',
  'Category',
  'Post count',
  'Channel',
  'Project',
  'Link to post',
];

interface InfluencersTableRowProps {
  influencersData: Influencer[];
}

export const InfluencersTableRows: React.FC<InfluencersTableRowProps> = ({
  influencersData,
}) => {
  const [imgErr, setImgErr] = useState({
    id: null as unknown as number,
    isErr: false,
  });

  useEffect(() => {}, []);

  return (
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
              twitter_user,
              followers,
              post_count,
              category,
              channel,
              project,
              link_to_post,
            },
            index
          ) => {
            return (
              <div
                key={index}
                className="influencers-picks__influencers-table__row"
              >
                <div className="influencers-picks__influencers-table__row__influencer">
                  <img
                    onError={() =>
                      setImgErr({
                        id: twitter_user.id,
                        isErr: true,
                      })
                    }
                    className="icon"
                    alt={twitter_user.twitter_username || 'Influencer'}
                    src={
                      imgErr.id === twitter_user.id
                        ? icons.no_image
                        : twitter_user.twitter_img_url
                    }
                  />
                  <div>
                    <Typography className="influencers-picks__influencers-table__row__influencer__tag-name">
                      {twitter_user.twitter_displayname}
                    </Typography>
                    <Typography className="influencers-picks__influencers-table__row__influencer__name">
                      {twitter_user.twitter_username}
                    </Typography>
                  </div>
                </div>
                <div className="influencers-picks__influencers-table__row__thin-text">
                  <Typography>{calculateBigNumberValues(followers)}</Typography>
                </div>
                {/* <div className="influencers-picks__influencers-table__row__bullseye">
              <TalkRateElement type="bullseye" rate={bullseye} />
            </div> */}
                <div>
                  {/* @ts-ignore */}
                  <CategoryTag tagTitle={CategoryTags[category]} />
                </div>
                <div className="influencers-picks__influencers-table__row__thin-text">
                  <Typography>
                    {calculateBigNumberValues(post_count)}
                  </Typography>
                </div>
                <div className="influencers-picks__influencers-table__row__thin-text">
                  <Typography>{channel}</Typography>
                </div>
                <div className="influencers-picks__influencers-table__row__projects">
                  <div className="influencers-picks__influencers-table__row__projects__overlapping-images">
                    {project &&
                      project.length > 0 &&
                      project.slice(0, 3).map((item, index) => {
                        return (
                          <img
                            key={index}
                            src={item.img || icons.no_image}
                            alt={item.name}
                          />
                        );
                      })}
                  </div>
                  <Typography>{generateProjectsText(project)}</Typography>
                </div>
                <div className="influencers-picks__influencers-table__row__link">
                  {link_to_post && (
                    <a href={link_to_post} target="_blank" rel="noreferrer">
                      <img src={icons.link_arrow} alt="Link to post" />
                    </a>
                  )}
                </div>
              </div>
            );
          }
        )}
    </div>
  );
};
