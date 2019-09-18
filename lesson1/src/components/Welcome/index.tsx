import React, { FunctionComponent, Fragment } from 'react';

import Header from '../Header';


const Welcome: FunctionComponent<{}> = () => (
  <Fragment>
    <Header />
    Welcome to openfin, HMR is working in openfin too
  </Fragment>
);

export default Welcome;
