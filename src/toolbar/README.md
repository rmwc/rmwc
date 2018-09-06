# Toolbars

> Toolbar actions appear above the view affected by their actions.

- import * from **'@rmwc/toolbar'**;
- import styles:
  - import **'@material/toolbar/dist/mdc.toolbar.css'**;
- MDC Docs: [https://material.io/develop/web/components/toolbar/](https://material.io/develop/web/components/toolbar/)

```jsx render
import {
  Toolbar,
  ToolbarRow,
  ToolbarSection,
  ToolbarTitle,
  ToolbarMenuIcon,
  ToolbarIcon
} from '@rmwc/toolbar';

{/* Minimum usage */}
<Toolbar>
  <ToolbarRow>
    <ToolbarTitle>Toolbar</ToolbarTitle>
  </ToolbarRow>
</Toolbar>

{/* With multiple sections */}
<Toolbar>
  <ToolbarRow>
    <ToolbarSection alignStart>
      <ToolbarMenuIcon icon="menu"/>
      <ToolbarTitle>Toolbar</ToolbarTitle>
    </ToolbarSection>
    <ToolbarSection alignEnd>
      <ToolbarIcon icon="save"/>
      <ToolbarIcon icon="print"/>
    </ToolbarSection>
  </ToolbarRow>
</Toolbar>

{/* Multiple rows */}
<Toolbar>
  <ToolbarRow>
    <ToolbarTitle>Toolbar</ToolbarTitle>
  </ToolbarRow>
  <ToolbarRow>
    <ToolbarTitle>Second Row</ToolbarTitle>
  </ToolbarRow>
</Toolbar>
```

## Fixed Toolbars

When using the `fixed` prop, you can optionally add the `ToolbarFixedAdjust` component to fill in the appropriate space.

```jsx codeOnly
import {
  Toolbar,
  ToolbarRow,
  ToolbarTitle,
  ToolbarFixedAdjust,
} from '@rmwc/toolbar';

<Toolbar fixed>
  <ToolbarRow>
    <ToolbarTitle>Toolbar</ToolbarTitle>
  </ToolbarRow>
</Toolbar>
<ToolbarFixedAdjust />
```

```jsx renderOnly
import { DocumentComponent } from '@rmwc/base/utils/DocumentComponent';
import * as docs from './docgen.json';

<DocumentComponent docs={docs} displayName="Toolbar" />
<DocumentComponent docs={docs} displayName="ToolbarRow" />
<DocumentComponent docs={docs} displayName="ToolbarSection" />
<DocumentComponent docs={docs} displayName="ToolbarTitle" />
<DocumentComponent docs={docs} displayName="ToolbarMenuIcon" composes={['Icon']}/>
<DocumentComponent docs={docs} displayName="ToolbarIcon" composes={['Icon']} />
<DocumentComponent docs={docs} displayName="ToolbarFixedAdjust" />
```
