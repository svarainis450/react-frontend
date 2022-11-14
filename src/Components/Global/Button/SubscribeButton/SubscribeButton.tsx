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
  <div className="subscribe-button-wrapper">
    {isLoading ? (
      <div className="loader-wrapper">
        <Loader width={24} height={24} />
      </div>
    ) : (
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
    )}
  </div>
);
