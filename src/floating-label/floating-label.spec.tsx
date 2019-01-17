import * as React from 'react';
import { mount } from 'enzyme';
import { FloatingLabel } from './';

describe('FloatingLabel', () => {
  it('renders', () => {
    mount(<FloatingLabel />);
  });

  it('foundation methods', () => {
    const el = mount(<FloatingLabel />);
    const inst = el.instance();
    inst.foundation.adapter_.addClass('foo');
    inst.foundation.adapter_.removeClass('foo');
    inst.foundation.adapter_.getWidth();
    inst.foundation.adapter_.registerInteractionHandler('click', () => {});
    inst.foundation.adapter_.deregisterInteractionHandler('click', () => {});
  });
});
