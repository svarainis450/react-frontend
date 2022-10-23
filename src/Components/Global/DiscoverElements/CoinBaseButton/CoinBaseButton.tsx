import { icons } from 'src/utils/icons';
import './CoinBaseButton.scss';

interface CoinBaseButtonProps {
  url?: string | null;
  btnType: 'opensea' | 'coinbase';
}

export const CoinBaseButton: React.FC<CoinBaseButtonProps> = ({
  btnType,
  url,
}) => {
  if (url === null || url === undefined) return null;
  return (
    <a href={url} target="_blank" className="coin-base-btn" rel="noreferrer">
      <span>
        <img
          src={btnType === 'opensea' ? icons.open_sea : icons.coin_base}
          alt="coin base"
        />
        <p>
          {btnType === 'opensea' ? 'Watch on Opensea' : 'Watch on Coinbase'}
        </p>
      </span>
    </a>
  );
};
