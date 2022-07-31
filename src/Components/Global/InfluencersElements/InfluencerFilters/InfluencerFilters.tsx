import { Dispatch, SetStateAction } from 'react';
import {
  InfluencerFilterKeys,
  tags,
} from 'src/state/reduxstate/projects/types';
import { icons } from 'src/utils/icons';
import { CategoryTags } from '../../TrendsElements/types';
import {
  Typography,
  TypographyVariant,
  TypographyWeight,
} from '../../Typography';

import './InfluencerFilters.scss';

const FILTERS = [
  { title: 'Top Expert', key: InfluencerFilterKeys.TOP_EXPERT },
  { title: 'Most followers', key: InfluencerFilterKeys.FOLLOWERS },
  { title: 'Most active', key: InfluencerFilterKeys.MOST_ACTIVE },
  { title: 'Bullseye', key: InfluencerFilterKeys.BULLSEYE },
  { title: 'First mover', key: InfluencerFilterKeys.FIRST_MOVER },
  { title: 'Reviewer', key: InfluencerFilterKeys.REVIEWER },
  { title: 'Influence rate', key: InfluencerFilterKeys.RATE },
];

interface InfluencerFiltersProps {
  callBack: Dispatch<SetStateAction<InfluencerFilterKeys>>;
}

export const InfluencerFilters: React.FC<InfluencerFiltersProps> = ({
  callBack,
}) => {
  const handleFilters = (filterKey: InfluencerFilterKeys) => {
    callBack(filterKey);
  };

  return (
    <div className="influencer-filters">
      <div className="influencer-filters__input-wrapper">
        <img
          className="influencer-filters__input-wrapper__magnifier"
          src={icons.search_magnifier}
          alt="Filter by name"
        />
        <input
          className="influencer-filters__input-wrapper__input"
          type="text"
          placeholder="Filter by name..."
        />
      </div>
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
    </div>
  );
};
