import React from 'react';
import { renderToString as mount } from 'react-dom/server';
import { Fab } from './fab';

describe('Fab SSR', () => {
  it('renders', () => {
    mount(<Fab icon="favorite" />);
  });
});
