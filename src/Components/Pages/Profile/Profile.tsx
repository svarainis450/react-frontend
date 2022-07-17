import { ProfileCard, ProfileNavigation } from 'src/Components/Global';
import { LoggedInLayout } from 'src/Components/layouts/LoggedInLayout';
import './Profile.scss';

export const Profile: React.FC = () => {
  return (
    <div className="profile">
      <LoggedInLayout>
        <section className="profile__wrapper">
          <ProfileCard />
          <div className="profile__wrapper__container">
            <ProfileNavigation />
          </div>
        </section>
      </LoggedInLayout>
    </div>
  );
};
