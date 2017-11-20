import React from 'react';
import { mount } from 'enzyme';
import {
  Toolbar,
  ToolbarRow,
  ToolbarSection,
  ToolbarTitle,
  ToolbarFixedAdjust,
  ToolbarMenuIcon,
  ToolbarIcon
} from './';

describe('Toolbar', () => {
  it('renders', () => {
    mount(
      <div>
        <Toolbar>
          <ToolbarRow>
            <ToolbarSection>
              <ToolbarMenuIcon use="menu" />
              <ToolbarTitle>Toolbar</ToolbarTitle>
            </ToolbarSection>
            <ToolbarSection alignEnd>
              <ToolbarIcon use="print" />
            </ToolbarSection>
          </ToolbarRow>
        </Toolbar>
        <ToolbarFixedAdjust />
      </div>
    );
  });

  it('can be fixed', () => {
    const el = mount(
      <Toolbar fixed>
        <ToolbarRow />
      </Toolbar>
    );

    expect(!!~el.html().search('mdc-toolbar--fixed')).toBe(true);
  });

  it('can be waterfall', () => {
    const el = mount(
      <Toolbar waterfall>
        <ToolbarRow />
      </Toolbar>
    );

    expect(!!~el.html().search('mdc-toolbar--waterfall')).toBe(true);
  });

  it('can be fixedLastrowOnly', () => {
    const el = mount(
      <Toolbar fixedLastrowOnly>
        <ToolbarRow />
      </Toolbar>
    );

    expect(!!~el.html().search('mdc-toolbar--fixed-lastrow-only')).toBe(true);
  });

  it('can have custom classnames', () => {
    [ToolbarRow, ToolbarSection, ToolbarTitle, ToolbarFixedAdjust].forEach(
      Component => {
        const el = mount(<Component className={'my-custom-classname'} />);
        expect(!!~el.html().search('my-custom-classname')).toEqual(true);
      }
    );

    // special case for Toolbar, it needs a row inside of it
    const el = mount(
      <Toolbar className={'my-custom-classname'}>
        <ToolbarRow />
      </Toolbar>
    );
    expect(!!~el.html().search('my-custom-classname')).toEqual(true);
  });
});
