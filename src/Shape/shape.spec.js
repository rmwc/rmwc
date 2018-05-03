import React from 'react';
import { mount } from 'enzyme';
import { ShapeContainer } from './';

describe('ShapeContainer', () => {
  test('renders', () => {
    const shape = mount(<ShapeContainer />);
    expect(shape.html().includes('mdc-shape-container')).toEqual(true);
  });

  test('can have backgroundColor', () => {
    mount(<ShapeContainer backgroundColor="red" />);
  });

  test('can have corner', () => {
    mount(<ShapeContainer corner="10" />);
  });

  test('can have specific corners', () => {
    mount(
      <ShapeContainer
        topLeftCorner="10"
        topRightCorner="10"
        bottomLeftCorner="10"
        bottomRightCorner="10"
      />
    );
  });

  test('can have outlines', () => {
    mount(
      <ShapeContainer
        outlineColor="red"
        outlineWidth="10"
        outlineStyle="dotted"
      />
    );
  });
});
