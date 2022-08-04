import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { useSelector } from 'react-redux';
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
}

export const InfluencersTable: React.FC<InfluencersTableProps> = ({
  influencersData,
  callBack,
  nameFilterCallBack,
  categoryCallBack,
}) => {
  const pages = useSelector(influencersPagesSelector);
  const handleFilters = (filterKey: InfluencerFilterKeys) => {
    callBack(filterKey);
  };

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

  console.log(pages);

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
          <Typography
            className="influencers-picks__filters__sort__option"
            onClick={() => handleFilters(InfluencerFilterKeys.BULLSEYE)}
          >
            Bullseye
          </Typography>
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
      </div>
      <InfluencersTableRows influencersData={influencersData} />
      <div className="influencers-picks__pagination-wrapper">
        <div>
          <strong>{pages.page} </strong>of {pages.pages}
        </div>
        <div className="influencers-picks__pagination-wrapper__prev">{'<'}</div>
        <div className="influencers-picks__pagination-wrapper__next">{'>'}</div>
      </div>
    </div>
  );
};
