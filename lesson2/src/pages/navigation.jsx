import React from 'react';

import Messenger from '../components/Messenger';

const appId = process.env.APP_UUID;

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

  let topics = ["lo:internal","lo:windows"];

  return <div>
    {appId}
    <ul>{listItems}</ul>
    <hr></hr>
    <Messenger topics={topics} windowid = "navigation"></Messenger>
  </div>
};

export default Navigation;
