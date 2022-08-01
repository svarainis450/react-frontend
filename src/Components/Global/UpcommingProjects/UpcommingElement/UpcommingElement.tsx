import { useMediaQuery } from 'src/hooks';
import { icons } from 'src/utils/icons';
import { TalkRateElement } from '../../TalkRateElement/TalkRateElement';
import { CategoryTag } from '../../TrendsElements/CategoryTag/CategoryTag';
import { CategoryTags } from '../../TrendsElements/types';

import {
  Typography,
  TypographyVariant,
  TypographyWeight,
} from '../../Typography';
import './UpcommingElement.scss';

export const UpcommingElement: React.FC = () => {
  const { isTablet } = useMediaQuery();

  return (
    <div className="upcomming-element">
      {!isTablet && (
        <>
          <div>
            <Typography className="grey-text">#1</Typography>
          </div>
          <img className="project-icon" src={icons.no_image} alt="name" />
          <div>
            <Typography weight={TypographyWeight.MEDIUM}>
              Stellar (XML)
            </Typography>
            <CategoryTag tagTitle={CategoryTags.coins} />
          </div>
          <div className="project-desc">
            <Typography
              weight={TypographyWeight.THIN}
              variant={TypographyVariant.TEXT_SMALL}
              className="grey-text"
            >
              Welcome to Modern Poker Club, a community of poker players whose
              purpose is to bring more entertainment to poker and ...
            </Typography>
          </div>
          <div className="project-opening ">
            <Typography variant={TypographyVariant.TEXT_SMALL}>
              Opening in
            </Typography>
            <Typography weight={TypographyWeight.BOLD700}>3 days</Typography>
          </div>
          <TalkRateElement rate={67} />
          <img src={icons.positive_element} alt="positive" />
          <img src={icons.bull_element} alt="bull" />
          <button>Learn More</button>
        </>
      )}
      {isTablet && (
        <>
          <div className="upcomming-element__mobile-wrapper bordered">
            <img className="project-icon" src={icons.no_image} alt="name" />
            <div>
              <Typography weight={TypographyWeight.MEDIUM} className="title">
                Stellar (XML)
              </Typography>
              <CategoryTag tagTitle={CategoryTags.coins} />
            </div>
            <button>Learn More</button>
          </div>
          <div className="project-desc">
            <Typography
              weight={TypographyWeight.THIN}
              variant={TypographyVariant.TEXT_SMALL}
              className="grey-text"
            >
              Welcome to Modern Poker Club, a community of poker players whose
              purpose is to bring more entertainment to poker and ...
            </Typography>
          </div>
          <div className="upcomming-element__mobile-wrapper">
            <div className="project-opening ">
              <Typography variant={TypographyVariant.CAPTION}>
                Opening in
              </Typography>
              <Typography
                variant={TypographyVariant.DEFAULT}
                weight={TypographyWeight.BOLD700}
              >
                3 days
              </Typography>
            </div>
            <TalkRateElement rate={67} />
            <img src={icons.positive_element} alt="positive" />
            <img src={icons.bull_element} alt="bull" />
          </div>
        </>
      )}
    </div>
  );
};
