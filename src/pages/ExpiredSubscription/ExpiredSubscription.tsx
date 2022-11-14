import { useSelector } from "react-redux";
import { LoggedInLayout } from "src/Components/layouts/LoggedInLayout";

import { userDataSelector } from "src/state/reduxstate/user/selectors";

import "./ExpiredSubscription.scss";
import { icons } from "src/utils/icons";
import { Typography } from "src/Components/Global/Typography";

const FEATURES = [
  "Track influencers` daily NFT & crypto picks",
  "Discover upcoming crypto & NFT projects",
  "Keep tabs on crypto & NFT experts",
  "Simple and accurate analyzed data records",
];

const ExpiredSubscription: React.FC = () => {
  const userData = useSelector(userDataSelector);
  const price = 12;

  return (
    <div className="Expired-subs">
      <LoggedInLayout>
        <div className="Expired-subs__wrapper">
          <img
            className="Expired-subs__wrapper__rocket-ticket"
            src={icons.rocket_ticket}
            alt="Rocket ticket"
          />
          <Typography className="Expired-subs__wrapper__headline">
            Your subscription has expired
          </Typography>
          <Typography className="Expired-subs__wrapper__desc">
            You have a couple of days left to enjoy your membership and use
            Potato product – but it’s not too late to change your mind.
          </Typography>
          <button className="Expired-subs__wrapper__membership-btn">
            Keep my membership
          </button>
          <Typography className="Expired-subs__wrapper__price-caption">
            ${price} per month. Cancel anytime.
          </Typography>

          <ul className="Expired-subs__wrapper__list">
            {FEATURES.map((item, index) => (
              <li
                className="Expired-subs__wrapper__list__list-item"
                key={index}
              >
                <img src={icons.circle_check_green} alt="checkmark" />
                <Typography>{item}</Typography>
              </li>
            ))}
          </ul>
        </div>
      </LoggedInLayout>
    </div>
  );
};

export default ExpiredSubscription;
