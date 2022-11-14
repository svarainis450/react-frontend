import classNames from 'classnames';

import { HeroTitle } from '../HeroTitle';
import { CommitmentsProps } from './types';
import { Button } from '../Button';


import './Commitments.scss';
import { Link } from 'react-router-dom';


export const Commitments = ({ commitmentsList, className }: CommitmentsProps) => {


  return (
    <div className={classNames('Commitments', className)}>
      {/* Title */}
      <HeroTitle 
        className='Commitments__hero'
        title="Our 3 commitments to you"
        subtitle='We want you to feel confident and secure on Potato, so these are the commitments you can always expect from us.'
      />
      
      {/* Commitmentslist */}
      <div className="Commitments__wrapper">
        {commitmentsList.map((item, index) => {
          return <div className="Commitments__card" key={"Commitments_" + index}>
            <img className='Commitments__icon' src={item.icon} alt="Commitments" />
            <div className="Commitments__name">{item.name}</div>
            <div className="Commitments__text">{item.text}</div>
          </div>
        })}
      </div>
    </div>
  );
};
