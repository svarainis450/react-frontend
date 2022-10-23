import { ArrowRightRounded } from 'src/Assets/icons/IconElements';
import { theme } from 'src/theme';
import { icons } from 'src/utils/icons';
import { Typography } from '../../Typography';
import './InfluencersTalkAboutIt.scss';

interface InfluencersTalkAboutItProps {
  img_url: string;
  name: string;
  displayName: string;
  sentiment?: string;
  tweetId: string;
}

export const InfluencersTalkAboutIt: React.FC<InfluencersTalkAboutItProps> = ({
  img_url,
  name,
  displayName,
  sentiment,
  tweetId,
}) => {
  const maxStringChars = 18;
  const externalLink = `https://twitter.com/${name}/status/${tweetId}`;

  return (
    <div className="influencers-talk">
      <div className="influencers-talk__name-wrapper">
        <img
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = icons.no_image;
          }}
          className="influencers-talk__name-wrapper__picture"
          src={img_url || icons.no_image}
          alt={name}
        />
        <div>
          <Typography className="influencers-talk__name-wrapper__display-name">
            {displayName.substring(0, maxStringChars)}
            {displayName.length >= maxStringChars && '...'}{' '}
          </Typography>
          <Typography className="influencers-talk__name-wrapper__name">
            {name.substring(0, maxStringChars)}
            {name.length >= maxStringChars && '...'}
          </Typography>
        </div>
      </div>
      <img
        src={
          sentiment === 'POSITIVE'
            ? icons.positive_thumb
            : sentiment === 'NEGATIVE'
            ? icons.negative
            : icons.neutral_five
        }
        alt={sentiment}
      />
      <a href={externalLink} target="_blank" rel="noreferrer">
        <ArrowRightRounded fill={theme.colors.black} />
      </a>
    </div>
  );
};
