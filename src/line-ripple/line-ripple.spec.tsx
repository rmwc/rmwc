import * as React from 'react';
import { mount } from 'enzyme';
import { LineRipple } from './';

describe('LineRipple', () => {
  it('renders', () => {
    mount(<LineRipple />);
  });

  it('foundation methods', () => {
    const el = mount(<LineRipple />);
    const inst = el.instance();
    inst.foundation_.adapter_.addClass('foo');
    inst.foundation_.adapter_.removeClass('foo');
    inst.foundation_.adapter_.hasClass('foo');
    inst.foundation_.adapter_.setStyle('width', '200px');
    inst.foundation_.adapter_.registerEventHandler('click', () => {});
    inst.foundation_.adapter_.deregisterEventHandler('click', () => {});
  });
});
