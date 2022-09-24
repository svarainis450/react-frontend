import { PaymentOptions, priceOptions } from '../PaymentOptions';
import { FunnelTopProps } from './types';
import 'react-image-gallery/styles/css/image-gallery.css';
import ImageGallery from 'react-image-gallery';
import { useContext, useMemo, useState, useEffect } from 'react';

import './FunnelTop.scss';
import { images, imagesMobile } from './constants';
import { HeroTitle } from '../HeroTitle';
import { Button } from '../Button';
import { StatisticsHero } from '../StatisticsHero';
import { FAQ, potatoItems, potatoProItems, potatoDefaultItems } from '../FAQ';
import { useMediaQuery } from '../../../hooks';
import { UserContext } from '../../../state/userContext';
import { Link } from 'react-router-dom';
import { LinkList } from '../../../types';
import { useCookies } from 'react-cookie';

export const FunnelTop = ({
  currentPricingOption,
  setCurrentPricingOption,
}: FunnelTopProps) => {
  const [getCookie, setCookie] = useCookies(['currencySymbol']);
  const { setUser } = useContext(UserContext);
  const [isSelectedm, setIsSelected] = useState(1);
  const { isDesktop } = useMediaQuery();
  const selectedPlan = useMemo(
    () => priceOptions[currentPricingOption][isSelectedm],
    [currentPricingOption, isSelectedm]
  );

  useEffect(() => {
    setUser((prev) => ({ ...prev, selectedPlan }));
  }, [selectedPlan, setUser]);
  var currencySymbol = getCookie.currencySymbol;

  return (
    <div className="FunnelTop">
      <div className="FunnelTop__wrappper">
        <div className="FunnelTop__gallery-wrapper">
          <ImageGallery
            items={isDesktop ? imagesMobile : images}
            showPlayButton={false}
            showFullscreenButton={false}
            showNav={false}
            showBullets
            additionalClass="FunnelTop__gallery"
          />
        </div>

        <div className="FunnelTop__pricing">
          <HeroTitle title="Easiest way to find the next x100 Gem" />

          <PaymentOptions
            minimal
            currentOption={currentPricingOption}
            setCurrentPricingOption={setCurrentPricingOption}
            isSelected={isSelectedm}
            isSelectedHandler={setIsSelected}
          />

          <Link to={LinkList.Checkout}>
            <Button className="FunnelTop__cta desktop">
              <>
                Buy now - {currencySymbol}
                {selectedPlan?.begin_price || ''}
              </>
            </Button>
          </Link>

          <StatisticsHero className="FunnelTop__stats" />

          <FAQ
            noTitle
            noCta
            className="FunnelTop__accordeon"
            faqItems={
              isSelectedm === 0
                ? [potatoDefaultItems, ...potatoItems]
                : [potatoProItems, ...potatoItems]
            }
          />
        </div>
      </div>
    </div>
  );
};
