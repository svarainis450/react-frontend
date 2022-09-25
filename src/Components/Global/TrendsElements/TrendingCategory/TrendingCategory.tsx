import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import {
  Typography,
  TypographyVariant,
  TypographyWeight,
} from '../../Typography';
import { TrendingProjectCard } from '../TrendingProjectCard/TrendingProjectCard';
import './TrendingCategory.scss';
import { TrendsCategoryEllipse } from './TrendsCategoryEllipse';
import { CategoryTags } from '../types';
import {
  Statuses,
  SubmenuFilters,
  TrendingProject,
} from 'src/state/reduxstate/projects/types';
import { LoadError } from '../../LoadError/LoadError';
import { useMediaQuery } from 'src/hooks';
import { icons } from 'src/utils/icons';
import { CustomSelectDropdown } from './CustomSelectDropdown';
import { useAppDispatch } from 'src/state/reduxstate/store';
import { useSelector } from 'react-redux';
import { userTokenSelector } from 'src/state/reduxstate/user/selectors';
import { fetchTrendingProjects } from 'src/state/reduxstate/projects/thunks';
import { trendingProjectsSelector } from 'src/state/reduxstate/projects/selectors';
import { Loader } from '../../Loader/Loader';

interface TrendingCategoryProps {
  trendingProjects: TrendingProject[];
  categoryCallback: Dispatch<SetStateAction<CategoryTags | undefined>>;
  filterTitle: string;
}

export const TrendingCategory: React.FC<TrendingCategoryProps> = ({
  categoryCallback,
  filterTitle,
}) => {
  const { isTablet } = useMediaQuery();
  const [showProjects, setShowProjects] = useState(false);
  const trendingProjects = useSelector(trendingProjectsSelector);

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
      {isTablet && !showProjects && (
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
          <Typography className="Category__block-subtitle">
            {filterTitle}
          </Typography>
          {trendingProjects ? (
            <ul className="Category__projects-wrapper">
              {trendingProjects.map(
                (
                  {
                    category,
                    project_name,
                    mentions_num,
                    project_img_url,
                    project_id,
                  },
                  index
                ) => (
                  <TrendingProjectCard
                    key={index}
                    id={project_id}
                    rankNumber={index + 1}
                    projectTitle={project_name}
                    mentions={mentions_num}
                    categoryTitle={category as unknown as CategoryTags}
                    img={project_img_url || icons.no_image}
                  />
                )
              )}
            </ul>
          ) : (
            <LoadError />
          )}
          {isTablet && showProjects && (
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
        </>
      )}
    </div>
  );
};
