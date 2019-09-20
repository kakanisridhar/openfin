import React from 'react';
import ReactDOM from 'react-dom';
import WindowManager from '@Services/WindowManager';

const MenuLink = ({ url, onMenuClicked }) => {
  function handleClick(e) {
    e.preventDefault();
    onMenuClicked(url);
  }
  return (
    <a href="#" onClick={handleClick}>
      {url}
    </a>
  );
};

const Menu = ({ screens, onMenuClicked }) => {
  const listItems = screens.map(s => (
    <li key={s}>
      <MenuLink url={s} onMenuClicked={onMenuClicked} />
    </li>
  ));
  return <ul>{listItems}</ul>;
};

const winManager = new WindowManager(true);

window.winManager = winManager;

ReactDOM.render(
  <Menu screens={screens} onMenuClicked={winManager.launchWindow} />,
  document.getElementById('root')
);
