import 'normalize.css';

import React from 'react';
import ReactDOM from 'react-dom';

import Store from './Redux/Store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { Helmet } from 'react-helmet';

import Strings from './Constants/Strings';

ReactDOM.render(
  <React.Fragment>
    <Helmet>
      <title>{Strings.AppName}</title>
    </Helmet>
    <Provider store={Store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.Fragment>,
  document.getElementById('root')
);
