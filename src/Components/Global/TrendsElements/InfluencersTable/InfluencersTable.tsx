import { ChangeEvent, useEffect, useState } from 'react';
import { Influencer, tags } from 'src/state/reduxstate/projects/types';
import { icons } from 'src/utils/icons';
import {
  Typography,
  TypographyVariant,
  TypographyWeight,
} from '../../Typography';
import { CategoryTags } from '../types';
import './InfluencersTable.scss';
import { InfluencersTableRows } from './InfluencersTableRows';

// export interface InfluencerData {
//   tagName: string;
//   name: string;
//   img: string;
//   followers: number;
//   bullseyeIndex: number;
//   category: CategoryTags;
//   postCount: number;
//   channel: string;
//   projectName: string;
//   projectImg: string;
//   linkToPost: string;
// }

interface InfluencersTableProps {
  influencersData: Influencer[];
}

type SortTypes = 'followers' | 'bullseye';

export const InfluencersTable: React.FC<InfluencersTableProps> = ({
  influencersData,
}) => {
  const [filteredInfluencers, setfilteredInfluencers] =
    useState<Influencer[]>(influencersData);
  const [sortType, setSortType] = useState<SortTypes | null>(null);

  useEffect(() => {
    if (sortType === 'bullseye') {
      const filterByBullseye = influencersData.sort(
        (a, b) => b.bullseye - a.bullseye
      );
      setfilteredInfluencers(filterByBullseye);
      setSortType(null);
    } else if (sortType === 'followers') {
      const filteredByFollowers = influencersData.sort(
        (a, b) => b.followers - a.followers
      );
      setfilteredInfluencers(filteredByFollowers);
      setSortType(null);
    } else {
      setfilteredInfluencers(influencersData);
    }
  }, [sortType, filteredInfluencers, influencersData]);

  // const handleCategorySelection = (option: ChangeEvent<HTMLSelectElement>) => {
  //   option.preventDefault();
  //   const optionValue = option.target.value;
  //   if (optionValue === 'category') {
  //     setfilteredInfluencers(influencersData);
  //   } else {
  //     const filteredByCategories = influencersData.filter(
  //       (item) => item.focus === (optionValue as CategoryTags)
  //     );
  //     setfilteredInfluencers(filteredByCategories);
  //   }
  // };

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
            onClick={() => setSortType('followers')}
          >
            Followers
          </Typography>
          <Typography
            className="influencers-picks__filters__sort__option"
            onClick={() => setSortType('bullseye')}
          >
            Bullseye
          </Typography>
          <select
            className="select"
            // onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            //   handleCategorySelection(e)
            // }
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
      <InfluencersTableRows influencersData={filteredInfluencers} />
    </div>
  );
};
