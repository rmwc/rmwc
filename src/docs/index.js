import './polyfills';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'normalize.css/normalize.css';
import 'material-components-web/dist/material-components-web.css';
import 'prismjs/themes/prism.css';
import './docs.css';
import { AppContainer } from 'react-hot-loader';
import App from './App';
import { unregister } from './registerServiceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
import { RMWCProvider } from 'rmwc/Provider';

const renderApp = Component => {
  ReactDOM.render(
    <RMWCProvider>
      <AppContainer>
        <Router basename={process.env.PUBLIC_URL}>
          <Component location={window.location.href} />
        </Router>
      </AppContainer>
    </RMWCProvider>,
    document.getElementById('root')
  );
};

renderApp(App);

if (module.hot) {
  module.hot.accept(['./App'], () => renderApp(App));
}

unregister();
