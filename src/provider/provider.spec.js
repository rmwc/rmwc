import * as React from 'react';
import { mount } from 'enzyme';
import { RMWCProvider } from './';
import { Button } from '@rmwc/button';
import { Icon } from '@rmwc/icon';

describe('Provider', () => {
  it('renders', () => {
    mount(
      <RMWCProvider>
        <div />
      </RMWCProvider>
    );
  });

  it('can set default ripple', () => {
    const dom = mount(
      <RMWCProvider buttonDefaultRipple={false}>
        <Button />
      </RMWCProvider>
    );
    expect(!!~dom.html().search('mdc-ripple-surface')).toEqual(false);
  });

  it('can set icon basename', () => {
    const dom = mount(
      <RMWCProvider iconClassNameBase={'my-icon-lib-test'}>
        <Icon />
      </RMWCProvider>
    );
    expect(!!~dom.html().search('my-icon-lib-test')).toEqual(true);
  });

  it('can set icon prefix', () => {
    const dom = mount(
      <RMWCProvider
        iconClassNamePrefix={'my-icon-lib-test-'}
        iconStrategy="className"
      >
        <Icon icon="test" />
      </RMWCProvider>
    );

    expect(!!~dom.html().search('my-icon-lib-test-')).toEqual(true);
  });
});
