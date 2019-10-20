import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import classNames from 'classnames';
import { Alignment, Button, Classes, Navbar } from '@blueprintjs/core';

import Routes from '../../Routes';
import NavItem from './NavItem';

import Strings from '../../Constants/Strings';

const Nav: React.FC<INavProps> = ({ darkMode, onToggleTheme, location }) => {
  return (
    <Navbar className={Classes.MENU}>
      <Navbar.Group align={Alignment.LEFT}>
        <Navbar.Heading>{Strings.AppName}</Navbar.Heading>
        <Navbar.Divider />
        {Routes.map((route, index) => (
          <NavItem
            key={`NavItem-${route.text}-${index}`}
            {...route}
            active={location.pathname === route.to}
          />
        ))}
      </Navbar.Group>
      <Navbar.Group align={Alignment.RIGHT}>
        <Button
          className={classNames(Classes.MINIMAL, Classes.INTENT_PRIMARY)}
          icon={darkMode ? 'moon' : 'flash'}
          text="Toggle Theme"
          onClick={onToggleTheme}
        />
      </Navbar.Group>
    </Navbar>
  );
};

interface INavProps extends RouteComponentProps {
  darkMode: boolean;
  onToggleTheme: (event: React.MouseEvent) => void;
}

export default withRouter(Nav);
