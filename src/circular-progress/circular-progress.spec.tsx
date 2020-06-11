import React from 'react';
import { mount } from 'enzyme';
import { CircularProgress } from './';

describe('CircularProgress', () => {
  it('renders', () => {
    mount(<CircularProgress />);
  });

  it('can be sizes', () => {
    mount(<CircularProgress size="xsmall" />);
    mount(<CircularProgress size="small" />);
    mount(<CircularProgress size="medium" />);
    mount(<CircularProgress size="large" />);
    mount(<CircularProgress size="xlarge" />);
    mount(<CircularProgress size={72} />);
  });

  it('can be determinate', () => {
    mount(<CircularProgress progress={0.3} />);
  });

  it('can have a different max / min', () => {
    mount(<CircularProgress min={0} max={100} progress={30} />);
    mount(<CircularProgress progress={-1} />);
    mount(<CircularProgress progress={2} />);
  });
});
