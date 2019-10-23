import React from 'react';

import WindowInfo from '../components/WindowInfo';

const MenuLink = ({ url, options, onMenuClicked }) => {
  function handleClick(e) {
    e.preventDefault();
    onMenuClicked(url, options);
  }
  return (
    <a href="#" onClick={handleClick}>
      {url}
    </a>
  );
};

const Navigation = ({ screens, winLauncher }) => {
  const listItems = screens.map(s => (
    <li key={s.path}>
      <MenuLink url={s.path} options={s.options} onMenuClicked={winLauncher} />
    </li>
  ));
  return <div>
    <WindowInfo />
    <ul>{listItems}</ul>
  </div>
};

export default Navigation;
