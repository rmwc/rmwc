/**
 * @jest-environment node
 */

import * as React from 'react';
import { renderToString as mount } from 'react-dom/server';
import {
  Toolbar,
  ToolbarRow,
  ToolbarSection,
  ToolbarTitle,
  ToolbarFixedAdjust,
  ToolbarMenuIcon,
  ToolbarIcon
} from './';

describe('Toolbar SSR', () => {
  it('renders', () => {
    mount(
      <div>
        <Toolbar>
          <ToolbarRow>
            <ToolbarSection>
              <ToolbarMenuIcon icon="menu" />
              <ToolbarTitle>Toolbar</ToolbarTitle>
            </ToolbarSection>
            <ToolbarSection alignEnd>
              <ToolbarIcon icon="print" />
            </ToolbarSection>
          </ToolbarRow>
        </Toolbar>
        <ToolbarFixedAdjust />
      </div>
    );
  });
});
