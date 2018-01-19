import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

window.HTMLElement.prototype.dataset = {};
window.HTMLInputElement.prototype.validity = {};

window.HTMLCanvasElement.prototype.getContext = () => ({
  font: '',
  measureText: () => ({ width: 0 })
});
