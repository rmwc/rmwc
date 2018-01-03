import './polyfills';

import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css/normalize.css';
import 'material-components-web/dist/material-components-web.css';
import 'prismjs/themes/prism.css';
import './index.css';
import { AppContainer } from 'react-hot-loader';
import App from './components/app';
import { unregister } from './registerServiceWorker';
import { BrowserRouter as Router } from 'react-router-dom';

const renderApp = Component => {
  ReactDOM.render(
    <AppContainer>
      <Router>
        <Component location={window.location.href} />
      </Router>
    </AppContainer>,
    document.getElementById('root')
  );
};

renderApp(App);

if (module.hot) {
  module.hot.accept(['./components/app'], () => renderApp(App));
}

unregister();
