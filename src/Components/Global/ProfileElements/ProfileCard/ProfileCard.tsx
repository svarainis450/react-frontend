import {
  ChangeEvent,
  FormEvent,
  FormEventHandler,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useSelector } from 'react-redux';
import { CancelXmark } from 'src/Assets/icons/IconElements';
import { tags } from 'src/state/reduxstate/projects/types';
import { useAppDispatch } from 'src/state/reduxstate/store';
import { userDataSelector } from 'src/state/reduxstate/user/selectors';
import { setUserData } from 'src/state/reduxstate/user/slice';
import { UserDataType } from 'src/state/reduxstate/user/types';
import { UserInfoContext } from 'src/state/UserInfoContextProvider';
import { icons } from 'src/utils/icons';
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
  const dispatch = useAppDispatch();
  const userData = useSelector(userDataSelector);
  const [profileImg, setProfileImg] = useState<any>();
  const [imgUrl, setImgUrl] = useState('');
  const [newData, setNewData] = useState<Omit<UserDataType, 'market'>>({
    img: profileImg,
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    password: userData.password,
  });

  useEffect(() => {
    if (profileImg) {
      const url = URL.createObjectURL(profileImg);
      setImgUrl(url);
      dispatch(setUserData({ ...userData, img: url }));
    }
  }, [profileImg]);

  const updateProfileData = (
    e: FormEvent,
    data: Omit<UserDataType, 'market'>
  ) => {
    e.preventDefault();
    dispatch(setUserData({ ...userData, ...data }));
    setEditData({
      interests: true,
      information: true,
      account: true,
    });
  };

  const handleCancelInput = (editingData: keyof typeof editData) => {
    setEditData({ ...editData, [editingData]: !editData[editingData] });
    if (editingData === 'information') {
      setNewData({
        ...newData,
        firstName: userData.firstName,
        lastName: userData.lastName,
      });
    } else if (editingData === 'account') {
      setNewData({
        ...newData,
        email: userData.email,
        password: userData.password,
      });
    }
  };

  const { userInfo } = useContext(UserInfoContext);

  return (
    <form
      className="profile-card"
      onSubmit={(e: FormEvent) => updateProfileData(e, newData)}
    >
      <label>
        <img
          className="profile-card__avatar"
          src={userInfo.image || imgUrl || icons.no_profile_pic}
          alt="Profile avatar"
        />
        <input
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            if (e.target.files) {
              setProfileImg(e.target.files[0]);
            }
          }}
          type="file"
          className="profile-card__picture-upload"
        />
        <div className="profile-card__active-bubble" />
      </label>
      <CardWrapper>
        <Typography className="profile-card__name">
          {userInfo.name || 'Name'} {userInfo.surname || 'Surname'}
        </Typography>
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
          <div
            className={`profile-card__border-wrapper__input-wrapper ${
              editData.information ? '' : 'active'
            }`}
          >
            <label>First name</label>
            {/* TODO: billing. value={name from state} */}
            <input
              value={newData.firstName || 'Name'}
              type="text"
              disabled={editData.information}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setNewData({ ...newData, firstName: e.target.value })
              }
            />
            <CancelXmark onClick={() => handleCancelInput('information')} />
          </div>
          <div
            className={`profile-card__border-wrapper__input-wrapper ${
              editData.information ? '' : 'active'
            }`}
          >
            <label>Last name</label>
            {/* TODO: billing. value={last name from state} */}
            <input
              value={newData.lastName || 'Last Name'}
              type="text"
              disabled={editData.information}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setNewData({ ...newData, lastName: e.target.value })
              }
            />
            <CancelXmark onClick={() => handleCancelInput('information')} />
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
          <div
            className={`profile-card__border-wrapper__input-wrapper ${
              editData.account ? '' : 'active'
            }`}
          >
            <label>Email</label>
            {/* TODO: billing. value={email from state} */}
            <input
              value={newData.email || 'your@email.com'}
              type="email"
              disabled={editData.account}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setNewData({ ...newData, email: e.target.value })
              }
            />
            <CancelXmark onClick={() => handleCancelInput('account')} />
          </div>
          <div
            className={`profile-card__border-wrapper__input-wrapper ${
              editData.account ? '' : 'active'
            }`}
          >
            <label>Password</label>
            {/* TODO: billing. value={pasw from state}  not sure if this a good decision*/}
            <input
              value={newData.password || 'unknown'}
              type="password"
              disabled={editData.account}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setNewData({ ...newData, password: e.target.value })
              }
            />
            <CancelXmark onClick={() => handleCancelInput('account')} />
          </div>
          {(!editData.account ||
            !editData.information ||
            !editData.interests) && (
            <button className="done-button" type="submit">
              Done
            </button>
          )}
        </div>
      </CardWrapper>
    </form>
  );
};
