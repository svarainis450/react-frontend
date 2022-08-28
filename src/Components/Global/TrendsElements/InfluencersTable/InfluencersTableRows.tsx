import { useState } from 'react';
import {
  Influencer,
  Project,
  TrendingProject,
} from 'src/state/reduxstate/projects/types';
import {
  calculateFollowers,
  generateProjectsText,
} from 'src/utils/calculations';
import { icons } from 'src/utils/icons';
import { TalkRateElement } from '../../TalkRateElement/TalkRateElement';
import { Typography, TypographyWeight } from '../../Typography';
import { CategoryTag } from '../CategoryTag/CategoryTag';

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
              id,
              name,
              tagName,
              img,
              followers,
              bullseye,
              postCount,
              channel,
              projects,
              tag,
              social,
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
                    className="icon"
                    alt={name || 'project'}
                    src={img || icons.no_image}
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
                {/* <div className="influencers-picks__influencers-table__row__bullseye">
              <TalkRateElement type="bullseye" rate={bullseye} />
            </div> */}
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
                  <div className="influencers-picks__influencers-table__row__projects__overlapping-images">
                    {projects &&
                      projects.length > 0 &&
                      projects.slice(0, 3).map((item) => {
                        return (
                          <img
                            src={item.img || icons.no_image}
                            alt={item.name}
                          />
                        );
                      })}
                  </div>
                  <Typography>{generateProjectsText(projects)}</Typography>
                </div>
                <div className="influencers-picks__influencers-table__row__link">
                  {social && social.twitter && (
                    <a href={social.twitter} target="_blank" rel="noreferrer">
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
