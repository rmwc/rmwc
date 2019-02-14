import * as React from 'react';
import { mount } from 'enzyme';
import { NotchedOutline } from './';

describe('NotchedOutline', () => {
  it('renders', () => {
    mount(<NotchedOutline />);
  });

  it('foundation methods', () => {
    const el = mount(<NotchedOutline />);
    const a = (el.instance() as NotchedOutline).foundation.adapter_;
    a.addClass('test');
    a.removeClass('test');
    a.setNotchWidthProperty(10);
    a.removeNotchWidthProperty();
  });
});
