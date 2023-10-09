import React from 'react';
import { renderToStaticMarkup as mount } from 'react-dom/server';
import { Portal } from './base';

describe('Base SSR', () => {
  it('renders', () => {
    const portal = mount(<Portal />);
    expect(portal).toMatchSnapshot();
  });
});
