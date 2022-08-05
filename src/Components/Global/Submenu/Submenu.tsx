import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { SubmenuProps } from './types';

import './Submenu.scss';
import { useState } from 'react';
import { Typography, TypographyVariant, TypographyWeight } from '../Typography';

export const Submenu = ({
  menuItems,
  className,
  children,
  pageTitleMob,
}: SubmenuProps) => {
  const [selected, setSelected] = useState('today');

  return (
    <div className={classNames('Submenu', className)}>
      <div className="Submenu__page-title">
        <Typography
          variant={TypographyVariant.HEADING_LARGE}
          weight={TypographyWeight.MEDIUM}
        >
          {pageTitleMob}
        </Typography>
      </div>
      <ul className="Submenu__list">
        {menuItems.map((item, index) => {
          return (
            <li
              className="Submenu__item"
              key={`submenu_${item.title}_${index}`}
              onClick={() => {
                setSelected(item.title);
              }}
            >
              <NavLink to={item.url} className="Submenu__link">
                {typeof item.icon === 'string' ? (
                  <img
                    className="Submenu__icon"
                    src={item.icon}
                    alt={item.title}
                  />
                ) : (
                  <div
                    className={`Submenu__icon ${
                      selected === item.title ? 'selected' : ''
                    }`}
                  >
                    {item.icon}
                  </div>
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
