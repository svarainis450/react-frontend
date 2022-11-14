
import {cardsList} from  './constants';

import './AllFeaturesBlock.scss';

import { HeroTitle } from '../HeroTitle';

export const AllFeaturesBlock = () => {
  return (
    <div className='AllFeaturesBlock'>

      <HeroTitle 
        title='All the features you need on one platform'
        subtitle='Our AI algorithms track 1500+ top crypto influencers. We analyze videos and posts to summarize their next coin picks'
        className='AllFeaturesBlock__title'
      />

      <div className="AllFeaturesBlock__content">

        {cardsList.map((item, index) => {
          return <div className="AllFeaturesBlock__card" key={index}>
            <img className='AllFeaturesBlock__img' src={item.img} alt={item.title} />
            <HeroTitle 
              smallTitle
              title={item.title}
              subtitle={item.subtitle}
              className="AllFeaturesBlock__card-text"
            />
          </div>
        })}

      </div>

    </div>
  );
};
