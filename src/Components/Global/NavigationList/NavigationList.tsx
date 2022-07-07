import { NavLink } from 'react-router-dom';

import { simpleNavList, userNavList } from './const';

export const NavigationList = ({ list }: { list: Array<any> }) => {
  return (
    <ul className="NavigationList">
      {list.map((item: any, index) => {
        return (
          <li key={index} className="NavigationList__link">
            <NavLink to={item.link}>{item.text}</NavLink>
          </li>
        );
      })}
    </ul>
  );
};
