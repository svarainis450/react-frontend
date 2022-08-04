import {
  ChangeEvent,
  ChangeEventHandler,
  Dispatch,
  SetStateAction,
  useState,
} from 'react';
import { ProjectFilterKeys, tags } from 'src/state/reduxstate/projects/types';
import { icons } from 'src/utils/icons';
import { CategoryTags } from '../../TrendsElements/types';
import {
  Typography,
  TypographyVariant,
  TypographyWeight,
} from '../../Typography';

import './ProjectFilters.scss';

const FILTERS = [
  { title: 'Talk Rate', key: ProjectFilterKeys.TALK_RATE },
  { title: 'Positive', key: ProjectFilterKeys.POSITIVE },
  { title: 'Negative', key: ProjectFilterKeys.NEGATIVE },
  { title: 'Bull', key: ProjectFilterKeys.BULL },
  { title: 'Bear', key: ProjectFilterKeys.BEAR },
  { title: 'Newest', key: ProjectFilterKeys.NEWEST },
  { title: 'Oldest', key: ProjectFilterKeys.OLDEST },
];

interface ProjectFiltersProps {
  callBack: Dispatch<SetStateAction<ProjectFilterKeys>>;
  categoryCallBack: Dispatch<SetStateAction<CategoryTags | string>>;
  nameFilterCallBack: Dispatch<SetStateAction<string>>;
}

export const ProjectFilters: React.FC<ProjectFiltersProps> = ({
  callBack,
  categoryCallBack,
  nameFilterCallBack,
}) => {
  const handleCategorySelection = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    callBack(ProjectFilterKeys.CATEGORY);
    categoryCallBack(e.target.value as CategoryTags);
  };

  const handleNameInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.value.length >= 3) {
      nameFilterCallBack(e.target.value);
      callBack(ProjectFilterKeys.NAME);
    } else if (e.target.value.length === 0) {
      callBack(ProjectFilterKeys.NONE);
      nameFilterCallBack('1');
    }
  };

  return (
    <div className="project-filters">
      <div className="project-filters__input-wrapper">
        <img
          className="project-filters__input-wrapper__magnifier"
          src={icons.search_magnifier}
          alt="Filter by name"
        />
        <input
          className="project-filters__input-wrapper__input"
          type="text"
          placeholder="Filter by name..."
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleNameInputChange(e)
          }
        />
      </div>
      <div className="project-filters__sort">
        <Typography
          variant={TypographyVariant.SUBHEADING}
          weight={TypographyWeight.BOLD700}
        >
          Sort by:
        </Typography>
        {FILTERS.map(({ title, key }, index) => (
          <Typography
            key={index}
            className="project-filters__sort__option"
            onClick={() => callBack(key)}
          >
            {title}
          </Typography>
        ))}

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
  );
};
