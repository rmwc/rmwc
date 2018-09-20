import './polyfills';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'normalize.css/normalize.css';

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
import '@material/shape/dist/mdc.shape.css';
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
import '@rmwc/data-table/data-table.css';
import '@rmwc/icon/icon.css';
import '@rmwc/circular-progress/circular-progress.css';

import 'prismjs/themes/prism.css';
import './docs.css';
import { AppContainer } from 'react-hot-loader';
import App from './App';
import { unregister } from './registerServiceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
import { RMWCProvider } from '@rmwc/provider';

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
