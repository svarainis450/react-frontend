import { ToggleButton } from '../../ToggleButton';
import {
  Typography,
  TypographyVariant,
  TypographyWeight,
} from '../../Typography';
import './NotificationsBlock.scss';

const CONTENT = [
  {
    id: 1,
    title: 'Influencers',
    desc: 'These are notifications to notify you when an influencer you follow writes about the project',
  },
  {
    id: 2,
    title: 'Upcoming projects',
    desc: 'These are notifications to notify you about the upcoming projects',
  },
  {
    id: 3,
    title: 'Projects you follow',
    desc: 'These are notifications to notify you when there is a change about the project you follow',
  },
  {
    id: 4,
    title: 'Reminders',
    desc: 'These are notifications to remind you of updates you might have missed.',
  },
];

export const NotificationsBlock: React.FC = () => (
  <div className="notifications-block">
    <Typography
      className="notifications-block title"
      variant={TypographyVariant.HEADING_SMALL}
    >
      Notification settings
    </Typography>
    <Typography
      className="grey-text"
      variant={TypographyVariant.SUBHEADING}
      weight={TypographyWeight.THIN}
    >
      We may still send you important notifications about your account outside
      of your notification settings.
    </Typography>
    {CONTENT.map(({ id, title, desc }) => (
      <div key={id} className="notifications-block__row">
        <div className="notifications-block__row__content flex">
          <div className="titles-wrapper">
            <Typography
              className="notif-title"
              weight={TypographyWeight.BOLD700}
            >
              {title}
            </Typography>
            <Typography
              className="grey-text"
              variant={TypographyVariant.SUBHEADING}
              weight={TypographyWeight.THIN}
            >
              {desc}
            </Typography>
          </div>
          <div>
            <div className="flex notif-title ">
              <ToggleButton onChange={() => console.log('push')} />
              <Typography className="toggle-title">Push</Typography>
            </div>
            <div className="flex notif-title">
              <ToggleButton onChange={() => console.log('email')} />
              <Typography className="toggle-title">Email</Typography>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
);
