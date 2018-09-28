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
    inst.foundation_.adapter_.addClass('foo');
    inst.foundation_.adapter_.removeClass('foo');
    inst.foundation_.adapter_.getWidth();
    inst.foundation_.adapter_.registerInteractionHandler('click', () => {});
    inst.foundation_.adapter_.deregisterInteractionHandler('click', () => {});
  });
});
