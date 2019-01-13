import * as React from 'react';
import { mount } from 'enzyme';
import { NotchedOutline, NotchedOutlineIdle } from './';

describe('NotchedOutline', () => {
  it('renders', () => {
    mount(<NotchedOutline />);
    mount(<NotchedOutlineIdle />);
  });

  it('foundation methods', () => {
    const el = mount(<NotchedOutline />);
    const inst = el.instance();
    inst.foundation_.adapter_.getWidth();
    inst.foundation_.adapter_.getHeight();
    inst.foundation_.adapter_.addClass('foo');
    inst.foundation_.adapter_.removeClass('foo');
    inst.foundation_.adapter_.setOutlinePathAttr(200);
    inst.foundation_.adapter_.getIdleOutlineStyleValue('height');
  });
});
