import * as React from 'react';
import { mount } from 'enzyme';
import Radio from './';

describe('Radio', () => {
  test('renders', () => {
    const radio = mount(<Radio label="test" />);
    expect(!!~radio.html().search('mdc-radio')).toEqual(true);
  });

  test('can be checked', () => {
    const radio = mount(<Radio checked={true} onChange={() => {}} />);
    expect(radio.find('input').getDOMNode().checked).toEqual(true);
  });

  test('handles onChange', () => {
    let value = 0;
    const checkbox = mount(<Radio checked={true} onChange={() => value++} />);

    checkbox.find('input').simulate('change');
    expect(value).toEqual(1);
  });

  test('can be disabled', () => {
    const radio = mount(<Radio disabled />);
    expect(radio.find('input').getDOMNode().disabled).toEqual(true);
  });

  test('foundation check', () => {
    const radio = mount(<Radio disabled />);
    const adapter = radio.instance().foundation_.adapter_;
    adapter.addClass('test');
    adapter.removeClass('test');
  });

  test('can have custom classnames on input', () => {
    const el = mount(<Radio className={'my-custom-classname'} />);
    expect(!!~el.html().search('my-custom-classname')).toEqual(true);
  });
});
