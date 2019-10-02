import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from '@reach/router';
import Navigation from './pages/navigation';
import Members from './pages/members';
import Window3 from './pages/window3';
import WindowManager from './services/WindowManager';
import * as serviceWorker from './serviceWorker';

const screens = [
  {
    path: 'members',
    component: Members,
    options: {
      defaultHeight: '400',
      defaultWidth: '400'
    }
  },
  {
    path: 'window3',
    component: Window3,
    options: {
      defaultHeight: '200',
      defaultWidth: '200'
    }
  }
];

const App = () => {
  const configureRoutes = screens.map(s => {
    const Screen = s.component;
    return <Screen key={s.path} path={s.path} />;
  });

  return (
    <div>
      <Router>
        <Navigation
          path="/"
          screens={screens}
          winLauncher={WindowManager.launchWindow}
        />
        {configureRoutes}
      </Router>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
