import classNames from 'classnames';

import { HeroTitle } from '../HeroTitle';
import { QuoteProps } from './types';
import { Button } from '../Button';

import quoteIcon from '../../../Assets/images/quoteIcon.svg';

import './Quote.scss';
import { Link } from 'react-router-dom';
import { LinkList } from '../../../types';

export const Quote = ({ quoteList, className }: QuoteProps) => {
  return (
    <div className={classNames('Quote', className)}>
      {/* Title */}
      <HeroTitle
        className="Quote__hero"
        title="What top crypto influencers are saying"
      />

      {/* quotelist */}
      <div className="Quote__wrapper">
        {quoteList.map((item, index) => {
          return (
            <div className="Quote__card" key={'quote_' + index}>
              <img className="Quote__icon" src={quoteIcon} alt="quote" />
              <div className="Quote__text">{item.text}</div>
              <div className="Quote__name">{item.name}</div>
            </div>
          );
        })}
      </div>

      <Link to={LinkList.Membership} className="Quote__cta mobile">
        <Button>Get Started</Button>
      </Link>
    </div>
  );
};
