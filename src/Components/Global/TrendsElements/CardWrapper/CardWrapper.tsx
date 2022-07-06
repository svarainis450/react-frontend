import React, { ReactNode } from 'react';
import { icons } from 'src/utils/icons';

import {
  Typography,
  TypographyVariant,
  TypographyWeight,
} from '../../Typography';
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
  const showInfClass = showInfoBlock ? 'show-info' : '';

  return (
    <div className="card">
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
        {infoDesc && (
          <Typography variant={TypographyVariant.SUBHEADING}>
            {infoDesc}
          </Typography>
        )}
      </div>
      <div className="flex-wrapper">
        <div>
          {title && (
            <Typography className="title" weight={TypographyWeight.BOLD700}>
              {title}
            </Typography>
          )}
          {subtitle && <Typography className="subtitle">{subtitle}</Typography>}
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
      {children}
    </div>
  );
};
