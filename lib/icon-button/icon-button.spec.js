import React from 'react';
import { mount } from 'enzyme';
import { IconButton } from './icon-button';

describe('IconButton', () => {
  it('renders', () => {
    mount(<IconButton>favorite</IconButton>);
  });
});
