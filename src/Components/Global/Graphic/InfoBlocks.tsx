import React from 'react';
import './infoBlocks.scss';

interface InfoBlocksProps {
  infoType: 'sentiment' | 'mentions' | 'volume' | 'price';
}

export const InfoBlocks: React.FC<InfoBlocksProps> = ({ infoType }) => {
  const content = {
    sentiment:
      'Number of positive mentions minus number of negative mentions about this project.',
    mentions:
      'The volume of the mentions of the product within different social networks',
    volume: 'Total amount of crypto exchanged',
    price: 'Price of the product',
  };
  return (
    <div className={`tgl-btns-info ${infoType}`}>
      <p>{content[infoType]}</p>
    </div>
  );
};
