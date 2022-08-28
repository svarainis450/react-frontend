import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchProjectById } from 'src/state/reduxstate/projects/thunks';
import { useAppDispatch } from 'src/state/reduxstate/store';
import { userTokenSelector } from 'src/state/reduxstate/user/selectors';
import { getFavProjects } from 'src/state/reduxstate/user/thunks';
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
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userToken = useSelector(userTokenSelector);

  const handleMenuSelection = (type: string, url: LinkList) => {
    // if (type === 'For you' && userToken) {
    //   dispatch(getFavProjects({ tokenValue: userToken })).then((resp) => {
    //     dispatch(fetchProjectById({ id: resp.payload[0].id })).then(() =>
    //       navigate(url)
    //     );
    //   });
    // } else {
    navigate(url);
    // }
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
