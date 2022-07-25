import { useContext, useState } from 'react';
import { tags } from 'src/state/reduxstate/projects/types';
import { UserInfoContext } from 'src/state/UserInfoContextProvider';
import { images } from 'src/utils/images';
import { CardWrapper } from '../../TrendsElements/CardWrapper/CardWrapper';
import { CategoryTag } from '../../TrendsElements/CategoryTag/CategoryTag';
import {
  Typography,
  TypographyVariant,
  TypographyWeight,
} from '../../Typography';
import './ProfileCard.scss';

export const ProfileCard: React.FC = () => {
  const [editData, setEditData] = useState({
    interests: true,
    information: true,
    account: true,
  });

  const { userInfo } = useContext(UserInfoContext);

  return (
    <div className="profile-card">
      <img
        className="profile-card__avatar"
        src={images.avatar}
        alt="Profile avatar"
      />
      <CardWrapper>
        <Typography className="profile-card__name">Vardas Pavarde</Typography>
        <div className="profile-card__border-wrapper">
          <div className="profile-card__border-wrapper__edit">
            <Typography className="bolded-text">Selected Interests</Typography>
          </div>
          <div className="profile-card__border-wrapper__tags">
            {tags.map((item, index) => (
              <CategoryTag key={index} tagTitle={item} />
            ))}
          </div>
        </div>
        <div className="profile-card__border-wrapper">
          <div className="profile-card__border-wrapper__edit">
            <Typography className="bolded-text">Your Information</Typography>
            <Typography
              variant={TypographyVariant.CAPTION}
              weight={TypographyWeight.BOLD700}
              className="profile-card__border-wrapper__edit__action"
              onClick={() =>
                setEditData({ ...editData, information: !editData.information })
              }
            >
              Edit
            </Typography>
          </div>
          <div className="profile-card__border-wrapper__input-wrapper">
            <label>First name</label>
            {/* TODO: billing. value={name from state} */}
            <input
              value="First Name"
              type="text"
              disabled={editData.information}
            />
          </div>
          <div className="profile-card__border-wrapper__input-wrapper">
            <label>Last name</label>
            {/* TODO: billing. value={last name from state} */}
            <input
              value="Last Name"
              type="text"
              disabled={editData.information}
            />
          </div>
        </div>
        <div className="profile-card__border-wrapper">
          <div className="profile-card__border-wrapper__edit">
            <Typography className="bolded-text">Account details</Typography>
            <Typography
              variant={TypographyVariant.CAPTION}
              weight={TypographyWeight.BOLD700}
              className="profile-card__border-wrapper__edit__action"
              onClick={() =>
                setEditData({ ...editData, account: !editData.account })
              }
            >
              Edit
            </Typography>
          </div>
          <div className="profile-card__border-wrapper__input-wrapper">
            <label>Email</label>
            {/* TODO: billing. value={email from state} */}
            <input
              value="First Name"
              type="email"
              disabled={editData.account}
            />
          </div>
          <div className="profile-card__border-wrapper__input-wrapper">
            <label>Password</label>
            {/* TODO: billing. value={pasw from state}  not sure if this a good decision*/}

            <input
              value="Password"
              type="password"
              disabled={editData.account}
            />
          </div>
        </div>
      </CardWrapper>
    </div>
  );
};
