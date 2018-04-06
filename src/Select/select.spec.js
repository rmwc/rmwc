import React from 'react';
import { mount } from 'enzyme';
import { Select } from './';

describe('Select', () => {
  it('renders', () => {
    mount(
      <Select
        placeholder="Select a food"
        options={{ 1: 'Cookies', 2: 'Pizza', 3: 'Icecream' }}
      />
    );
  });

  it('can accept options array', () => {
    mount(<Select placeholder="Select a food" options={[1, 2, 3]} />);
  });

  it('can accept formatted options array', () => {
    mount(
      <Select
        placeholder="Select a food"
        options={[
          {
            label: 'Cookies',
            value: '1'
          },
          {
            "label": 'Pizza',
            "value": '2',
            'aria-disabled': true,
            "tabIndex": -1
          },
          {
            label: 'Icecream',
            value: '3'
          }
        ]}
      />
    );
  });

  it('can have a tab index', () => {
    const el = mount(<Select tabIndex="1" options={[1, 2, 3]} />);
    expect(!!~el.html().search('tabindex="1"')).toEqual(true);
  });

  it('can have custom rootProps', () => {
    mount(<Select rootProps={{ name: 'test' }} />);
  });

  it('can be disabled', done => {
    const el = mount(<Select disabled={false} options={[1, 2, 3]} />);
    expect(el.html().includes('mdc-select--disabled')).toBe(false);
    el.setProps({ disabled: true });
    setTimeout(() => {
      expect(el.html().includes('mdc-select--disabled')).toBe(true);
      done();
    });
  });

  it('can be box', () => {
    mount(<Select box options={[1, 2, 3]} />);
  });

  it('can have custom classnames', () => {
    const el = mount(
      <Select
        className={'my-custom-classname'}
        options={{ 1: 'Cookies', 2: 'Pizza', 3: 'Icecream' }}
      />
    );
    expect(!!~el.html().search('my-custom-classname')).toEqual(true);
  });
});
