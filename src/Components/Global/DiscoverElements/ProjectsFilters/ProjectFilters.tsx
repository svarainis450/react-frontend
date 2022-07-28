import { Dispatch, SetStateAction } from 'react';
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
}

export const ProjectFilters: React.FC<ProjectFiltersProps> = ({ callBack }) => {
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
        />
      </div>
      <div className="project-filters__sort">
        <Typography
          variant={TypographyVariant.SUBHEADING}
          weight={TypographyWeight.BOLD700}
        >
          Sort by:
        </Typography>
        {FILTERS.map(({ title, key }) => (
          <Typography
            key={title}
            className="project-filters__sort__option"
            onClick={() => callBack(key)}
          >
            {title}
          </Typography>
        ))}

        <select
          className="select"
          //   onChange={(e: ChangeEvent<HTMLSelectElement>) =>
          //     handleCategorySelection(e)
          //   }
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
