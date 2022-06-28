import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { SubmenuProps } from './types';

import './Submenu.scss'

export const Submenu = ({menuItems, className} : SubmenuProps ) => {
  return <div className={classNames('Submenu', className)} >
    <ul className='Submenu__list'>
      {menuItems.map((item, index) => {
        console.log(item)
        return <li className='Submenu__item' key={`submenu_${item.title}_${index}`}>
          <NavLink to={item.url} className='Submenu__link'>
            
            <img className="Submenu__icon" src={item.icon} />
            {item.title}
          </NavLink>
        </li>
      })}
    </ul>
  </div>
}