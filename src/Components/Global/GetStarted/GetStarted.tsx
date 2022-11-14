
import {cardsList} from  './constants';

import './GetStarted.scss';

import { HeroTitle } from '../HeroTitle';

export const GetStarted = () => {
  return (
    <div className='GetStarted'>

      <HeroTitle 
        title='Get started in a few minutes'
        subtitle='Discover top expert picks — and get your ticket to the next x100 opportunity'
        className='GetStarted__title'
      />

      <div className="GetStarted__content">

        {cardsList.map((item, index) => {
          return <div className="GetStarted__card" key={index}>
            <img className='GetStarted__img' src={item.img} alt={item.title} />
            <HeroTitle 
              smallTitle
              title={item.title}
              className="GetStarted__card-text"
            />
          </div>
        })}

      </div>

    </div>
  );
};
