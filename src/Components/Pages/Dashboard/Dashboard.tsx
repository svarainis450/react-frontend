import classNames from "classnames"
import { LoggedInLayout } from "src/Components/layouts/LoggedInLayout"

export const Dashboard = () => {
  return <div className={classNames('Dashboard')}>
    <LoggedInLayout>
      I'm a dashboard!!

      If you're here It means you are logged in
    </LoggedInLayout>
  </div>
}