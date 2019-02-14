import * as React from 'react';
import { mount } from 'enzyme';
import { IconButton } from './';

describe('', () => {
  it('renders', () => {
    mount(<IconButton icon="star" label="Rate this!" />);
    mount(<IconButton icon="images/icons/twitter.png" />);
    mount(<IconButton icon={<div />} label="Tweet it!" />);
  });

  it('handles prop changes', () => {
    const el = mount(
      <IconButton onIcon="favorite" icon="favorite_border" checked={false} />
    );

    el.setProps({ checked: true }, () => {
      expect(el.html().includes('mdc-icon-button--on')).toBe(true);
    });
  });

  it('renders as toggle', () => {
    mount(<IconButton onIcon="favorite" icon="favorite_border" />);
  });

  it('renders controlled', () => {
    mount(
      <IconButton
        checked={true}
        onClick={() => {}}
        onIcon="star"
        icon="star_border"
      />
    );
  });

  it('handles onChange', () => {
    let value = 0;
    const el = mount(
      <IconButton
        onChange={() => (value += 1)}
        onIcon="favorite"
        icon="favorite_border"
      />
    );

    el.find('button').simulate('change');

    expect(value).toEqual(1);
  });

  it('can have custom classnames', () => {
    const el = mount(
      <IconButton icon="star" className={'my-custom-classname'} />
    );
    expect(el.html().includes('my-custom-classname')).toEqual(true);
  });
});
