import * as React from 'react';
import { mount } from 'enzyme';
import { NotchedOutline } from './';

describe('NotchedOutline SSR', () => {
  it('renders', () => {
    mount(<NotchedOutline />);
  });
});
