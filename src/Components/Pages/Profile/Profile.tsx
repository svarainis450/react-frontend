import { useSelector } from 'react-redux';
import {
  CardWrapper,
  NotificationsBlock,
  ProfileCard,
  ProfileNavigation,
} from 'src/Components/Global';
import { LoggedInLayout } from 'src/Components/layouts/LoggedInLayout';
import { profileBlockSelector } from 'src/state/reduxstate/user/selectors';
import { NavClassTypes } from 'src/state/reduxstate/user/types';
import { PrivacyPolicyContent } from '../PrivacyPolicy/PrivacyPolicyContent';
import { TermsContent } from '../TermsAndConditions/TermsContent';
import './Profile.scss';

const profileBlocks: {
  [key in NavClassTypes]: JSX.Element;
} = {
  notifications: <NotificationsBlock />,
  billing: <></>,
  terms: <TermsContent />,
  privacy: <PrivacyPolicyContent />,
};

export const Profile: React.FC = () => {
  const block = useSelector(profileBlockSelector);
  const ProfileBlock = block && profileBlocks[block];

  console.log(block);

  return (
    <div className="profile">
      <LoggedInLayout>
        <section className="profile__wrapper">
          <ProfileCard />
          <div className="profile__wrapper__container">
            <ProfileNavigation />
            <CardWrapper>{ProfileBlock}</CardWrapper>
          </div>
        </section>
      </LoggedInLayout>
    </div>
  );
};
