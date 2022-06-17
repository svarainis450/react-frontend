import { HeroTitle } from "../HeroTitle";
import { FixedTooltip } from "../FixedTooltip";

import potatoImg from "../../../Assets/images/bigPotato.svg";
import arrowToRight from "../../../Assets/images/potatoFacts/arrowToRight.svg";
import arrowToLeft from "../../../Assets/images/potatoFacts/arrowToLeft.svg";
import btnImg from "../../../Assets/images/potatoFacts/btnImg.svg";

import "./PotatoFactsBlock.scss";
import { useState } from "react";

export const PotatoFactsBlock = () => {
  const [factOneOpen, setFactOneOpen] = useState(false)
  const [factTwoOpen, setFactTwoOpen] = useState(false)

  return (
    <div className="PotatoFactsBlock">
      <div className="PotatoFactsBlock__content">
        <HeroTitle 
          className='PotatoFactsBlock__hero'
          title="Potato Facts"
          subtitle='We’re calling this Potato because in ancient Greece...just kidding, it’s just a funny name. Nevertheless, Potato is a pretty badass vegetable. Check some of the severe historical facts about Potatoes bellow:'
        />

        <div className="desktop">
          <div className="PotatoFactsBlock__facts">
            <div className="PotatoFactsBlock__left-fact">

              <div className="PotatoFactsBlock__dsc">
                <p className="PotatoFactsBlock__dsc_title">Potatoes were worth gold</p>
                <p className="PotatoFactsBlock__dsc_subtitle">During the Alaskan Klondike gold rush, (1897-1898) potatoes were practically worth their weight in gold. Potatoes were so valued for their vitamin C content that miners traded gold for potatoes. On the South Atlantic Island of Tristan de Cunha, potatoes were once used as the country's unofficial currency.</p>
              </div>

              <img src={arrowToRight} alt="arrowToRight" />
            </div>

            <img className="PotatoFactsBlock__mainimg" src={potatoImg} alt="potatoImg" />

            <div className="PotatoFactsBlock__right-fact">
              <img src={arrowToLeft} alt="arrowToLeft" />

              <div className="PotatoFactsBlock__dsc">
                <p className="PotatoFactsBlock__dsc_title">Badass vegetable grown in space</p>
                <p className="PotatoFactsBlock__dsc_subtitle">In October 1995, the potato became the first vegetable to be grown in space. NASA and the University of Wisconsin, Madison, created the technology with the goal of feeding astronauts on long space voyages, and eventually, feeding future space colonies.</p>
              </div>

            </div>
          </div>
        </div>

        <div className="mobile">
          <div className="PotatoFactsBlock__facts">

            {factOneOpen && (
              <FixedTooltip 
                closeTooltip={() => setFactOneOpen(false)}
                title='Badass vegetable grown in space'
                subtitle='In October 1995, the potato became the first vegetable to be grown in space. NASA and the University of Wisconsin, Madison, created the technology with the goal of feeding astronauts on long space voyages, and eventually, feeding future space colonies.'
                color="#FB6E2B"
                textColor="#FFFFFF"
                isLight
              />
            )}

            <div className="PotatoFactsBlock__img-wrapper">
              <button
                className="PotatoFactsBlock__btn--left"
                onClick={()=> {
                  setFactTwoOpen(false)
                  setFactOneOpen(true)
                }}
              >
                <img src={btnImg} alt="btnImg" />
              </button>

              <img className="PotatoFactsBlock__mainimg" src={potatoImg} alt="potatoImg" />

              <button
                className="PotatoFactsBlock__btn--right"
                onClick={()=> {
                  setFactOneOpen(false)
                  setFactTwoOpen(true)
                }}
              >
                <img src={btnImg} alt="btnImg" />
              </button>
            </div>

            {factTwoOpen && (
              <FixedTooltip 
                closeTooltip={() => setFactTwoOpen(false)}
                title='Potatoes were worth gold'
                subtitle="During the Alaskan Klondike gold rush, (1897-1898) potatoes were practically worth their weight in gold. Potatoes were so valued for their vitamin C content that miners traded gold for potatoes. On the South Atlantic Island of Tristan de Cunha, potatoes were once used as the country's unofficial currency."
                color="#FB6E2B"
                textColor="#FFFFFF"
                isLight
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
