import * as React from 'react';
import { mount } from 'enzyme';
import { Typography } from './';

describe('Typography', () => {
  it('renders', () => {
    mount(<Typography use="body1" />);
  });

  it('can have custom classnames', () => {
    const el = mount(
      <Typography use="body1" className={'my-custom-classname'} />
    );
    expect(!!~el.html().search('my-custom-classname')).toEqual(true);
  });
});
