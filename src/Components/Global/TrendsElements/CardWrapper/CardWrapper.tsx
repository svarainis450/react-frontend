import React, { ReactNode } from 'react';
import { icons } from 'src/utils/icons';
import { InfoBlock } from '../../InfoBlock/InfoBlock';

import { Typography } from '../../Typography';
import './CardWrapper.scss';

interface CardWrapperProps {
  children: ReactNode | ReactNode[];
  onInfoClick?: () => void;
  onCloseClick?: () => void;
  title?: string;
  subtitle?: string;
  showInfoBlock?: boolean;
  showInfoLabel?: boolean;
  infoTitle?: string;
  infoDesc?: string;
}

export const CardWrapper: React.FC<CardWrapperProps> = ({
  children,
  infoDesc,
  infoTitle,
  onCloseClick,
  onInfoClick,
  showInfoBlock,
  showInfoLabel = false,
  subtitle,
  title,
}) => {
  return (
    <div className="card">
      {showInfoBlock && (
        <InfoBlock
          showInfoBlock={showInfoBlock}
          onCloseClick={onCloseClick}
          infoTitle={infoTitle}
          infoDesc={infoDesc}
        />
      )}
      {(title || subtitle) && (
        <div className="flex-wrapper">
          <div>
            {title && <Typography className="title">{title}</Typography>}
            {subtitle && (
              <Typography className="subtitle">{subtitle}</Typography>
            )}
          </div>

          {showInfoLabel && (
            <img
              className="info-label"
              src={icons.info_label}
              alt="Info label"
              onClick={onInfoClick}
            />
          )}
        </div>
      )}
      {children}
    </div>
  );
};
