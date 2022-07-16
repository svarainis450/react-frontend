import { images } from 'src/utils/images';
import { CardWrapper } from '../../TrendsElements/CardWrapper/CardWrapper';
import { Typography } from '../../Typography';
import './ProfileCard.scss';

export const ProfileCard: React.FC = () => (
  <div className="profile-card">
    <img
      className="profile-card__avatar"
      src={images.avatar}
      alt="Profile avatar"
    />
    <CardWrapper>
      <Typography className="profile-card__name">Vardas Pavarde</Typography>
      <div className="profile-card__border-wrapper">
        <Typography className="bolded-text">Selected Interests</Typography>
      </div>
      <div className="profile-card__border-wrapper">
        <Typography className="bolded-text">Your Information</Typography>
        <div className="profile-card__border-wrapper__input-wrapper">
          <label>First name</label>
          <input value="First Name" type="text" />
        </div>
        <div className="profile-card__border-wrapper__input-wrapper">
          <label>Last name</label>
          <input value="Last Name" type="text" />
        </div>
      </div>
      <div className="profile-card__border-wrapper">
        <Typography className="bolded-text">Account details</Typography>
        <div className="profile-card__border-wrapper__input-wrapper">
          <label>Email</label>
          <input value="First Name" type="text" />
        </div>
        <div className="profile-card__border-wrapper__input-wrapper">
          <label>Password</label>
          <input value="Last Name" type="text" />
        </div>
      </div>
    </CardWrapper>
  </div>
);
