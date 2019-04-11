# Toolbars

> Toolbar actions appear above the view affected by their actions.

- Module **@rmwc/toolbar**
- Import styles:
  - import **'@material/toolbar/dist/mdc.toolbar.css'**
- MDC Docs: [https://material.io/develop/web/components/toolbar/](https://material.io/develop/web/components/toolbar/)

**Attention** Toolbars are technically deprecated by `material-components-web` (although they continue to get updates?) but they remain useful until TopAppBar can catch up and contain all of the same behaviors.

```jsx
<Toolbar>
  <ToolbarRow>
    <ToolbarTitle>Toolbar</ToolbarTitle>
  </ToolbarRow>
</Toolbar>
```

```jsx
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
```

```jsx
<Toolbar>
  <ToolbarRow>
    <ToolbarTitle>Toolbar</ToolbarTitle>
  </ToolbarRow>
  <ToolbarRow>
    <ToolbarTitle>Second Row</ToolbarTitle>
  </ToolbarRow>
</Toolbar>
```

## Fixed

When using the `fixed` prop, you can optionally add the `ToolbarFixedAdjust` component to fill in the appropriate space.

```jsx
<>
  <Toolbar fixed>
    <ToolbarRow>
      <ToolbarTitle>Toolbar</ToolbarTitle>
    </ToolbarRow>
  </Toolbar>
  <ToolbarFixedAdjust />

  <div style={{ height: '100rem', padding: '1rem' }}>Scroll Me</div>
</>
```

```jsx
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
```

## Flexible

```jsx
<>
  <Toolbar fixed flexible>
    <ToolbarRow>
      <ToolbarTitle>Toolbar</ToolbarTitle>
    </ToolbarRow>
  </Toolbar>
  <ToolbarFixedAdjust />

  <div style={{ height: '100rem', padding: '1rem' }}>Scroll Me</div>
</>
```

## Toolbar
### Props

| Name | Type | Description |
|------|------|-------------|
| `fixed` | `undefined \| false \| true` | Makes the toolbar fixed |
| `fixedLastrowOnly` | `undefined \| false \| true` | Fixes the last row of a multi-row toolbar |
| `flexible` | `undefined \| false \| true` | makes the toolbar flexible |
| `flexibleDefaultBehavior` | `undefined \| false \| true` | further defines the background and title movement behavior, use in conjunction with flexible. |
| `waterfall` | `undefined \| false \| true` | Adds a waterfall effect on scroll |


## ToolbarRow
A Toolbar row



## ToolbarSection
A section of the Toolbar

### Props

| Name | Type | Description |
|------|------|-------------|
| `alignEnd` | `undefined \| false \| true` | Aligns the ToolbarSection at the end. |
| `alignStart` | `undefined \| false \| true` | Aligns the ToolbarSection at the start. |
| `shrinkToFit` | `undefined \| false \| true` | Makes the ToolbarSection shrink to fit. |


## ToolbarTitle
A Toolbar title



## ToolbarMenuIcon
A Menu Icon For the Toolbar. This is an instance of the Icon component.

### Props

| Name | Type | Description |
|------|------|-------------|
| `icon` | `RMWC.IconPropT` | The icon to use. This can be a string for a font icon, a url, or whatever the selected strategy needs. |


## ToolbarIcon
A standard Icon for toolbar actions. This is an instance of the Icon component.

### Props

| Name | Type | Description |
|------|------|-------------|
| `icon` | `RMWC.IconPropT` | The icon to use. This can be a string for a font icon, a url, or whatever the selected strategy needs. |


## ToolbarFixedAdjust
This component can be placed after a fixed Toolbar component to fill in the space.



