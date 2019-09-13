// @flow
import React from 'react';
import Button from 'Components/button';
import style from './app.css';

const App = () => {
  const buttonText: string = 'React to it!';
  return (
    <div className={style.app}>
      React Starter
      <span role="img" aria-label="rocket ship">
        🚀
      </span>
      <Button>{buttonText}</Button>
      Is HMR working?
    </div>
  );
};

export default App;
