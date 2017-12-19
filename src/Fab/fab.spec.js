import React from 'react';
import { mount } from 'enzyme';
import { Fab } from './';

describe('Fab', () => {
  it('renders', () => {
    const btn = mount(<Fab />);
    expect(!!~btn.html().search('mdc-fab')).toEqual(true);
  });

  it('can be mini', () => {
    const btn = mount(<Fab mini />);
    expect(!!~btn.html().search('mdc-fab--mini')).toEqual(true);
  });

  it('can ripple', () => {
    const btn = mount(<Fab ripple />);
    expect(!!~btn.html().search('mdc-fab')).toEqual(true);
  });

  it('cannot ripple', () => {
    const btn = mount(<Fab ripple={false} />);
    expect(!!~btn.html().search('mdc-ripple-surface')).toEqual(false);
  });

  it('can have custom classnames', () => {
    const el = mount(<Fab className={'my-custom-classname'} />);
    expect(!!~el.html().search('my-custom-classname')).toEqual(true);
  });
});
