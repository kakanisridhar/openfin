import React from 'react';

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
  return <ul>{listItems}</ul>;
};

export default Navigation;
