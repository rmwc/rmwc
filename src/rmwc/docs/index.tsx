import React from 'react';
import './styles';
import { BrowserRouter } from 'react-router-dom';
import App from './views/app';
import { Analytics } from './common/analytics';
import { RMWCProvider } from '@rmwc/provider';
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root');
const root = createRoot(container!);

const renderApp = (Component: React.ComponentType<any>) => {
  root.render(
    <RMWCProvider>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Analytics />
        <Component location={window.location.href} />
      </BrowserRouter>
    </RMWCProvider>
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
