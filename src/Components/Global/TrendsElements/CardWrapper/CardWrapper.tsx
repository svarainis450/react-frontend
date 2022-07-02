import React, { ReactNode } from 'react';
import { icons } from 'src/utils/icons';

import { Typography, TypographyWeight } from '../../Typography';
import './CardWrapper.scss';

interface CardWrapperProps {
  children: ReactNode | ReactNode[];
  onClick?: () => void;
  title?: string;
  subtitle?: string;
  showInfoLabel?: boolean;
}

export const CardWrapper: React.FC<CardWrapperProps> = ({
  children,
  onClick,
  showInfoLabel = false,
  subtitle,
  title,
}) => {
  const showInfo = 'show-info';

  return (
    <div className="card">
      <div className={`info ${showInfo}`}>
        <img
          className="close-icon"
          src={icons.closeX}
          alt="Info label"
          onClick={onClick}
        />
        <div className="flex-wrapper">
          <img
            className="info-label"
            src={icons.info_label}
            alt="Info label"
            onClick={onClick}
          />
          <div>
            <Typography className="info-title" weight={TypographyWeight.BOLD}>
              What’s Talk Rate Project?
            </Typography>
          </div>
        </div>
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
            onClick={onClick}
          />
        )}
      </div>
      {children}
    </div>
  );
};
