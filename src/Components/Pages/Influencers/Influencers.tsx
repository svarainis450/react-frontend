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
import { useInfluencersFilters } from 'src/hooks';
import { influencersDataSelector } from 'src/state/reduxstate/influencers/selectors';
import { fetchInfluencers } from 'src/state/reduxstate/influencers/thunks';
import {
  InfluencerFilterKeys,
  Statuses,
} from 'src/state/reduxstate/projects/types';
import { useAppDispatch } from 'src/state/reduxstate/store';
import { getFavInfluencers } from 'src/state/reduxstate/user/thunks';
import { scrollToElement } from 'src/utils/scrollers';
import { submenuList } from '../Discover/Discover';

import './Influencers.scss';

export const Influencers: React.FC = () => {
  const influencersData = useSelector(influencersDataSelector);
  const influencers = influencersData.influencers;
  const dispatch = useAppDispatch();
  const [influencersFilter, setInfluencersFilter] =
    useState<InfluencerFilterKeys>(InfluencerFilterKeys.NONE);
  const [nameFilterValue, setNameFilterValue] = useState<string | null>(null);
  const [influencersStatus, setInfluencersStatus] = useState<Statuses>('idle');
  const [skipElements, setSkipElements] = useState<number | null>(null);
  const skipElementsValue = skipElements === null ? 0 : skipElements;

  const influencersFilterValue = useInfluencersFilters(
    influencersFilter,
    nameFilterValue
  );
  const notAllToShow =
    skipElementsValue <
    Number(
      influencersData &&
        influencersData.meta !== undefined &&
        influencersData.meta.total !== undefined &&
        influencersData.meta.total
    );
  const influencersLeftToSee =
    Number(influencersData?.meta?.total) -
    Number(skipElements !== null && skipElements);
  const isLoadedInfluencers = influencers && influencers.length > 0;
  const [seenAll, setSeenAll] = useState('');
  const cardsPerOneRequest = 8;

  useEffect(() => {
    if (
      !influencers ||
      (skipElements && skipElements > 0) ||
      influencers.length < cardsPerOneRequest ||
      influencersFilterValue
    ) {
      dispatch(
        fetchInfluencers({
          filter: influencersFilterValue,
          callBack: setInfluencersStatus,
          skip: skipElements,
        })
      ).then(() => scrollToElement('infl-to-scroll'));
    }
  }, [skipElements, influencersFilterValue, cardsPerOneRequest]);

  const handleLoadMoreBtn = () => {
    if (notAllToShow && influencersLeftToSee >= cardsPerOneRequest) {
      setSkipElements(skipElementsValue + cardsPerOneRequest);
    } else if (notAllToShow && influencersLeftToSee < cardsPerOneRequest) {
      setSkipElements(skipElementsValue + influencersLeftToSee);
      const seenAll = 'You`ve seen it all';
      setSeenAll(seenAll);
    } else {
      const seenAll = 'You`ve seen it all';
      setSeenAll(seenAll);
    }
  };

  useEffect(() => {
    dispatch(getFavInfluencers());
  });

  return (
    <div className="Influencers">
      <LoggedInLayout activeLink="Discover">
        <Submenu menuItems={submenuList} pageTitleMob="Discover" />
        <InfluencerFilters
          callBack={setInfluencersFilter}
          nameFilterCallBack={setNameFilterValue}
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
            influencers.map(({ ...rest }, index) => (
              <Element
                key={index}
                name={
                  index + 1 === skipElements ? 'infl-to-scroll' : 'no-scroll'
                }
              >
                <InfluencerCard {...rest} />
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
