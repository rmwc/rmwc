import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
// @ts-ignore
import rmwcTestPolyfill from './base/test-polyfill';

Enzyme.configure({ adapter: new Adapter() });
rmwcTestPolyfill();
