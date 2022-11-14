import { PaymentOptions, priceOptions } from "../PaymentOptions";
import { FunnelTopProps } from "./types";
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";
import { useContext, useMemo, useState, useEffect } from "react";

import "./FunnelTop.scss";
import { images, imagesMobile } from "./constants";
import { HeroTitle } from "../HeroTitle";
import { Button } from "../Button";
import { StatisticsHero } from "../StatisticsHero";
import { FAQ, potatoItems, potatoProItems, potatoDefaultItems } from "../FAQ";
import { useFunnel, useMediaQuery } from "../../../hooks";
import { UserContext } from "../../../state/userContext";
import { Link } from "react-router-dom";
import { LinkList } from "../../../types";
import { useCookies } from "react-cookie";
import { PRICE_OPTIONS_BIGGER } from "../PaymentOptions/constants";

export const FunnelTop = ({
  currentPricingOption,
  setCurrentPricingOption,
}: FunnelTopProps) => {
  const [getCookie] = useCookies(["currencySymbol"]);
  const { setUser } = useContext(UserContext);
  const [isSelectedm, setIsSelected] = useState(1);
  const { isDesktop } = useMediaQuery();
  const { getMembershipTitle, funnel } = useFunnel();
  const PRODUCTS = funnel === 5 ? PRICE_OPTIONS_BIGGER : priceOptions;
  const selectedPlan = useMemo(
    () => PRODUCTS[currentPricingOption][isSelectedm],
    [currentPricingOption, isSelectedm, PRODUCTS]
  );

  useEffect(() => {
    setUser((prev) => ({ ...prev, selectedPlan }));
  }, [selectedPlan, setUser]);
  var currencySymbol = getCookie.currencySymbol;

  console.log(selectedPlan);

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
          <HeroTitle title={getMembershipTitle()} />

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
                {selectedPlan.final_price || ""}
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
