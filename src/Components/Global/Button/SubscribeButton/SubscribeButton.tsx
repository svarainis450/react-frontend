import { icons } from 'src/utils/icons';
import { Loader } from '../../Loader/Loader';
import './SubscribeButton.scss';

interface SubscribeButtonProps {
  isSubscribed?: boolean;
  onClick: () => void;
  isLoading?: boolean;
}

export const SubscribeButton: React.FC<SubscribeButtonProps> = ({
  isSubscribed,
  isLoading,
  onClick,
}) => (
  <button
    className={`subscribe-btn ${isSubscribed ? 'subscribed' : ''}`}
    onClick={onClick}
  >
    {isLoading ? (
      <div className="subscribe-btn__loader-wrapper">
        <Loader />
      </div>
    ) : (
      <span>
        <img
          src={isSubscribed ? icons.subscribed : icons.subscribe}
          alt="Subscribe button"
        />
        <p>{isSubscribed ? 'Subscribed' : 'Subscribe'}</p>
      </span>
    )}
  </button>
);
