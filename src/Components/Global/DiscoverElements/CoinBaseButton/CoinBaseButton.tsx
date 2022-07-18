import { icons } from 'src/utils/icons';
import './CoinBaseButton.scss';

export const CoinBaseButton: React.FC = () => (
  <button className="coin-base-btn">
    <span>
      <img src={icons.coin_base} alt="coin base" />
      <p>Watch on Coinbase</p>
    </span>
  </button>
);
