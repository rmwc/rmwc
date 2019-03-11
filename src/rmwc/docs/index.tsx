import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import ReactGA from 'react-ga';

import '../styles';

import 'prismjs/themes/prism.css';
import './docs.css';
import { AppContainer } from 'react-hot-loader';
import App from './app';
// @ts-ignore
import { unregister } from './register-service-worker';
import { RMWCProvider } from '@rmwc/provider';

const history = createBrowserHistory({
  basename: process.env.PUBLIC_URL
});

const renderApp = (Component: React.ComponentType<any>) => {
  ReactDOM.render(
    <RMWCProvider>
      <AppContainer>
        <Router history={history}>
          <Component location={window.location.href} />
        </Router>
      </AppContainer>
    </RMWCProvider>,
    document.getElementById('root')
  );
};

// @ts-ignore
if (module.hot) {
  // @ts-ignore
  module.hot.accept(['./app'], () => renderApp(App));
}

const initAnalytics = () => {
  ReactGA.initialize('UA-97702366-5');
  const doPageView = () =>
    ReactGA.pageview(window.location.pathname + window.location.search);
  history.listen(() => doPageView());
  doPageView();
};

const init = () => {
  renderApp(App);
  initAnalytics();
  unregister();
};

export default init;
