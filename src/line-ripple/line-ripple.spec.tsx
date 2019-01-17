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
    inst.foundation.adapter_.addClass('foo');
    inst.foundation.adapter_.removeClass('foo');
    inst.foundation.adapter_.hasClass('foo');
    inst.foundation.adapter_.setStyle('width', '200px');
    inst.foundation.adapter_.registerEventHandler('click', () => {});
    inst.foundation.adapter_.deregisterEventHandler('click', () => {});
  });
});
