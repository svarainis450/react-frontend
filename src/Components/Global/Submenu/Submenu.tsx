import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { SubmenuProps } from './types';

import './Submenu.scss';

export const Submenu = ({ menuItems, className, children }: SubmenuProps) => {
  return (
    <div className={classNames('Submenu', className)}>
      <ul className="Submenu__list">
        {menuItems.map((item, index) => {
          return (
            <li
              className="Submenu__item"
              key={`submenu_${item.title}_${index}`}
            >
              <NavLink to={item.url} className="Submenu__link">
                {typeof item.icon === 'string' ? (
                  <img
                    className="Submenu__icon"
                    src={item.icon}
                    alt={item.title}
                  />
                ) : (
                  <div className="Submenu__icon">{item.icon}</div>
                )}
                {item.title}
              </NavLink>
            </li>
          );
        })}

        <div className="Submenu__children">{children}</div>
      </ul>
    </div>
  );
};
