import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { useSelector } from 'react-redux';
import { MobileFilter } from 'src/Components/MobileFilter/MobileFilter';
import { useMediaQuery } from 'src/hooks';
import { setModalType } from 'src/state/reduxstate/modals/slice';
import { ModalTypes } from 'src/state/reduxstate/modals/types';
import { InfluencerFilterKeys } from 'src/state/reduxstate/projects/types';
import { useAppDispatch } from 'src/state/reduxstate/store';
import { userDataSelector } from 'src/state/reduxstate/user/selectors';
import { icons } from 'src/utils/icons';
import {
  Typography,
  TypographyVariant,
  TypographyWeight,
} from '../../Typography';

import './InfluencerFilters.scss';

const FILTERS = [
  // { title: 'Top Expert', key: InfluencerFilterKeys.TOP_EXPERT },
  { title: 'Most followers', key: InfluencerFilterKeys.FOLLOWERS },
  // { title: 'Most active', key: InfluencerFilterKeys.MOST_ACTIVE },
  // { title: 'Bullseye', key: InfluencerFilterKeys.BULLSEYE },
  // { title: 'First mover', key: InfluencerFilterKeys.FIRST_MOVER },
  // { title: 'Reviewer', key: InfluencerFilterKeys.REVIEWER },
  { title: 'Influence rate', key: InfluencerFilterKeys.INFLUENCE_RATE },
];

interface InfluencerFiltersProps {
  callBack: Dispatch<SetStateAction<InfluencerFilterKeys>>;
  nameFilterCallBack: Dispatch<SetStateAction<string | null>>;
}

export const InfluencerFilters: React.FC<InfluencerFiltersProps> = ({
  callBack,
  nameFilterCallBack,
}) => {
  const dispatch = useAppDispatch();
  const { isTablet } = useMediaQuery();
  const { type } = useSelector(userDataSelector);

  const handleFilters = (filterKey: InfluencerFilterKeys) => {
    callBack(filterKey);
    nameFilterCallBack(null);
  };

  const handleNameInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.value.length >= 3) {
      nameFilterCallBack(e.target.value);
      callBack(InfluencerFilterKeys.NAME);
    } else if (e.target.value.length === 0) {
      callBack(InfluencerFilterKeys.NONE);
      nameFilterCallBack(null);
    }
  };

  const handlePremiumModal = () => {
    dispatch(setModalType(ModalTypes.UPGRADE_TO_PRO));
  };

  return (
    <div className="influencer-filters">
      <div
        className="influencer-filters__input-wrapper"
        onClick={handlePremiumModal}
      >
        <img
          className="influencer-filters__input-wrapper__magnifier"
          src={icons.search_magnifier}
          alt="Filter by name"
        />
        <input
          className="influencer-filters__input-wrapper__input"
          type="text"
          placeholder="Filter by name..."
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleNameInputChange(e)
          }
          disabled={type === 'Potato Starter' || !type}
        />
      </div>
      {!isTablet && (
        <div className="influencer-filters__sort">
          <Typography
            variant={TypographyVariant.SUBHEADING}
            weight={TypographyWeight.BOLD700}
          >
            Sort by:
          </Typography>
          {FILTERS.map(({ title, key }) => (
            <Typography
              key={title}
              className="influencer-filters__sort__option"
              onClick={() => handleFilters(key)}
            >
              {title}
            </Typography>
          ))}
        </div>
      )}
      {isTablet && (
        <MobileFilter
          whatFiltering="influencers"
          influencersCallBack={callBack}
          options={FILTERS}
        />
      )}
    </div>
  );
};
