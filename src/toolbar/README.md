# Toolbars

> Toolbar actions appear above the view affected by their actions.

- Module **@rmwc/toolbar**
- Import styles:
  - import **'@material/toolbar/dist/mdc.toolbar.css'**;
- MDC Docs: [https://material.io/develop/web/components/toolbar/](https://material.io/develop/web/components/toolbar/)

**Attention** Toolbars are technically deprecated by `material-components-web` but they remain useful until TopAppBar can catch up and contain all of the same behaviors.

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
import { DocProps } from '../doc-utils';
import { default as docs}  from './generated-props.json';

<DocProps src={docs} components={[
  'Toolbar',
  'ToolbarRow',
  'ToolbarSection',
  'ToolbarTitle',
  'ToolbarMenuIcon',
  'ToolbarIcon',
  'ToolbarFixedAdjust'
]} />
```
