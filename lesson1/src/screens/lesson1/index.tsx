import { AppContainer } from 'react-hot-loader';
import React, { ComponentClass, FunctionComponent } from 'react';
import ReactDOM from 'react-dom';
import Welcome from '@Components/Welcome';

const renderComponent = (Component: ComponentClass | FunctionComponent) => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root')
  );
};

renderComponent(Welcome);

if (module.hot) {
  module.hot.accept('@Components/Welcome', () => {
    renderComponent(Welcome);
  });
}
