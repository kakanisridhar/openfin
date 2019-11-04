import React from 'react';
import Messenger from '../components/Messenger';
import { Menu, Icon } from 'antd';

const { SubMenu } = Menu;

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

async function hideWindows() {
  const app = await fin.Application.getCurrent();
  const childWindows = await app.getChildWindows();
  for (let i = 0; i < childWindows.length; i++) {
    childWindows[i].hide();
  }
}

const Navigation = ({ screens, winLauncher }) => {

  const launchWindow = ({key}) => {
    winLauncher(screens[key].path,screens[key].options);
  }

  const listItems = screens.map( (s,i) => (
    <Menu.Item key={i} onClick = {launchWindow}>
      {s.path}
    </Menu.Item>
  ));

  let topics = ["lo:internal","lo:windows"];

  return <div>
    {appId}
    <Menu
          defaultSelectedKeys={['0']}
          mode="inline"
          >
      {listItems}
    </Menu>

    
    <hr></hr>
    <Messenger topics={topics} windowid = "navigation"></Messenger>
    <button onClick={hideWindows}>Hide child windows</button>
  </div>
};

export default Navigation;
