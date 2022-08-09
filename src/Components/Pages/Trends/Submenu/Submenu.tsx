import classNames from 'classnames';
import { SubmenuProps } from './types';

import './Submenu.scss';
import {
  Typography,
  TypographyVariant,
  TypographyWeight,
} from 'src/Components/Global/Typography';
import { useState } from 'react';

export const Submenu = ({
  menuItems,
  className,
  children,
  callBack,
}: SubmenuProps) => {
  const [selected, setSelected] = useState('Today');
  return (
    <div className={classNames('Submenu', className)}>
      <div className="Submenu__page-title">
        <Typography
          variant={TypographyVariant.HEADING_LARGE}
          weight={TypographyWeight.MEDIUM}
        >
          Trends
        </Typography>
      </div>
      <ul className="Submenu__list">
        {menuItems.map((item, index) => {
          return (
            <li
              className="Submenu__item"
              key={`submenu_${item.title}_${index}`}
              onClick={() => {
                callBack(item.callBackKey);
                setSelected(item.title);
              }}
            >
              <div
                className={`Submenu__link ${
                  selected === item.title ? 'active' : ''
                }`}
              >
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
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
