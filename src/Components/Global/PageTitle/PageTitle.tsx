import classNames from 'classnames';

import { PageTitleProps } from './types';
import { Typography, TypographyVariant, TypographyWeight } from '../Typography';

import './PageTitle.scss';

export const PageTitle = ({ title = '', subtitle = '', className}: PageTitleProps) => {
  // if (title == '') return <></>

  return (
    <div className={classNames('PageTitle', className)}>
      <Typography 
        className='PageTitle_title' 
        weight={TypographyWeight.MEDIUM} 
        variant={TypographyVariant.HEADING_LARGE}
      >
        {title} 
      </Typography>

      {subtitle && (
        <Typography 
          className='PageTitle_subtitle' 
          weight={TypographyWeight.THIN} 
          variant={TypographyVariant.SUBHEADING}
        >
          {subtitle} 
        </Typography>
      )}
    </div>
  );
};
