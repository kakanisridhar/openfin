// @flow
import React from 'react';
import Button from 'Components/button';
import style from './screen1.css';

const Screen1 = () => {
  const buttonText: string = 'React to it!';
  return (
    <div className={style.app}>
      React Starter
      <span role="img" aria-label="rocket ship">
        🚀
      </span>
      <Button>{buttonText}</Button>
      HMR
    </div>
  );
};

export default Screen1;
