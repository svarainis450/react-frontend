import classNames from 'classnames';

import { PaymentOptionsProps } from './types';
import { planTypes, priceOptions, PRICE_OPTIONS_BIGGER } from './constants';
import { Button } from '../Button';
import { ToggleButton } from '../ToggleButton';

import './PaymentOptions.scss';
import mostPopular from '../../../Assets/images/mostPopular.svg';
import teaserArrow from '../../../Assets/images/teaserArrow.svg';
import { useCookies } from 'react-cookie';
import { useFunnel } from 'src/hooks';

export const PaymentOptions = ({
  className,
  currentOption,
  setCurrentPricingOption,
  minimal,
  isSelected,
  isSelectedHandler,
}: PaymentOptionsProps) => {
  const [getCookie, setCookie] = useCookies(['currency', 'currencySymbol']);
  const { funnel } = useFunnel();
  const PRODUCTS = funnel === 5 ? PRICE_OPTIONS_BIGGER : priceOptions;

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
        {PRODUCTS[currentOption].map((item, index) => {
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
              <p className="PaymentOptions__card-name"> {item.title}</p>
              <p className="PaymentOptions__card-dsc">{item.description}</p>

              <div className="PaymentOptions__card-price">
                {getCookie?.currencySymbol}
                {item.final_price / (item?.subscription_period || 0)}
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

              <Button
                onClick={() => {
                  isSelectedHandler(index);
                }}
                className="PaymentOptions__card-button"
              >
                Buy now
              </Button>

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
                  ? `Plan renews at ${getCookie?.currencySymbol}${item.final_price} after 1 year.`
                  : `Plan renews at ${getCookie?.currencySymbol}${item.final_price} after 1 month.`}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
