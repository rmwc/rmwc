import React from 'react';
import { mount } from 'enzyme';
import { Avatar, AvatarCount, AvatarGroup } from './';

describe('Avatar', () => {
  it('renders', () => {
    mount(<Avatar src="test" />);
    mount(<Avatar src="test" contain />);
    mount(<AvatarGroup />);
    mount(<AvatarCount value={4} />);
  });

  it('handles names', () => {
    mount(<Avatar name="James Friedman" />);
    mount(<Avatar name="James" />);
  });
});
