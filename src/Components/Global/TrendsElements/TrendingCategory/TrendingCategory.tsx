import { Dispatch, SetStateAction, useState } from 'react';

import {
  Typography,
  TypographyVariant,
  TypographyWeight,
} from '../../Typography';
import { TrendingProjectCard } from '../TrendingProjectCard/TrendingProjectCard';
import './TrendingCategory.scss';
import { TrendsCategoryEllipse } from './TrendsCategoryEllipse';
import { CategoryTags } from '../types';
import { TrendingProject } from 'src/state/reduxstate/projects/types';
import { LoadError } from '../../LoadError/LoadError';
import { useMediaQuery } from 'src/hooks';
import { icons } from 'src/utils/icons';
import { CustomSelectDropdown } from './CustomSelectDropdown';

interface TrendingCategoryProps {
  trendingProjects: TrendingProject[];
  categoryCallback: Dispatch<SetStateAction<CategoryTags>>;
}

export const TrendingCategory: React.FC<TrendingCategoryProps> = ({
  trendingProjects,
  categoryCallback,
}) => {
  const { isTablet } = useMediaQuery();
  const [showProjects, setShowProjects] = useState(false);

  return (
    <div className="Category">
      <div className="Category__block">
        <div className="Category__svg-wrapper">
          <TrendsCategoryEllipse categoryType={CategoryTags.coins} />
        </div>
        <Typography className="Category__title">
          {CategoryTags.coins}
        </Typography>
        <Typography className="Category__subtitle">
          The most discussed category today
        </Typography>
        <CustomSelectDropdown categoryCallBack={categoryCallback} />
      </div>
      {isTablet && (
        <div
          className="Category__expand-toggle"
          onClick={() => setShowProjects(!showProjects)}
        >
          <img src={icons.finger_tap} alt="Toggle projects" />
          <Typography>
            {showProjects ? 'tap to shrink' : 'tap to expand'}
          </Typography>
        </div>
      )}
      {(showProjects || !isTablet) && (
        <>
          <Typography
            className="Category__block-title"
            variant={TypographyVariant.HEADING_SMALL}
            weight={TypographyWeight.BOLD}
          >
            Trending Projects
          </Typography>
          <Typography className="Category__block-subtitle">Today</Typography>
          {trendingProjects ? (
            <ul className="Category__projects-wrapper">
              {trendingProjects.map((item, index) => (
                <TrendingProjectCard
                  key={item.id}
                  rankNumber={index + 1}
                  projectTitle={item.name}
                  mentions={item.additional}
                  categoryTitle={item.tag.name as CategoryTags}
                  img={item.img || icons.no_image}
                />
              ))}
            </ul>
          ) : (
            <LoadError />
          )}
        </>
      )}
    </div>
  );
};
