import { InfluencerFilterKeys } from 'src/state/reduxstate/projects/types';

export const useInfluencersFilters = (
  filterValue: InfluencerFilterKeys,
  nameValue: string | null
) => {
  if (filterValue === InfluencerFilterKeys.FOLLOWERS) {
    return '&orderBy=twitter_followers&order=DESC';
  } else if (filterValue === InfluencerFilterKeys.INFLUENCE_RATE) {
    return '&orderBy=influence_score&order=DESC';
  } else if (filterValue === InfluencerFilterKeys.NAME && nameValue) {
    return `&search=${nameValue}`;
  } else {
    return '';
  }
};
