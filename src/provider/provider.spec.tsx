import * as React from 'react';
import { mount } from 'enzyme';
import { RMWCProvider } from './';
import { Button } from '@rmwc/button';
import { Icon } from '@rmwc/icon';

describe('Provider', () => {
  it('renders', () => {
    const el = mount(
      <RMWCProvider>
        <div />
      </RMWCProvider>
    );

    el.setProps({ ripple: false });
  });

  it('can set default ripple', () => {
    const dom = mount(
      <RMWCProvider ripple={false}>
        <Button />
      </RMWCProvider>
    );
    expect(!!~dom.html().search('mdc-ripple-surface')).toEqual(false);
  });

  it('can set icon options', () => {
    const el = mount(
      <RMWCProvider icon={{ basename: 'my-icon-lib-test' }}>
        <Icon icon="foo" />
      </RMWCProvider>
    );
    expect(!!~el.html().search('my-icon-lib-test')).toEqual(true);
  });
});
