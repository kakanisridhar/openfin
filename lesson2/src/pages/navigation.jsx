import React from 'react';

const MenuLink = ({ url, onMenuClicked }) => {
  function handleClick(e) {
    e.preventDefault();
    onMenuClicked(url);
  }
  return (
    <a href='#' onClick={handleClick}>
      {url}
    </a>
  );
};

const Navigation = ({ screens, winLauncher }) => {
  const listItems = screens.map(s => (
    <li key={s.path}>
      <MenuLink url={s.path} onMenuClicked={winLauncher} />
    </li>
  ));
  return <ul>{listItems}</ul>;
};


export default Navigation;
