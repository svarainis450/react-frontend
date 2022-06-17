import classNames from 'classnames';
import { Link } from 'react-router-dom';

import { HeroTitle } from '../HeroTitle';
import { CompareFeaturesProps } from './types';
import { LinkList } from '../../../types';
import { Button } from '../Button';

import trueImage from '../../../Assets/images/compareTrue.svg'; 
import falseImage from '../../../Assets/images/compareFalse.svg'; 
import { useCookies } from 'react-cookie'
import * as qs from 'query-string';

import './CompareFeatures.scss';


export const CompareFeatures = ({ featuresList, className }: CompareFeaturesProps) => {
  const [getCookie] = useCookies(['currency', 'currencySymbol'])
  var currencySymbol = getCookie.currencySymbol;

  return (
    <div className={classNames('CompareFeatures', className)}>
      <HeroTitle 
        className='CompareFeatures__hero'
        title="Compare features"
      />

      <div className="CompareFeatures__table-wrapper">
        <table className='CompareFeatures__table' cellSpacing="0">
          <tr className='CompareFeatures__heading-row'>
            <th className='CompareFeatures__first-heading'></th>

            <th className='CompareFeatures__header'>
              <p className='CompareFeatures__name'>Potato Starter</p>
              <p className='CompareFeatures__occurrence'>{currencySymbol}5 per month, paid annually</p>

              <Link to={LinkList.WAITLIST} className='CompareFeatures__cta'>
                <Button>
                  Select plan
                </Button>
              </Link>
            </th>

            <th className='CompareFeatures__header'>
              <p className='CompareFeatures__name'>Potato Pro</p>
              <p className='CompareFeatures__occurrence'>{currencySymbol}15 per month, paid annually</p>

              <Link to={LinkList.WAITLIST} className='CompareFeatures__cta'>
                <Button buttonType='success'>
                  Select plan
                </Button>
              </Link>
            </th>
          </tr>

          {featuresList.map((item, index) => {
            return <tr key={index}>
              <td className='CompareFeatures__feature-desc'>{item.type}</td>
              <td>{item.starter ? <img className='CompareFeatures__feature-img' src={trueImage} alt="true"/> : <img className='CompareFeatures__feature-img' src={falseImage} alt="false"/>}</td>
              <td>{item.pro ? <img className='CompareFeatures__feature-img' src={trueImage} alt="true"/> : <img className='CompareFeatures__feature-img' src={falseImage} alt="false"/>}</td>
            </tr> 
          })}
        </table>
      </div>
    </div>
  );
};
