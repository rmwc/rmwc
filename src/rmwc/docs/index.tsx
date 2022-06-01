import React from 'react';
import * as ReactDOM from 'react-dom';
import './styles';
import { BrowserRouter } from 'react-router-dom';
import App from './views/app';
import { Analytics } from './common/analytics';
import { RMWCProvider } from '@rmwc/provider';

const renderApp = (Component: React.ComponentType<any>) => {
  ReactDOM.render(
    <RMWCProvider>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Analytics />
        <Component location={window.location.href} />
      </BrowserRouter>
    </RMWCProvider>,
    document.getElementById('root')
  );
};

// @ts-ignore
if (module.hot) {
  // @ts-ignore
  module.hot.accept(['./views/app'], () => renderApp(App));
}

const init = () => {
  renderApp(App);
};

export default init;
