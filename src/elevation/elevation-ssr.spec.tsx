import * as React from 'react';
import { renderToString as mount } from 'react-dom/server';
import { Elevation } from './';

describe('Elevation SSR', () => {
  it('renders', () => {
    mount(<Elevation z={0} />);
  });
});
