import React from 'react';

const DateTimeDisplay = ({ value } :  {value: number}) => {
  return (
    <div className='CountdownTimer__time'>
      <p>{value}</p>
    </div>
  );
};

export default DateTimeDisplay;