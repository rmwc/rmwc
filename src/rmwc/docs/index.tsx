import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router, Link } from 'react-router-dom';

import { history } from './history';
import ReactGA from 'react-ga';
import '../styles';

import 'prismjs/themes/prism.css';
import './docs.css';
import { AppContainer } from 'react-hot-loader';
import App from './app';
// @ts-ignore
import { unregister } from './register-service-worker';
import { RMWCProvider } from '@rmwc/provider';

function Foo<TagT extends React.ElementType<any>>({
  tag
}: {
  tag: TagT;
} & React.ComponentProps<TagT>) {
  const Tag = tag as TagT;
  // @ts-ignore
  return <Tag />;
}

<Foo tag={Link} to="/" />;

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
  ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_ID as string);
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
