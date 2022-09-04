import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { useSelector } from 'react-redux';
import { MobileFilter } from 'src/Components/MobileFilter/MobileFilter';
import { useMediaQuery } from 'src/hooks';
import { influencersPagesSelector } from 'src/state/reduxstate/projects/selectors';
import {
  Influencer,
  InfluencerFilterKeys,
  tags,
} from 'src/state/reduxstate/projects/types';
import { icons } from 'src/utils/icons';
import {
  Typography,
  TypographyVariant,
  TypographyWeight,
} from '../../Typography';
import { CategoryTags } from '../types';
import './InfluencersTable.scss';
import { InfluencersTableRows } from './InfluencersTableRows';

interface InfluencersTableProps {
  influencersData: Influencer[];
  callBack: Dispatch<SetStateAction<InfluencerFilterKeys>>;
  categoryCallBack: Dispatch<SetStateAction<CategoryTags | string>>;
  nameFilterCallBack: Dispatch<SetStateAction<string>>;
  offsetCallBack: Dispatch<SetStateAction<number>>;
}

const FILTERS = [
  { title: 'Followers', key: InfluencerFilterKeys.FOLLOWERS },
  // { title: 'Bullseye', key: InfluencerFilterKeys.BULLSEYE },
];

export const InfluencersTable: React.FC<InfluencersTableProps> = ({
  influencersData,
  callBack,
  nameFilterCallBack,
  categoryCallBack,
  offsetCallBack,
}) => {
  const pages = useSelector(influencersPagesSelector);
  const [offsetCount, setOffsetCount] = useState(0);
  const handleFilters = (filterKey: InfluencerFilterKeys) => {
    callBack(filterKey);
    nameFilterCallBack('1');
  };
  const { isTablet } = useMediaQuery();

  const handleCategorySelection = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    callBack(InfluencerFilterKeys.CATEGORY);
    categoryCallBack(e.target.value as CategoryTags);
  };

  const handleNameInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.value.length >= 3) {
      nameFilterCallBack(e.target.value);
      callBack(InfluencerFilterKeys.NAME);
    } else if (e.target.value.length === 0) {
      callBack(InfluencerFilterKeys.NONE);
      nameFilterCallBack('1');
    }
  };

  const handlePrevousBtn = () => {
    if (offsetCount > 0) {
      setOffsetCount(offsetCount - 10);
      offsetCallBack(offsetCount - 10);
    }
  };

  const handleNextBtn = () => {
    setOffsetCount(offsetCount + 10);
    offsetCallBack(offsetCount + 10);
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
            influencersCallBack={callBack}
            options={FILTERS}
            hasCategory
            categoryCallBack={categoryCallBack}
          />
        )}
      </div>
      <InfluencersTableRows influencersData={influencersData} />
      <div className="influencers-picks__pagination-wrapper">
        <div>
          <strong>{pages.page} </strong>of {pages.pages}
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
