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
    inst.foundation.adapter_.getWidth();
    inst.foundation.adapter_.getHeight();
    inst.foundation.adapter_.addClass('foo');
    inst.foundation.adapter_.removeClass('foo');
    inst.foundation.adapter_.setOutlinePathAttr(200);
    inst.foundation.adapter_.getIdleOutlineStyleValue('height');
  });
});
