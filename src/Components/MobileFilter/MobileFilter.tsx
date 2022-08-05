import React, { Dispatch, SetStateAction, useState } from 'react';
import {
  InfluencerFilterKeys,
  ProjectFilterKeys,
  tags,
} from 'src/state/reduxstate/projects/types';
import { icons } from 'src/utils/icons';
import { CategoryTags } from '../Global/TrendsElements/types';
import { Typography, TypographyVariant } from '../Global/Typography';
import './MobileFilter.scss';

interface FilterOption {
  title: string;
  key: ProjectFilterKeys | InfluencerFilterKeys;
}

interface MobileFilterProps {
  options: FilterOption[];
  whatFiltering?: 'projects' | 'influencers';
  projectsCallBack?: Dispatch<SetStateAction<ProjectFilterKeys>>;
  influencersCallBack?: Dispatch<SetStateAction<InfluencerFilterKeys>>;
  categoryCallBack?: Dispatch<SetStateAction<CategoryTags | string>>;
  hasCategory?: boolean;
}

export const MobileFilter: React.FC<MobileFilterProps> = ({
  projectsCallBack,
  influencersCallBack,
  categoryCallBack,
  whatFiltering,
  hasCategory,
  options,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [value, setValue] = useState<
    ProjectFilterKeys | InfluencerFilterKeys | null
  >(null);

  const [showCategoryOptions, setShowCategoryOptions] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryTags | null>(
    null
  );

  const handleOptionSelect = (
    optionValue: ProjectFilterKeys | InfluencerFilterKeys
  ) => {
    setValue(optionValue);
    setShowDropdown(false);
    if (whatFiltering === 'projects' && projectsCallBack) {
      projectsCallBack(optionValue as ProjectFilterKeys);
    } else if (whatFiltering === 'influencers' && influencersCallBack) {
      influencersCallBack(optionValue as InfluencerFilterKeys);
    }
  };

  const handleCategorySelect = (category: CategoryTags) => {
    setSelectedCategory(category);
    setShowCategoryOptions(false);
    setShowDropdown(false);
    if (categoryCallBack && projectsCallBack) {
      projectsCallBack(ProjectFilterKeys.CATEGORY);
      categoryCallBack(category);
    } else if (influencersCallBack && categoryCallBack) {
      influencersCallBack(InfluencerFilterKeys.CATEGORY);
      categoryCallBack(category);
    }
  };

  return (
    <div className="mobile-filters">
      <img
        src={icons.filter_icon}
        alt="filters"
        onClick={() => setShowDropdown(!showDropdown)}
      />
      {showDropdown && (
        <ul className="mobile-filters__dropdown">
          {options.map(({ title, key }, index) => (
            <li
              key={index}
              onClick={() =>
                handleOptionSelect(
                  key as unknown as ProjectFilterKeys | InfluencerFilterKeys
                )
              }
              className={`mobile-filters__dropdown__option ${
                value === key ? 'selected' : ''
              }`}
            >
              {title}
            </li>
          ))}
          {hasCategory && (
            <>
              <div
                className="mobile-filters__category-title"
                onClick={() => setShowCategoryOptions(!showCategoryOptions)}
              >
                <Typography>
                  {showCategoryOptions || !selectedCategory
                    ? 'Category'
                    : selectedCategory}
                </Typography>
                <img
                  className={`mobile-filters__category-title__arrow ${
                    showCategoryOptions ? 'selected' : ''
                  }`}
                  src={icons.arrow_down}
                  alt="Select category"
                />
              </div>
            </>
          )}
          {showCategoryOptions && (
            <ul className="mobile-filters__dropdown category-dropdown">
              {tags.map((item, index) => (
                <li
                  className={`mobile-filters__dropdown__option ${
                    selectedCategory === item ? 'selected' : ''
                  }`}
                  key={index}
                  onClick={() => handleCategorySelect(item)}
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
        </ul>
      )}
    </div>
  );
};
