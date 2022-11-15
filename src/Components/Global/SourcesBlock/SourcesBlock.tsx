import { HeroTitle } from '../HeroTitle';
import { listOfSources } from './constants';

import './SourcesBlock.scss';
import { Link } from 'react-router-dom';

export const SourcesBlock = ({}) => {
  return (
    <div className="SourcesBlock">
      <HeroTitle
        className="SourcesBlock__title"
        title="We’re hunting hidden gems in here:"
      />

      <div className="SourcesBlock__list">
        {listOfSources.map((item, index) => {
          return (
            <Link to={item.url} className="SourcesBlock__item" key={index}>
              <img src={item.src} alt={item.type} />
            </Link>
          );
        })}
      </div>
    </div>
  );
};
