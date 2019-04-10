import React from 'react';

import { Docs, DocsExample, DocProps, DocsP, DocsSubtitle } from '@doc-utils';
import propsSrc from './generated-props.json';
import examples from './generated-examples.json';

import {
  Toolbar,
  ToolbarRow,
  ToolbarSection,
  ToolbarTitle,
  ToolbarMenuIcon,
  ToolbarIcon,
  ToolbarFixedAdjust
} from '.';

export default function() {
  return (
    <Docs
      title="Toolbars"
      lead="Toolbar actions appear above the view affected by their actions."
      module="@rmwc/toolbar"
      styles={['@material/toolbar/dist/mdc.toolbar.css']}
      docsLink="https://material.io/develop/web/components/toolbar/"
      examples={examples}
    >
      <DocsP>
        **Attention** Toolbars are technically deprecated by
        `material-components-web` (although they continue to get updates?) but
        they remain useful until TopAppBar can catch up and contain all of the
        same behaviors.
      </DocsP>

      <DocsExample label="Basic Usage">
        <Toolbar>
          <ToolbarRow>
            <ToolbarTitle>Toolbar</ToolbarTitle>
          </ToolbarRow>
        </Toolbar>
      </DocsExample>

      <DocsExample label="Multiple Sections">
        <Toolbar>
          <ToolbarRow>
            <ToolbarSection alignStart>
              <ToolbarMenuIcon icon="menu" />
              <ToolbarTitle>Toolbar</ToolbarTitle>
            </ToolbarSection>
            <ToolbarSection alignEnd>
              <ToolbarIcon icon="save" />
              <ToolbarIcon icon="print" />
            </ToolbarSection>
          </ToolbarRow>
        </Toolbar>
      </DocsExample>

      <DocsExample label="Multiple Rows">
        <Toolbar>
          <ToolbarRow>
            <ToolbarTitle>Toolbar</ToolbarTitle>
          </ToolbarRow>
          <ToolbarRow>
            <ToolbarTitle>Second Row</ToolbarTitle>
          </ToolbarRow>
        </Toolbar>
      </DocsExample>

      <DocsSubtitle>Fixed</DocsSubtitle>
      <DocsP>
        When using the `fixed` prop, you can optionally add the
        `ToolbarFixedAdjust` component to fill in the appropriate space.
      </DocsP>
      <DocsExample label="Fixed" iframe>
        <>
          <Toolbar fixed>
            <ToolbarRow>
              <ToolbarTitle>Toolbar</ToolbarTitle>
            </ToolbarRow>
          </Toolbar>
          <ToolbarFixedAdjust />

          <div style={{ height: '100rem', padding: '1rem' }}>Scroll Me</div>
        </>
      </DocsExample>

      <DocsExample label="Last Row" iframe>
        <>
          <Toolbar fixed fixedLastrowOnly>
            <ToolbarRow>
              <ToolbarTitle>Toolbar</ToolbarTitle>
            </ToolbarRow>
            <ToolbarRow>
              <ToolbarTitle>Another Row</ToolbarTitle>
            </ToolbarRow>
          </Toolbar>
          <ToolbarFixedAdjust />

          <div style={{ height: '100rem', padding: '1rem' }}>Scroll Me</div>
        </>
      </DocsExample>

      <DocsSubtitle>Flexible</DocsSubtitle>
      <DocsExample iframe>
        <>
          <Toolbar fixed flexible>
            <ToolbarRow>
              <ToolbarTitle>Toolbar</ToolbarTitle>
            </ToolbarRow>
          </Toolbar>
          <ToolbarFixedAdjust />

          <div style={{ height: '100rem', padding: '1rem' }}>Scroll Me</div>
        </>
      </DocsExample>

      <DocProps
        src={propsSrc}
        components={[
          Toolbar,
          ToolbarRow,
          ToolbarSection,
          ToolbarTitle,
          ToolbarMenuIcon,
          ToolbarIcon,
          ToolbarFixedAdjust
        ]}
      />
    </Docs>
  );
}
