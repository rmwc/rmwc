import React from 'react';
import { mount } from 'enzyme';
import { Avatar, AvatarCount, AvatarGroup } from './';

describe('Avatar', () => {
  it('renders', () => {
    mount(<Avatar src="test" />);
    mount(<AvatarGroup />);
    mount(<AvatarCount value={4} />);
  });
});
