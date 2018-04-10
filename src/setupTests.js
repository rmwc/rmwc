import Enzyme from 'enzyme';
import rmwcTestPolyfill from './Base/testPolyfill';

const Adapter = `${process.env.REACT_TEST_VERSION}`.startsWith('react-15') ?
  require('enzyme-adapter-react-15') :
  require('enzyme-adapter-react-16');

Enzyme.configure({ adapter: new Adapter() });
rmwcTestPolyfill();
