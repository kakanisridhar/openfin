import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from '@reach/router';
import Navigation from './pages/navigation';
import WindowManager from './services/WindowManager';
import * as serviceWorker from './serviceWorker';
import Routes from './Routes';

const App = () => {
  const configureRoutes = Routes.map(s => {
    const Screen = s.component;
    return <Screen key={s.path} path={s.path} />;
  });

  return (
    <div>
      <Router>
        <Navigation
          path="/"
          screens={Routes}
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
