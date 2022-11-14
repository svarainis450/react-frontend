import { NavigationTogglerProps } from './types';

import burger from '../../../../Assets/images/burger.svg';
import './NavigationToggler.scss';

export const NavigationToggler = ({ onMenuToggle }: NavigationTogglerProps) => {
  if (!onMenuToggle) {
    return null;
  }

  return (
    <button className="NavigationToggler" onClick={onMenuToggle}>
      <img src={burger} alt="logo" className='mobile' />
    </button>
  );
};
