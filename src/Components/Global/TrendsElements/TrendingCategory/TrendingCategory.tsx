import {
  Typography,
  TypographyVariant,
  TypographyWeight,
} from '../../Typography';
import { CategoryTag } from '../CategoryTag/CategoryTag';
import { TrendingProjectCard } from '../TrendingProjectCard/TrendingProjectCard';
import './TrendingCategory.scss';
import { TrendsCategoryEllipse } from './TrendsCategoryEllipse';
import { CategoryTags } from '../types';
import { TrendingProject } from 'src/state/reduxstate/projects/types';
import { LoadError } from '../../LoadError/LoadError';

const tags = [
  CategoryTags.coins,
  CategoryTags.NFT,
  CategoryTags.DAO,
  CategoryTags.meta,
  CategoryTags.defi,
];

interface TrendingCategoryProps {
  trendingProjects: TrendingProject[];
}

export const TrendingCategory: React.FC<TrendingCategoryProps> = ({
  trendingProjects,
}) => (
  <div className="Category">
    <div className="Category__block">
      <div className="Category__svg-wrapper">
        <TrendsCategoryEllipse categoryType={CategoryTags.coins} />
      </div>
      <Typography className="Category__title">{CategoryTags.coins}</Typography>
      <Typography className="Category__subtitle">
        The most discussed category today
      </Typography>
      <div className="Category__tags-wrapper">
        {tags.map((item, index) => (
          <CategoryTag key={index} tagTitle={item} />
        ))}
      </div>
    </div>
    <Typography
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
          />
        ))}
      </ul>
    ) : (
      <LoadError />
    )}
  </div>
);
