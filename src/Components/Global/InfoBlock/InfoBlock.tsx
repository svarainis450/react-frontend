import { ReactElement, ReactNode } from 'react';
import { icons } from 'src/utils/icons';
import { Typography, TypographyVariant, TypographyWeight } from '../Typography';

import './InfoBlock.scss';

interface InfoBlockProps {
  showInfoBlock: boolean;
  onCloseClick?: () => void;
  infoTitle?: string;
  infoDesc?: string | ReactElement;
  children?: ReactNode | ReactNode[];
}

export const InfoBlock: React.FC<InfoBlockProps> = ({
  showInfoBlock,
  onCloseClick,
  infoTitle,
  infoDesc,
}) => {
  const showInfClass = showInfoBlock ? 'show-info' : '';

  return (
    <div className={`info ${showInfClass}`}>
      <img
        className="close-icon"
        src={icons.closeXBlack}
        alt="Info label"
        onClick={onCloseClick}
      />
      <div className="flex-wrapper">
        <img className="info-label" src={icons.info_label} alt="Info label" />
        {infoTitle && (
          <Typography className="info-title" weight={TypographyWeight.BOLD}>
            {infoTitle}
          </Typography>
        )}
      </div>
      {infoDesc && typeof infoDesc === 'string' ? (
        <Typography variant={TypographyVariant.SUBHEADING}>
          {infoDesc}
        </Typography>
      ) : infoDesc ? (
        <>{infoDesc}</>
      ) : null}
    </div>
  );
};
