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

const tags = [
  CategoryTags.coins,
  CategoryTags.NFT,
  CategoryTags.DAO,
  CategoryTags.meta,
  CategoryTags.defi,
];

//TODO: remove this fake api response
const responseFromApi = [
  {
    id: 1,
    name: 'Shiba Inu',
    ticker: 'SHIB',
    additional: 'Mentioned 9999 times',
    tag: {
      name: 'Coins',
      color: '#FFF',
    },
  },
  {
    id: 2,
    name: 'Crypto punks',
    ticker: 'MANA',
    additional: 'Mentioned 9999 times',
    tag: {
      name: 'Coins',
      color: '#FFF',
    },
  },
];

export const TrendingCategory: React.FC = () => (
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
    <ul className="Category__projects-wrapper">
      {responseFromApi.map((item) => (
        <TrendingProjectCard
          key={item.id}
          projectTitle={item.name}
          mentions={item.additional}
          categoryTitle={item.tag.name as CategoryTags}
        />
      ))}
    </ul>
  </div>
);
