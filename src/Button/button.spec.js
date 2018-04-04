import React from 'react';
import { mount } from 'enzyme';
import Button from './';

describe('Button', () => {
  it('renders', () => {
    const btn = mount(<Button />);
    expect(!!~btn.html().search('mdc-button')).toEqual(true);
  });

  it('can be raised', () => {
    const btn = mount(<Button raised />);
    expect(!!~btn.html().search('mdc-button--raised')).toEqual(true);
  });

  it('can be unelevated', () => {
    const btn = mount(<Button unelevated />);
    expect(!!~btn.html().search('mdc-button--unelevated')).toEqual(true);
  });

  it('can be stroked', () => {
    const btn = mount(<Button stroked />);
    expect(!!~btn.html().search('mdc-button--stroked')).toEqual(true);
  });

  it('can be dense', () => {
    const btn = mount(<Button dense />);
    expect(!!~btn.html().search('mdc-button--dense')).toEqual(true);
  });

  it('can ripple', () => {
    const btn = mount(<Button ripple />);
    expect(!!~btn.html().search('mdc-button')).toEqual(true);
  });

  it('can have custom classnames', () => {
    const el = mount(<Button className={'my-custom-classname'} />);
    expect(!!~el.html().search('my-custom-classname')).toEqual(true);
  });
});
