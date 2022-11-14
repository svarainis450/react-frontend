import { NavLink } from "react-router-dom";
import { LinkList } from "../../../../types/links";

export const NavigationList = () => {
  return (
    <ul className="NavigationList">
      <li className="NavigationList__link">
        <NavLink to={LinkList.Home}>Product</NavLink>
      </li>

      <li className="NavigationList__link">
        <NavLink to={LinkList.Pricing}>Pricing</NavLink>
      </li>

      <li className="NavigationList__link">
        <NavLink to={LinkList.Demo}>Demo tour</NavLink>
      </li>

      <li className="NavigationList__link">
        <NavLink to={LinkList.About}>About</NavLink>
      </li>
    </ul>
  );
};
