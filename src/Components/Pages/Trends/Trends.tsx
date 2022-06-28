
import { LoggedInLayout } from "src/Components/layouts/LoggedInLayout";
import { Submenu } from "src/Components/Global/Submenu";
import { submenuList } from './constants'

import './trends.scss';

export const Trends = () => {
  return <div className="Trends">
    <LoggedInLayout>
      <Submenu menuItems={submenuList}  />
    </LoggedInLayout>
  </div>
}