import { ArrowRightRounded } from 'src/Assets/icons/IconElements';
import { icons } from 'src/utils/icons';
import { Typography } from '../../Typography';
import './InfluencersTalkAboutIt.scss';

interface InfluencersTalkAboutItProps {
  img_url: string;
  name: string;
  displayName: string;
  link: string;
  sentiment?: string;
}

export const InfluencersTalkAboutIt: React.FC<InfluencersTalkAboutItProps> = ({
  img_url,
  name,
  displayName,
  link,
  sentiment,
}) => {
  return (
    <div className="influencers-talk">
      <img src={img_url} alt={name} />
      <div>
        <Typography>{displayName}</Typography>
        <Typography>{name}</Typography>
      </div>
      <img
        src={sentiment === 'POSITIVE' ? icons.positive_thumb : icons.negative}
        alt={sentiment}
      />
      <ArrowRightRounded />
    </div>
  );
};
