import { useSelector } from 'react-redux';
import {
  Account,
  Billing as BillingIcon,
  CommingSoon,
  Notifications,
  Privacy,
  Reports,
  Terms,
} from 'src/Assets/icons/IconElements';
import {
  Billing,
  CardWrapper,
  NotificationsBlock,
  ProfileCard,
  ProfileNavigation,
} from 'src/Components/Global';
import {
  Typography,
  TypographyVariant,
  TypographyWeight,
} from 'src/Components/Global/Typography';
import { LoggedInLayout } from 'src/Components/layouts/LoggedInLayout';
import { useMediaQuery } from 'src/hooks';
import { profileBlockSelector } from 'src/state/reduxstate/user/selectors';
import { NavClassTypes } from 'src/state/reduxstate/user/types';
import { PrivacyPolicyContent } from '../PrivacyPolicy/PrivacyPolicyContent';
import { TermsContent } from '../TermsAndConditions/TermsContent';
import './Profile.scss';

export const Profile: React.FC = () => {
  const block = useSelector(profileBlockSelector) as NavClassTypes;
  const { isDesktop } = useMediaQuery();

  const profileBlocks: {
    [key in NavClassTypes]: {
      element: JSX.Element;
      title: string;
      icon: JSX.Element;
    };
  } = {
    account: {
      element: isDesktop ? <ProfileCard /> : <></>,
      title: 'Account',
      icon: <Account />,
    },
    notifications: {
      element: <NotificationsBlock />,
      title: 'Notifications',
      icon: <Notifications />,
    },
    billing: { element: <Billing />, title: 'Billing', icon: <BillingIcon /> },
    terms: {
      element: <TermsContent />,
      title: 'Terms & Conditions',
      icon: <Terms />,
    },
    privacy: {
      element: <PrivacyPolicyContent />,
      title: 'Privacy Policy',
      icon: <Privacy />,
    },
    reports: {
      element: (
        <div className="comming-soon">
          <CommingSoon />
        </div>
      ),
      title: 'Reports',
      icon: <Reports />,
    },
  };

  const profileBlock = block && profileBlocks[block].element;
  const profileBlockTitle = block && profileBlocks[block].title;
  const profileBlockIcon = block && profileBlocks[block].icon;

  return (
    <div className="profile">
      <LoggedInLayout activeLink="Profile">
        <section className="profile__wrapper">
          {!isDesktop && <ProfileCard />}
          <div className="profile__wrapper__container">
            <ProfileNavigation />
            {isDesktop && (
              <div className="profile__wrapper__container__mob-title">
                {profileBlockIcon}
                <Typography
                  variant={TypographyVariant.HEADING_LARGE}
                  weight={TypographyWeight.MEDIUM}
                >
                  {profileBlockTitle}
                </Typography>
              </div>
            )}
            <CardWrapper>{profileBlock}</CardWrapper>
          </div>
        </section>
      </LoggedInLayout>
    </div>
  );
};
