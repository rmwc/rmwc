import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css/normalize.css';
import 'material-components-web/dist/material-components-web.css';
import './index.css';
import { AppContainer } from 'react-hot-loader';
import App from './components/app';
import { unregister } from './registerServiceWorker';

const renderApp = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root')
  );
};

renderApp(App);

if (module.hot) {
  module.hot.accept(['./components/app'], () => renderApp(App));
}

unregister();
