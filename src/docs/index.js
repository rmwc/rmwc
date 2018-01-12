import './polyfills';

import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css/normalize.css';
import 'material-components-web/dist/material-components-web.css';
import 'prismjs/themes/prism.css';
import './docs.css';
import { AppContainer } from 'react-hot-loader';
import App from './App';
import { unregister } from './registerServiceWorker';
import { BrowserRouter as Router } from 'react-router-dom';

const renderApp = Component => {
  ReactDOM.render(
    <AppContainer>
      <Router basename={process.env.PUBLIC_URL}>
        <Component location={window.location.href} />
      </Router>
    </AppContainer>,
    document.getElementById('root')
  );
};

renderApp(App);

if (module.hot) {
  module.hot.accept(['./App'], () => renderApp(App));
}

unregister();
