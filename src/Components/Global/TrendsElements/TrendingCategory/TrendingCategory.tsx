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
  filter: SubmenuFilters;
}

export const TrendingCategory: React.FC<TrendingCategoryProps> = ({
  categoryCallback,
  filterTitle,
  filter,
}) => {
  const dispatch = useAppDispatch();
  const token = useSelector(userTokenSelector);
  const { isTablet } = useMediaQuery();
  const [showProjects, setShowProjects] = useState(false);
  const [trendingStatus, setTrendingStatus] = useState<Statuses>('idle');
  const [selectCategory, setSelectCategory] = useState<
    CategoryTags | undefined
  >(undefined);
  const trendingProjects = useSelector(trendingProjectsSelector);

  useEffect(() => {
    if (token) {
      dispatch(
        fetchTrendingProjects({
          filter: filter,
          callBack: setTrendingStatus,
          categoryFilter: selectCategory,
          tokenValue: token,
        })
      );
    }
  }, [token, selectCategory, filter]);

  if (trendingStatus === 'pending') {
    return <Loader width={50} height={50} />;
  }

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
                    place,
                  },
                  index
                ) => (
                  <TrendingProjectCard
                    key={index}
                    id={place}
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
        </>
      )}
    </div>
  );
};
