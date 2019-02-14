import * as React from 'react';
import { mount } from 'enzyme';
import { Button, ButtonIcon } from './';

describe('Button', () => {
  it('renders', () => {
    const btn = mount(<Button />);
    expect(!!~btn.html().search('mdc-button')).toEqual(true);
  });

  it('can have an icon', () => {
    mount(
      <Button>
        <ButtonIcon icon="favorite" />
        Button
      </Button>
    );
  });

  it('can be raised', () => {
    const btn = mount(<Button raised />);
    expect(!!~btn.html().search('mdc-button--raised')).toEqual(true);
  });

  it('can be unelevated', () => {
    const btn = mount(<Button unelevated />);
    expect(!!~btn.html().search('mdc-button--unelevated')).toEqual(true);
  });

  it('can be outlined', () => {
    const btn = mount(<Button outlined />);
    expect(!!~btn.html().search('mdc-button--outlined')).toEqual(true);
  });

  it('can be dense', () => {
    const btn = mount(<Button dense />);
    expect(!!~btn.html().search('mdc-button--dense')).toEqual(true);
  });

  it('can ripple', () => {
    const btn = mount(<Button ripple />);
    expect(!!~btn.html().search('mdc-button')).toEqual(true);
  });

  it('can not ripple', () => {
    const btn = mount(<Button ripple={undefined} />);
    expect(!!~btn.html().search('mdc-button')).toEqual(true);
  });

  it('can have custom classnames', () => {
    const el = mount(<Button className={'my-custom-classname'} />);
    expect(!!~el.html().search('my-custom-classname')).toEqual(true);
  });
});
