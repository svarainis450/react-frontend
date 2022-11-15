import { useNavigate } from 'react-router-dom';
import { LinkList } from 'src/types';

import './NavigationList.scss';

interface NavigationListProps {
  list: Array<any>;
  activeLink?: string;
}

export const NavigationList: React.FC<NavigationListProps> = ({
  list,
  activeLink,
}) => {
  const navigate = useNavigate();

  const handleMenuSelection = (type: string, url: LinkList) => {
    navigate(url);
  };

  return (
    <ul className="NavigationList">
      {list.map((item: any, index) => {
        return (
          <li
            onClick={() => handleMenuSelection(item.text, item.link)}
            key={index}
            className={`NavigationList__link ${
              activeLink === item.text ? 'active' : ''
            }`}
          >
            {item.text}
          </li>
        );
      })}
    </ul>
  );
};
