

import classNames from 'classnames';

import { HeroTitleProps } from './types';
import { Typography, TypographyVariant, TypographyWeight } from '../Typography';

import './HeroTitle.scss';

export const HeroTitle = ({ title = '', subtitle = '', smallTitle = false, className}: HeroTitleProps) => {
  if (title == '' && subtitle == '') return <></>

  return (
    <div className={classNames('HeroTitle', className)}>

      {title &&
        smallTitle
            ? <Typography className='HeroTitle_title' weight={TypographyWeight.MEDIUM} variant={TypographyVariant.HEADING_SMALL}>{title}</Typography>
            : <Typography className='HeroTitle_title' weight={TypographyWeight.MEDIUM} variant={TypographyVariant.HEADING_LARGE}>{title}</Typography>
      }

      {subtitle &&
        <Typography className='HeroTitle_subtitle'  weight={TypographyWeight.THIN} variant={TypographyVariant.SUBHEADING} >{subtitle}</Typography>
      }
    </div>
  );
};
