import { icons } from 'src/utils/icons';
import './SubscribeButton.scss';

interface SubscribeButtonProps {
  isSubscribed?: boolean;
  onClick: () => void;
}

export const SubscribeButton: React.FC<SubscribeButtonProps> = ({
  isSubscribed,
  onClick,
}) => (
  <button
    className={`subscribe-btn ${isSubscribed ? 'subscribed' : ''}`}
    onClick={onClick}
  >
    <span>
      <img
        src={isSubscribed ? icons.subscribed : icons.subscribe}
        alt="Subscribe button"
      />
      <p>{isSubscribed ? 'Subscribed' : 'Subscribe'}</p>
    </span>
  </button>
);
