import React from 'react';
import { mount } from 'enzyme';
import { Icon } from './';

describe('Icon', () => {
  it('renders with children', () => {
    mount(<Icon>favorite</Icon>);
  });

  it('renders with use', () => {
    mount(<Icon use="favorite" />);
  });

  it('can have custom classnames', () => {
    const el = mount(<Icon className={'my-custom-classname'} />);
    expect(!!~el.html().search('my-custom-classname')).toEqual(true);
  });

  it('renders with images', () => {
    const el = mount(
      <Icon use="https://www2.le.ac.uk/departments/law/images/twitter-follow-us-icon" />
    );
    expect(!!~el.html().search('<img')).toEqual(true);
  });

  it('renders with JSX', () => {
    const el = mount(<Icon use={<div>Hello World</div>} />);
    expect(!!~el.html().search('Hello World')).toEqual(true);
  });

  it('renders nested Icons', () => {
    const el = mount(<Icon use={<Icon use={<div>Hello World</div>} />} />);
    expect(!!~el.html().search('Hello World')).toEqual(true);
  });
});
