import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { PaymentOptionsProps } from './types';
import { planTypes, priceOptions } from './constants';
import { Button } from '../Button';
import { ToggleButton } from '../ToggleButton';

import './PaymentOptions.scss';
import mostPopular from '../../../Assets/images/mostPopular.svg';
import teaserArrow from '../../../Assets/images/teaserArrow.svg';
import { LinkList } from '../../../types';
import { useCookies } from 'react-cookie'

export const PaymentOptions = ({
  className,
  currentOption,
  setCurrentPricingOption,
  minimal,
  isSelected,
  isSelectedHandler,
}: PaymentOptionsProps) => {
  const [getCookie, setCookie] = useCookies(['currency', 'currencySymbol'])

  return (
    <div
      className={classNames('PaymentOptions', className, {
        'PaymentOptions--minimal': minimal,
      })}
    >
      <div className="PaymentOptions__toggle">
        <p>Monthly</p>

        <ToggleButton
          className="PaymentOptions__toggle-button"
          isChecked={currentOption === planTypes.yearly}
          onChange={() => {
            currentOption === planTypes.yearly
              ? setCurrentPricingOption(planTypes.monthly)
              : setCurrentPricingOption(planTypes.yearly);
          }}
        />

        <p>Yearly</p>
      </div>

      <p className="PaymentOptions__toggle-teaser">
        Save Up To 42%
        <img src={teaserArrow} alt="" />
      </p>

      <div className="PaymentOptions__cards">
        {priceOptions[currentOption].map((item, index) => {
          return (
            <div
              className={classNames(
                'PaymentOptions__card',
                item.isMostPopular && 'most-popular',
                { 'PaymentOptions__card--selected': isSelected === index }
              )}
              key={'PaymentOptions__' + index + '__' + currentOption}
              onClick={() => isSelectedHandler(index)}
            >
              {item.isMostPopular && (
                <img className="most-popular-img" src={mostPopular} alt="" />
              )}
              <p className="PaymentOptions__card-plantype">Membership</p>
              <p className="PaymentOptions__card-name"> {item.name}</p>
              <p className="PaymentOptions__card-dsc">{item.description}</p>

              <div className="PaymentOptions__card-price">
              {getCookie?.currencySymbol}{item.price}
                {item.discount && (
                  <div className="PaymentOptions__card-discount-item">
                    <p className="PaymentOptions__card-discount">
                      {item.discount}%
                    </p>
                  </div>
                )}
              </div>

              <p className="PaymentOptions__card-payment-occurance">
                per month{' '}
                {currentOption === planTypes.yearly && ' paid annually'}
              </p>

              {currentOption === planTypes.yearly ? (
                <button
                  className="PaymentOptions__card-switch"
                  onClick={() => setCurrentPricingOption(planTypes.monthly)}
                >
                  Switch to monthly billing
                </button>
              ) : (
                <button
                  className="PaymentOptions__card-switch"
                  onClick={() => setCurrentPricingOption(planTypes.yearly)}
                >
                  Switch to yearly billing
                </button>
              )}

              <Link to={LinkList.Checkout}>
                <Button className="PaymentOptions__card-button">Buy now</Button>
              </Link>

              <ul className="PaymentOptions__card-bulletlist">
                {item.bullets.map((text, index) => {
                  return (
                    <li className="PaymentOptions__card-bullet" key={index}>
                      {text}
                    </li>
                  );
                })}
              </ul>

              <p className="PaymentOptions__card-tobegin">
                {currentOption === planTypes.yearly 
                  ? `Plan renews at ${getCookie?.currencySymbol}${item.beginPrice} after 1 year. VAT may apply.`
                  : `Plan renews at ${getCookie?.currencySymbol}${item.beginPrice} after 1 month. VAT may apply.`
                }
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
