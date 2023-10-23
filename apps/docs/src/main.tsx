import { RMWCProvider } from '@rmwc/provider';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'rmwc/styles';
import { Analytics } from './common/analytics';
import App from './views/app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <RMWCProvider>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Analytics />
      <App />
    </BrowserRouter>
  </RMWCProvider>
);
