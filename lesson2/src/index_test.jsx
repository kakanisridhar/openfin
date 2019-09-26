import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Link } from '@reach/router';
import  Navigation  from './pages/navigation';
import  Members  from './pages/members';
import WindowManager from './services/WindowManager';
import * as serviceWorker from './serviceWorker';

const winManager = new WindowManager(true);
window.winManager = winManager;

const screens = [
  {
    path:'members',
    component:Members,
    height:'400',
    width: '400'
  }, 
];

let Home = () => <div>Home</div>
let Dash = () => <div>Dash</div>

const App = () => {

  const configureRoutes = screens.map( s => {
    let Screen = s.component;
    return <Screen path = {s.path}></Screen>
  })

  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="dashboard">Dashboard</Link>
      </nav>
    
      <Router>
        <Home path = '/'></Home>
        <Dash path = 'dash'></Dash>
      </Router>
    </div>  
  );
} 

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
