import { ChangeEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { MobileFilter } from 'src/Components/MobileFilter/MobileFilter';
import { useMediaQuery } from 'src/hooks';
import { trendingInfluencersSelector } from 'src/state/reduxstate/influencers/selectors';
import { fetchTrendingInfluencers } from 'src/state/reduxstate/influencers/thunks';
import {
  InfluencerFilterKeys,
  SubmenuFilters,
  tags,
} from 'src/state/reduxstate/projects/types';
import { useAppDispatch } from 'src/state/reduxstate/store';
import { userTokenSelector } from 'src/state/reduxstate/user/selectors';
import { icons } from 'src/utils/icons';
import {
  Typography,
  TypographyVariant,
  TypographyWeight,
} from '../../Typography';
import { CategoryTags } from '../types';
import './InfluencersTable.scss';
import { InfluencersTableRows } from './InfluencersTableRows';

const FILTERS = [
  { title: 'Followers', key: InfluencerFilterKeys.FOLLOWERS },
  // { title: 'Bullseye', key: InfluencerFilterKeys.BULLSEYE },
];

interface InfluencersTableProps {
  filter: SubmenuFilters;
}

export const InfluencersTable: React.FC<InfluencersTableProps> = ({
  filter,
}) => {
  const dispatch = useAppDispatch();
  const token = useSelector(userTokenSelector);
  const trendingInfluencersData = useSelector(trendingInfluencersSelector);
  const trendingInfluencers = trendingInfluencersData.trending_influencers;
  const [takeProjects, setTakeProjects] = useState(0);
  const [nameFilter, setNameFilter] = useState<null | string>(null);
  const [inflFilterValue, setInflFilterValue] =
    useState<InfluencerFilterKeys | null>(null);
  const [categoryFilterValue, setCategoryFilterValue] =
    useState<CategoryTags | null>(null);
  const handleFilters = (filterKey: InfluencerFilterKeys) => {
    setInflFilterValue(filterKey);
  };
  const { isTablet } = useMediaQuery();

  useEffect(() => {
    if (token) {
      dispatch(
        fetchTrendingInfluencers({
          dateFilter: filter,
          tokenValue: token,
          skip: takeProjects,
          take: 10,
          filterByName: nameFilter,
          filterByFollowers: inflFilterValue === InfluencerFilterKeys.FOLLOWERS,
          filterByCategoryValue: categoryFilterValue,
        })
      );
    }
  }, [
    filter,
    dispatch,
    takeProjects,
    token,
    categoryFilterValue,
    inflFilterValue,
    nameFilter,
  ]);

  const handleCategorySelection = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setCategoryFilterValue(e.target.value as CategoryTags);
  };

  const handleNameInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.value.length >= 3) {
      setNameFilter(e.target.value);
    } else if (e.target.value.length === 0) {
      setNameFilter(null);
    }
  };

  const handlePrevousBtn = () => {
    if (takeProjects > 0) {
      setTakeProjects(takeProjects - 10);
    }
  };

  const handleNextBtn = () => {
    setTakeProjects(takeProjects + 10);
  };

  return (
    <div className="influencers-picks">
      <div className="influencers-picks__filters">
        <div className="influencers-picks__filters__input-wrapper">
          <img
            className="influencers-picks__filters__input-wrapper__magnifier"
            src={icons.search_magnifier}
            alt="Filter by name"
          />
          <input
            className="influencers-picks__filters__input-wrapper__input"
            type="text"
            placeholder="Filter by name..."
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleNameInputChange(e)
            }
          />
        </div>
        {!isTablet && (
          <div className="influencers-picks__filters__sort">
            <Typography
              variant={TypographyVariant.SUBHEADING}
              weight={TypographyWeight.BOLD700}
            >
              Sort by:
            </Typography>
            <Typography
              className="influencers-picks__filters__sort__option"
              onClick={() => handleFilters(InfluencerFilterKeys.FOLLOWERS)}
            >
              Followers
            </Typography>
            {/* <Typography
              className="influencers-picks__filters__sort__option"
              onClick={() => handleFilters(InfluencerFilterKeys.BULLSEYE)}
            >
              Bullseye
            </Typography> */}
            <select
              className="select"
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                handleCategorySelection(e)
              }
            >
              <option value="category" defaultValue="category">
                Category
              </option>
              {tags.map((item, index) => (
                <option key={index} value={item as CategoryTags}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        )}
        {isTablet && (
          <MobileFilter
            whatFiltering="influencers"
            // influencersCallBack={callBack}
            options={FILTERS}
            hasCategory
            // categoryCallBack={categoryCallBack}
          />
        )}
      </div>
      <InfluencersTableRows influencersData={trendingInfluencers} />
      <div className="influencers-picks__pagination-wrapper">
        <div>
          <strong>{trendingInfluencersData.page} </strong>of{' '}
          {trendingInfluencersData.pages}
        </div>
        <button
          className="influencers-picks__pagination-wrapper__prev"
          onClick={handlePrevousBtn}
        >
          {'<'}
        </button>
        <button
          className="influencers-picks__pagination-wrapper__next"
          onClick={handleNextBtn}
        >
          {'>'}
        </button>
      </div>
    </div>
  );
};
