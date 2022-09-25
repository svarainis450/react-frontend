import { CategoryTags } from 'src/Components/Global/TrendsElements/types';
import { ProjectFilterKeys } from 'src/state/reduxstate/projects/types';

export const useProjectFilters = (
  filterValue: ProjectFilterKeys,
  categoryValue: CategoryTags | null,
  nameValue: string | null
) => {
  if (filterValue === ProjectFilterKeys.POSITIVE) {
    return '&orderBy=sentiment&order=DESC';
  } else if (filterValue === ProjectFilterKeys.NEGATIVE) {
    return '&orderBy=sentiment&order=ASC';
  } else if (filterValue === ProjectFilterKeys.NEWEST) {
    return '&orderBy=date&order=DESC';
  } else if (filterValue === ProjectFilterKeys.OLDEST) {
    return '&orderBy=date&order=ASC';
  } else if (filterValue === ProjectFilterKeys.TALK_RATE) {
    return '&orderBy=talk_rate&order=DESC';
  } else if (filterValue === ProjectFilterKeys.CATEGORY && categoryValue) {
    return `&category=${categoryValue.toLocaleLowerCase()}`;
  } else if (filterValue === ProjectFilterKeys.NAME && nameValue) {
    return `&search=${nameValue}`;
  } else {
    return '';
  }
};
