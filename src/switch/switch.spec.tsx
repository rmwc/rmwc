import * as React from 'react';
import { mount } from 'enzyme';
import Switch from './';

describe('Switch', () => {
  test('renders', () => {
    const switchEl = mount(<Switch />);
    expect(!!~switchEl.html().search('mdc-switch')).toEqual(true);
  });

  test('can be checked', () => {
    const switchEl = mount(<Switch checked onChange={() => {}} />);
    expect(switchEl.find('input').getDOMNode().checked).toEqual(true);
  });

  test('handles onChange', () => {
    let value = 0;
    const checkbox = mount(<Switch checked={true} onChange={() => value++} />);

    checkbox.find('input').simulate('change');
    expect(value).toEqual(1);
  });

  test('can be disabled', () => {
    const switchEl = mount(<Switch disabled />);
    expect(switchEl.find('input').getDOMNode().disabled).toEqual(true);
  });

  test('can have a label', () => {
    const switchEl = mount(<Switch label="hello world" />);
    expect(switchEl.text()).toEqual('hello world');
  });

  test('can be dynamically changed with a dynamic label #361', done => {
    const el = mount(<Switch label="no" onChange={() => {}} checked={false} />);
    expect(
      el
        .find('input')
        .first()
        .getDOMNode().checked
    ).toBe(false);

    el.setProps({ label: 'yes', checked: true }, () => {
      setTimeout(() => {
        expect(el.html().includes('mdc-switch--checked')).toBe(true);
        done();
      });
    });
  });

  test('can have custom classnames on input', () => {
    const el = mount(<Switch className={'my-custom-classname'} />);
    expect(!!~el.html().search('my-custom-classname')).toEqual(true);
  });
});
