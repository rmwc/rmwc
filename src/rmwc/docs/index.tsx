import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory'
import ReactGA from 'react-ga';

import '@material/button/dist/mdc.button.css';
import '@material/card/dist/mdc.card.css';
import '@material/checkbox/dist/mdc.checkbox.css';
import '@material/chips/dist/mdc.chips.css';
import '@material/dialog/dist/mdc.dialog.css';
import '@material/drawer/dist/mdc.drawer.css';
import '@material/elevation/dist/mdc.elevation.css';
import '@material/fab/dist/mdc.fab.css';
import '@material/form-field/dist/mdc.form-field.css';
import '@material/grid-list/dist/mdc.grid-list.css';
import '@material/icon-button/dist/mdc.icon-button.css';
import '@material/image-list/dist/mdc.image-list.css';
import '@material/layout-grid/dist/mdc.layout-grid.css';
import '@material/linear-progress/dist/mdc.linear-progress.css';
import '@material/list/dist/mdc.list.css';
import '@material/menu/dist/mdc.menu.css';
import '@material/menu-surface/dist/mdc.menu-surface.css';
import '@material/radio/dist/mdc.radio.css';
import '@material/ripple/dist/mdc.ripple.css';
import '@material/select/dist/mdc.select.css';
import '@material/switch/dist/mdc.switch.css';
import '@material/slider/dist/mdc.slider.css';
import '@material/snackbar/dist/mdc.snackbar.css';
import '@material/tab-bar/dist/mdc.tab-bar.css';
import '@material/tab/dist/mdc.tab.css';
import '@material/tab-scroller/dist/mdc.tab-scroller.css';
import '@material/tab-indicator/dist/mdc.tab-indicator.css';
import '@material/textfield/dist/mdc.textfield.css';
import '@material/theme/dist/mdc.theme.css';
import '@material/toolbar/dist/mdc.toolbar.css';
import '@material/top-app-bar/dist/mdc.top-app-bar.css';
import '@material/typography/dist/mdc.typography.css';

// rmwc additions
import '@rmwc/avatar/avatar.css';
import '@rmwc/data-table/data-table.css';
import '@rmwc/icon/icon.css';
import '@rmwc/circular-progress/circular-progress.css';
import '@rmwc/list/collapsible-list.css';

import 'prismjs/themes/prism.css';
import './docs.css';
import { AppContainer } from 'react-hot-loader';
import App from './App';
// @ts-ignore
import { unregister } from './registerServiceWorker';
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
  module.hot.accept(['./App'], () => renderApp(App));
}

const initAnalytics = () => {
  ReactGA.initialize('UA-97702366-5');
  const doPageView = () => ReactGA.pageview(window.location.pathname + window.location.search)
  history.listen(() => doPageView());
  doPageView();
}


const init = () => {
  renderApp(App);
  initAnalytics();
  unregister();
};

export default init;
