import classNames from 'classnames';

import { SolidSidedHeroProps } from './types';

import './SolidSidedHero.scss';

export const SolidSidedHero = ({image, number, title, text, imgleft, colour} : SolidSidedHeroProps) => {
  return (
    <div 
      className='SolidSidedHero'
      style={{backgroundColor: colour || ''}}
    >
      <div className={classNames('SolidSidedHero__wrapper', {'SolidSidedHero__wrapper--imgleft': imgleft})}>
        <div className="SolidSidedHero__content-wrapper">
          {number && <div className="SolidSidedHero__no desktop">#{number}</div>}
          {title && <div className="SolidSidedHero__title">{title}</div>}
          {text && <div className="SolidSidedHero__text">{text}</div>}
        </div>

        <div className="SolidSidedHero__img-wrapper">
          <img className='SolidSidedHero__img' src={image} alt='phone1' />
        </div>
      </div>
    </div>
  );
};
