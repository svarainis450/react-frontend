import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import { simpleNavList, userNavList } from './const';

import './NavigationList.scss';

export const NavigationList = ({
  list,
  activeLink,
}: {
  list: Array<any>;
  activeLink?: string;
}) => {
  return (
    <ul className="NavigationList">
      {list.map((item: any, index) => {
        return (
          <li
            key={index}
            className={`NavigationList__link ${
              activeLink === item.text ? 'active' : ''
            }`}
          >
            <NavLink to={item.link}>{item.text}</NavLink>
          </li>
        );
      })}
    </ul>
  );
};
