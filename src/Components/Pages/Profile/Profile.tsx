import { ProfileCard } from 'src/Components/Global';
import { HeaderUser } from 'src/Components/Global/HeaderUser';
import { LoggedInLayout } from 'src/Components/layouts/LoggedInLayout';
import './Profile.scss';

export const Profile: React.FC = () => {
  return (
    <div className="profile">
      <LoggedInLayout>
        <section className="profile__wrapper">
          <ProfileCard />
        </section>
      </LoggedInLayout>
    </div>
  );
};
