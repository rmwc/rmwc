import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import rmwcTestPolyfill from './base/testPolyfill';

Enzyme.configure({ adapter: new Adapter() });
rmwcTestPolyfill();
