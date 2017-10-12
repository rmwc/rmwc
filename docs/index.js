import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css/normalize.css';
import 'material-components-web/dist/material-components-web.css';
import './index.css';
import App from './components/app.component';
import { unregister } from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
unregister();
