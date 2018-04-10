# Toolbars

> Toolbar actions appear above the view affected by their actions.

import from **rmwc/Toolbar**  
[https://material.io/components/web/catalog/toolbar/](https://material.io/components/web/catalog/toolbar/)

```jsx render
import {
  Toolbar,
  ToolbarRow,
  ToolbarSection,
  ToolbarTitle,
  ToolbarMenuIcon,
  ToolbarIcon
} from 'rmwc/Toolbar';

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
      <ToolbarMenuIcon use="menu"/>
      <ToolbarTitle>Toolbar</ToolbarTitle>
    </ToolbarSection>
    <ToolbarSection alignEnd>
      <ToolbarIcon use="save"/>
      <ToolbarIcon use="print"/>
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
} from 'rmwc/Toolbar';

<Toolbar fixed>
  <ToolbarRow>
    <ToolbarTitle>Toolbar</ToolbarTitle>
  </ToolbarRow>
</Toolbar>
<ToolbarFixedAdjust />
```

```jsx renderOnly
import { DocumentComponent } from 'rmwc/Base/utils/DocumentComponent';

<DocumentComponent displayName="Toolbar" />
<DocumentComponent displayName="ToolbarRow" />
<DocumentComponent displayName="ToolbarSection" />
<DocumentComponent displayName="ToolbarTitle" />
<DocumentComponent displayName="ToolbarMenuIcon" />
<DocumentComponent displayName="ToolbarIcon" />
<DocumentComponent displayName="ToolbarFixedAdjust" />
```
