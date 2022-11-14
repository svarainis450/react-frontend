import { CommingSoon } from "src/Assets/icons/IconElements";

import { Submenu } from "src/Components/Global/Submenu";
import { LoggedInLayout } from "src/Components/layouts/LoggedInLayout";

import { submenuList } from "../Discover/Discover";

import "./Funds.scss";

const Funds: React.FC = () => (
  <div className="Funds">
    <LoggedInLayout>
      <Submenu menuItems={submenuList} pageTitleMob="Discover" />
      <div className="Funds__soon">
        <CommingSoon />
      </div>
    </LoggedInLayout>
  </div>
);

export default Funds;
