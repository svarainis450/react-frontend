import { FixedTooltipProps } from './types';

import infoIco from '../../../Assets/images/infoIco.svg'
import infoIcoWhite from '../../../Assets/images/infoIcoWhite.svg'
import modernCloseIco from '../../../Assets/images/modernClose.svg'
import modernCloseWhite from '../../../Assets/images/modernCloseWhite.svg'

import './FixedTooltip.scss';

export const FixedTooltip = ({closeTooltip, title, subtitle, color, textColor, isLight = false} : FixedTooltipProps) => {
  return (
    <div className='FixedTooltip' style={{backgroundColor: color}}>
      <div className="FixedTooltip__wrapper">
        <div 
          className="FixedTooltip__close"
          onClick={closeTooltip}
        >
          <img src={isLight ? modernCloseWhite : modernCloseIco} alt="close" />
        </div>

        <div className="FixedTooltip__title-wrapper">
          <img src={isLight ? infoIcoWhite : infoIco} alt="info" className="FixedTooltip_icon" />
          <p className="FixedTooltip__title" style={{color: textColor}}>
            {title}
          </p>
        </div>

        <p className="FixedTooltip__description" style={{color: textColor}}>
          {subtitle}
        </p>
      </div>
    </div>
  );
};