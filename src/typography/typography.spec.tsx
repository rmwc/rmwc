import * as React from 'react';
import { mount } from 'enzyme';
import { Typography } from './';
import { RMWCProvider } from '../provider';

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

  it('works with RMWCProvider', () => {
    mount(
      <RMWCProvider
        typography={{
          /** Make all Typography components default to <div>  */
          defaultTag: 'div',
          /** Make headline5 <h5>  */
          headline5: 'h5',
          /** Make body2 <p>  */
          body2: 'p',
          /** Use your own component  */
          body1: ({ children, ...rest }) => (
            <span>
              <b>{children}!!!</b>
            </span>
          )
        }}
      >
        <Typography use="headline6">Rendered default `div`</Typography>
        <Typography use="headline5">Rendered with `h5`</Typography>
        <Typography use="body2">Rendered with `p`</Typography>
        <Typography use="body1">Custom rendering</Typography>
      </RMWCProvider>
    );

    mount(
      <RMWCProvider typography={undefined}>
        <Typography use="headline6">Rendered default `div`</Typography>
      </RMWCProvider>
    );
  });
});
