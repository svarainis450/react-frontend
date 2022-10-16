import React from 'react';
import { CategoryTags } from '../TrendsElements/types';
import './infoBlocks.scss';

interface InfoBlocksProps {
  infoType:
    | 'sentiment'
    | 'mentions'
    | 'volume'
    | 'price'
    | 'talk_rate'
    | 'bull'
    | 'positive_negative';
  projectType?: CategoryTags;
}

export const InfoBlocks: React.FC<InfoBlocksProps> = ({
  infoType,
  projectType,
}) => {
  const content = {
    sentiment:
      'Number of positive mentions minus number of negative mentions about this project.',
    mentions:
      'The volume of the mentions of the product within different social networks',
    volume:
      projectType === CategoryTags.nft.toLocaleLowerCase()
        ? 'Amount of currency (e.g. ETH) exchanged for the NFT'
        : 'Total amount of crypto exchanged',
    price:
      projectType === CategoryTags.nft.toLocaleLowerCase()
        ? 'Price of the NFT'
        : 'Price of the product',
    talk_rate:
      'Talk Rate summarizes which projects are most often discussed among crypto experts and the community.',
    bull: 'Bull v.s. Bear spots whether the project is Bullish, meaning is on the rise, or Bearish, meaning it is declining in value.',
    positive_negative: `Positive v.s. A negative Index shows whether people are more positive or negative about the project's growth.`,
  };
  return (
    <div className={`tgl-btns-info ${infoType}`}>
      <p>{content[infoType]}</p>
    </div>
  );
};
