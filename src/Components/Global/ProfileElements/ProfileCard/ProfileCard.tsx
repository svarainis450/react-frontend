import { ChangeEvent, FormEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import { CancelXmark } from 'src/Assets/icons/IconElements';
import { useAppDispatch } from 'src/state/reduxstate/store';
import { userDataSelector } from 'src/state/reduxstate/user/selectors';
import { setUserData } from 'src/state/reduxstate/user/slice';
import { updateUserInfo } from 'src/state/reduxstate/user/thunks';
import { UserUpdateType } from 'src/state/reduxstate/user/types';
import { icons } from 'src/utils/icons';
import { CardWrapper } from '../../TrendsElements/CardWrapper/CardWrapper';
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
  const [imgUrl, setImgUrl] = useState('');
  const [newData, setNewData] = useState<UserUpdateType>({
    img_url: userData.img_url,
    first_name: userData.first_name,
    last_name: userData.last_name,
    email: userData.email,
    password: userData.password,
  });
  // console.log(userData);
  // console.log(newData.img_url);

  // console.log(profileImg);

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.files);
    // if (e.target.files) {
    //   const file = e.target.files[0];
    //   const formData = new FormData();
    //   formData.append('img_url', file);
    //   const url = URL.createObjectURL(file);
    //   // const file = e.target.files[0];
    //   // let reader = new FileReader();
    //   // const url = reader.readAsDataURL(file);
    //   axios
    //     .patch(`${apiv1}/users`, formData, {
    //       headers: {
    //         ContentType: 'multipart/form-data',
    //       },
    //     })
    //     .then((res) => console.log(res));
    //   setNewData({ ...newData, img_url: url });
    // dispatch(updateUserInfo({}));
    // }
  };

  const updateProfileData = (e: FormEvent, data: UserUpdateType) => {
    e.preventDefault();
    dispatch(setUserData({ ...userData, ...data }));
    setEditData({
      interests: true,
      information: true,
      account: true,
    });
    dispatch(updateUserInfo(data));
  };

  const handleCancelInput = (editingData: keyof typeof editData) => {
    setEditData({ ...editData, [editingData]: true });
    if (editingData === 'information') {
      setNewData({
        ...newData,
        first_name: userData.first_name,
        last_name: userData.last_name,
      });
    } else if (editingData === 'account') {
      setNewData({
        ...newData,
        email: userData.email,
        password: userData.password,
      });
    }
  };

  return (
    <form
      id="profile-form"
      className="profile-card"
      onSubmit={(e: FormEvent) => updateProfileData(e, newData)}
    >
      <label>
        <img
          className="profile-card__avatar"
          src={newData.img_url || imgUrl || icons.no_profile_pic}
          alt="Profile avatar"
        />
        <input
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleFileInput(e)}
          type="file"
          className="profile-card__picture-upload"
          disabled
        />
        <div className="profile-card__active-bubble" />
      </label>
      <CardWrapper>
        <Typography className="profile-card__name">
          {userData.first_name || 'Name'} {userData.last_name || 'Surname'}
        </Typography>
        {/* <div className="profile-card__border-wrapper">
          <div className="profile-card__border-wrapper__edit">
            <Typography className="bolded-text">Selected Interests</Typography>
          </div>
          <div className="profile-card__border-wrapper__tags">
            {tags.map((item, index) => (
              <CategoryTag key={index} tagTitle={item} />
            ))}
          </div>
        </div> */}
        <div className="profile-card__border-wrapper">
          <div className="profile-card__border-wrapper__edit">
            <Typography className="bolded-text">Your Information</Typography>
            {editData.information && (
              <Typography
                variant={TypographyVariant.CAPTION}
                weight={TypographyWeight.BOLD700}
                className="profile-card__border-wrapper__edit__action"
                onClick={() =>
                  setEditData({
                    ...editData,
                    information: !editData.information,
                  })
                }
              >
                Edit
              </Typography>
            )}
          </div>
          <div
            className={`profile-card__border-wrapper__input-wrapper ${
              editData.information ? '' : 'active'
            }`}
            onClick={() =>
              setEditData({
                ...editData,
                information: false,
              })
            }
          >
            <label>First name</label>
            <input
              value={newData.first_name}
              placeholder={newData.first_name || 'Name'}
              type="text"
              disabled={editData.information}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setNewData({ ...newData, first_name: e.target.value })
              }
            />
            {!editData.information && (
              <CancelXmark
                // @ts-ignore
                onClick={(event: Event) => {
                  event.stopPropagation();
                  handleCancelInput('information');
                }}
              />
            )}
          </div>
          <div
            className={`profile-card__border-wrapper__input-wrapper ${
              editData.information ? '' : 'active'
            }`}
            onClick={() =>
              setEditData({
                ...editData,
                information: false,
              })
            }
          >
            <label>Last name</label>
            <input
              value={newData.last_name}
              placeholder={newData.last_name || 'Last Name'}
              type="text"
              disabled={editData.information}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setNewData({ ...newData, last_name: e.target.value })
              }
            />
            {!editData.information && (
              <CancelXmark
                // @ts-ignore
                onClick={(event: Event) => {
                  event.stopPropagation();
                  handleCancelInput('information');
                }}
              />
            )}
          </div>
        </div>
        <div className="profile-card__border-wrapper">
          <div className="profile-card__border-wrapper__edit">
            <Typography className="bolded-text">Account details</Typography>
            {editData.account && (
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
            )}
          </div>
          <div
            className={`profile-card__border-wrapper__input-wrapper ${
              editData.account ? '' : 'active'
            }`}
            onClick={() => setEditData({ ...editData, account: false })}
          >
            <label>Email</label>
            {/* TODO: billing. value={email from state} */}
            <input
              value={newData.email}
              placeholder={newData.email || 'your@email.com'}
              type="email"
              className="email-input"
              disabled={editData.account}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setNewData({ ...newData, email: e.target.value })
              }
            />
            {!editData.account && (
              <CancelXmark
                // @ts-ignore
                onClick={(event: Event) => {
                  event.stopPropagation();
                  handleCancelInput('account');
                }}
              />
            )}
          </div>
          <div
            className={`profile-card__border-wrapper__input-wrapper ${
              editData.account ? '' : 'active'
            }`}
            onClick={() => setEditData({ ...editData, account: false })}
          >
            <label>Password</label>
            {/* TODO: billing. value={pasw from state}  not sure if this a good decision*/}
            <input
              value={newData.password}
              type="password"
              disabled={editData.account}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setNewData({ ...newData, password: e.target.value })
              }
            />
            {!editData.account && (
              <CancelXmark
                // @ts-ignore
                onClick={(event: Event) => {
                  event.stopPropagation();
                  handleCancelInput('account');
                }}
              />
            )}
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
