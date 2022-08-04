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
import { influencersSelector } from 'src/state/reduxstate/projects/selectors';
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
  const dispatch = useAppDispatch();
  const [influencersFilter, setInfluencersFilter] =
    useState<InfluencerFilterKeys>(InfluencerFilterKeys.NONE);
  const [filterValue, setFilterValue] = useState<string>('1');
  const [influencersStatus, setInfluencersStatus] = useState<Statuses>('idle');
  const [offsetCount, setOffsetCount] = useState(0);
  const notAllToShow = offsetCount < 3000;

  useEffect(() => {
    dispatch(
      fetchInfluencers({
        filter: influencersFilter,
        callBack: setInfluencersStatus,
        offset: offsetCount,
        filterValue: filterValue,
      })
    );
    scrollToElement('infl-to-scroll');
  }, [influencersFilter, dispatch, offsetCount, filterValue]);

  const handleLoadMoreBtn = () => {
    if (notAllToShow) {
      setOffsetCount(offsetCount + 50);
    } else {
      const seenAll = 'You`ve seen it all';
      return seenAll;
    }
  };

  return (
    <div className="Influencers">
      <LoggedInLayout>
        <Submenu menuItems={submenuList} />
        <InfluencerFilters
          callBack={setInfluencersFilter}
          nameFilterCallBack={setFilterValue}
        />
        {influencersStatus === 'pending' && <Loader />}
        {influencersStatus === 'error' && <LoadError />}
        <div className="Influencers__wrapper">
          {influencersStatus === 'success' &&
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
        {notAllToShow && influencersStatus !== 'pending' && (
          <Button onClick={() => handleLoadMoreBtn()}>Load more</Button>
        )}
      </LoggedInLayout>
    </div>
  );
};
