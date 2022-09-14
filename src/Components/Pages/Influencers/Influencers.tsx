import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Element } from 'react-scroll';

import {
  InfluencerCard,
  InfluencerFilters,
  Loader,
  LoadError,
} from 'src/Components/Global';
import { Button } from 'src/Components/Global/Button';
import { Submenu } from 'src/Components/Global/Submenu';
import { LoggedInLayout } from 'src/Components/layouts/LoggedInLayout';
import {
  influencersCountSelector,
  influencersSelector,
} from 'src/state/reduxstate/projects/selectors';
import { fetchInfluencers } from 'src/state/reduxstate/projects/thunks';
import {
  InfluencerFilterKeys,
  Statuses,
} from 'src/state/reduxstate/projects/types';
import { useAppDispatch } from 'src/state/reduxstate/store';
import { scrollToElement } from 'src/utils/scrollers';
import { submenuList } from '../Discover/Discover';

import './Influencers.scss';

export const Influencers: React.FC = () => {
  const influencers = useSelector(influencersSelector);
  const influencersCount = useSelector(influencersCountSelector);
  const dispatch = useAppDispatch();
  const [influencersFilter, setInfluencersFilter] =
    useState<InfluencerFilterKeys>(InfluencerFilterKeys.NONE);
  const [filterValue, setFilterValue] = useState<string>('1');
  const [influencersStatus, setInfluencersStatus] = useState<Statuses>('idle');
  const [offsetCount, setOffsetCount] = useState(0);
  const notAllToShow = offsetCount < influencersCount;
  const influencersLeftToSee = influencersCount - offsetCount;
  const isLoadedInfluencers = influencers && influencers.length > 0;
  const [seenAll, setSeenAll] = useState('');

  useEffect(() => {
    if (!influencers || offsetCount > 0 || influencers.length < 52) {
      dispatch(
        fetchInfluencers({
          filter: influencersFilter,
          callBack: setInfluencersStatus,
          offset: offsetCount,
          filterValue: filterValue,
        })
      ).then(() => scrollToElement('infl-to-scroll'));
    }
  }, [influencersFilter, dispatch, offsetCount, filterValue]);

  const handleLoadMoreBtn = () => {
    if (notAllToShow && influencersLeftToSee >= 52) {
      setOffsetCount(offsetCount + 52);
    } else if (notAllToShow && influencersLeftToSee < 52) {
      setOffsetCount(offsetCount + influencersLeftToSee);
      const seenAll = 'You`ve seen it all';
      setSeenAll(seenAll);
    } else {
      const seenAll = 'You`ve seen it all';
      setSeenAll(seenAll);
    }
  };

  return (
    <div className="Influencers">
      <LoggedInLayout activeLink="Discover">
        <Submenu menuItems={submenuList} pageTitleMob="Discover" />
        <InfluencerFilters
          callBack={setInfluencersFilter}
          nameFilterCallBack={setFilterValue}
        />

        {influencersStatus === 'error' && <LoadError />}
        <div className="Influencers__wrapper">
          {influencersStatus === 'pending' && (
            <div className="Influencers__err-wrapper">
              <Loader width={50} height={50} />
            </div>
          )}
          {influencersStatus === 'error' ||
            (influencersStatus === 'success' && influencers.length === 0 && (
              <div className="Influencers__err-wrapper">
                <LoadError />
              </div>
            ))}
          {(influencersStatus === 'success' || isLoadedInfluencers) &&
            influencers.map(({ id, ...rest }, index) => (
              <Element
                key={id}
                name={
                  index + 1 === offsetCount ? 'infl-to-scroll' : 'no-scroll'
                }
              >
                <InfluencerCard id={id} {...rest} />
              </Element>
            ))}
        </div>
        {influencersStatus === 'pending' && isLoadedInfluencers && (
          <Loader width={50} height={50} />
        )}

        {notAllToShow &&
          influencersStatus !== 'pending' &&
          isLoadedInfluencers && (
            <Button
              className="load-more-btn"
              onClick={() => handleLoadMoreBtn()}
            >
              Load more
            </Button>
          )}
      </LoggedInLayout>
    </div>
  );
};
