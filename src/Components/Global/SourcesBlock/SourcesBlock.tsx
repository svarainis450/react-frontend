import { HeroTitle } from "../HeroTitle";

import "./SourcesBlock.scss";
import Platforms from "src/Assets/images/landing/platforms.png";
import PlatformsMobile from "src/Assets/images/landing/platforms_mobile.png";

export const SourcesBlock = () => {
  return (
    <div className="SourcesBlock">
      <HeroTitle
        className="SourcesBlock__title"
        title="We’re hunting hidden gems in here:"
      />

      <div className="SourcesBlock__list">
        <picture>
          <source media="(max-width: 440px)" srcSet={PlatformsMobile} />
          <img src={Platforms} alt="" />
        </picture>
      </div>
    </div>
  );
};
