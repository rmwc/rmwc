import React from 'react';
import { mount } from 'enzyme';
import { Icon } from './icon';

describe('Icon', () => {
  it('renders', () => {
    mount(<Icon>favorite</Icon>);
  });
});
