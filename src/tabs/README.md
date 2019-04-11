# Tabs

> Tabs make it easy to explore and switch between different views.

- Module **@rmwc/tabs**
- Import styles:
  - import **'@material/tab-bar/dist/mdc.tab-bar.css'**
  - import **'@material/tab/dist/mdc.tab.css'**
  - import **'@material/tab-scroller/dist/mdc.tab-scroller.css'**
  - import **'@material/tab-indicator/dist/mdc.tab-indicator.css'**
- MDC Docs: [https://material.io/develop/web/components/tabs/tab-bar/](https://material.io/develop/web/components/tabs/tab-bar/)

## Basic Usage

Tabs can be either controlled or uncontrolled just like inputs. Use the `activeTabIndex` and `onActivate` callback for controlled components.

```jsx
<TabBar>
  <Tab>Cookies</Tab>
  <Tab>Pizza</Tab>
  <Tab>Icecream</Tab>
</TabBar>
```

```jsx
function Example() {
  const [activeTab, setActiveTab] = React.useState(0);

  return (
    <TabBar
      activeTabIndex={activeTab}
      onActivate={evt => setActiveTab(evt.detail.index)}
    >
      <Tab>Cookies</Tab>
      <Tab>Pizza</Tab>
      <Tab>Icecream</Tab>
    </TabBar>
  );
}
```

## Variants

```jsx
<TabBar>
  <Tab>Cookies</Tab>
  <Tab>Pizza</Tab>
  <Tab>Icecream</Tab>
</TabBar>
```

```jsx
<TabBar>
  <Tab icon="star_border" label="Cookies" />
  <Tab icon="favorite_border" label="Pizza" />
  <Tab icon="mood" label="Icecream" />
</TabBar>
```

```jsx
<TabBar>
  <Tab icon="star_border" />
  <Tab icon="favorite_border" />
  <Tab icon="mood" />
</TabBar>
```

```jsx
<TabBar>
  <Tab stacked icon="star_border" label="Cookies" />
  <Tab stacked icon="favorite_border" label="Pizza" />
  <Tab stacked icon="mood" label="Icecream" />
</TabBar>
```

```jsx
<TabBar>
  <Tab stacked restrictIndicator icon="star_border" label="Cookies" />
  <Tab stacked restrictIndicator icon="favorite_border" label="Pizza" />
  <Tab stacked restrictIndicator icon="mood" label="Icecream" />
</TabBar>
```

```jsx
<TabBar>
  {/* Tabs automatically scroll with lots of content. */}
  <Tab>Cookies</Tab>
  <Tab>Pizza</Tab>
  <Tab>Icecream</Tab>
  <Tab>Chocolate</Tab>
  <Tab>Fishsticks</Tab>
  <Tab>Ratatouille</Tab>
  <Tab>Bread</Tab>
  <Tab>Rolls</Tab>
  <Tab>Sushi</Tab>
  <Tab>Cupcake</Tab>
  <Tab>Cheesecake</Tab>
</TabBar>
```

## TabBar
The TabBar component

### Props

| Name | Type | Description |
|------|------|-------------|
| `activeTabIndex` | `undefined \| number` | The index of the active tab. |
| `onActivate` | `undefined \| (evt: RMWC.CustomEventT<>) => void` | Callback when the active tab changes. Receives event as an argument with event.target.value set to the activeTabIndex. |


## Tab
A Tab component

### Props

| Name | Type | Description |
|------|------|-------------|
| `children` | `React.ReactNode` | The label for the tab, passed as children. |
| `icon` | `RMWC.IconPropT` | The icon to use for the tab. |
| `label` | `any` | A label for the tab. |
| `onInteraction` | `undefined \| (evt: RMWC.CustomEventT<>) => void` | Fires when a tab has been interacted with. This is captures both keyboard and click events. |
| `restrictIndicator` | `undefined \| false \| true` | Restricts the indicator to the content |
| `stacked` | `undefined \| false \| true` | Stacks the icon on top of the text label |


